import { ObserversModule } from '@angular/cdk/observers';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable,lastValueFrom, Subject, last } from 'rxjs';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { PaginatedItems, Result } from 'src/app/private/models/Common';
import { Commentary, Idea, StoryTelling } from 'src/app/private/models/Entity';
import { ChapitreDto, CommentaryDto, IdeaDto, IdeaVM, ImageDto, StoryDto, StoryTellingDto, TagDto, userDisplay } from 'src/app/private/models/EntityDto';
import { CommonService } from 'src/app/private/services/common.service';
import {faTrash,faEye,faCloud,faEdit} from '@fortawesome/free-solid-svg-icons'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogIdeaElementsComponent } from '../dialog-idea-elements/dialog-idea-elements.component';
@Component({
  selector: 'app-story-tellings-details',
  templateUrl: './story-tellings-details.component.html',
  styleUrls: ['./story-tellings-details.component.scss']
})
export class StoryTellingsDetailsComponent implements OnInit {

  private Endpoint:string;
   ParamRoute$:string;
   Status:string;
  private idZone:number;
  currentPage:number;
  resultDetails$:StoryTellingDto;
  resultCommentary$:Observable<PaginatedItems<CommentaryDto>>;
  Commentaries$:Array<CommentaryDto>;
  ResultUsers$:Array<Observable<userDisplay>>;
  resultTag$:TagDto;
  Users$:Array<userDisplay>;
  CommentaryForm : FormGroup;
  CurrentUser$:string;
  result$:Observable<Result>
  faTrash=faTrash;
  faEye=faEye;
  faCloud=faCloud;
  faEdit=faEdit;
  constructor(private formBuilder:FormBuilder,
    private StoryTellApiQuery:HttpApiQueryService<StoryTellingDto>,
    private StoryTellCommandQuery:HttpApiCommandService<StoryTelling>,
    private commentaryApiQuery:HttpApiQueryService<CommentaryDto>,
    private userApiQuery:HttpApiQueryService<userDisplay>,
    private tagApiQuery:HttpApiQueryService<TagDto>,
    private commentaryApiCommand:HttpApiCommandService<Commentary>,
    private route:ActivatedRoute,
    public dialog: MatDialog,
    private common:CommonService,
  ) {}

 async ngOnInit(): Promise<void> {
  this.currentPage=1;
  //this.CurrentUser$="Author_6af174d4-5c02-49c8-b8f1-4c76d855d4be";
  this.getUserid();
  this.Endpoint="StoryTelling"
    this.getIdStoryTell();
    await this.getStoryTellDetails(this.ParamRoute$);
    this.idZone= this.resultDetails$.idZone;
    await this.initForm();
    await this.getCommentaries(1,this.idZone);
  }

  getUserid(){
    const id= this.route.parent?.parent?.parent?.snapshot.paramMap.get("user_id") ?? "no value";
    this.CurrentUser$=this.common.formatUserId(id); 
  }

  async openDialog(){
  this.dialog.open(DialogIdeaElementsComponent,{
    data:this.resultDetails$.idStoryTelling
  });
  }

    async initForm(){
    this.CommentaryForm =  this.formBuilder.group({
      user_id:[this.CurrentUser$,[Validators.required,Validators.minLength(1)]],
      commentaire: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(200)]],
      idZone: [this.idZone,[Validators.required]]
    });
  }

   async onSubmit(pgNumber:number,idZone:number){ 
     const endpoint="Commentary";
    if(this.CommentaryForm.valid){
      this.result$=this.commentaryApiCommand.post(this.CommentaryForm.value,endpoint);    
     let response= await lastValueFrom(this.result$);
     console.log(response);
     await this.getCommentaries(pgNumber,idZone);
     // await this.getUsersId();
    
    }  

   }


   
    resetPage(){
    this.CommentaryForm.reset();
    this.initForm();
   }
  get commentaires(){
    return this.Commentaries$;
  }
  async getStoryTellDetails(id:string){
   const response= this.StoryTellApiQuery.getWithDetails(this.Endpoint,id);
   const value=await lastValueFrom(response)
   this.resultDetails$=value;
   this.getTag(value.idTag);
  }

  getIdStoryTell(){
    this.ParamRoute$ = this.route.snapshot.paramMap.get('id')?? "No value";
  }

  imagePresent(url:string){
    if(url!="") {return true;}
  
    return false;
  }

  async getUser(user_id:string,index:number){
    const endpoint="User/Simple"
  const response=this.userApiQuery.getWithDetails(endpoint,user_id);
  this.ResultUsers$.push(response);
    // const user= await lastValueFrom( response);
    // this.Users$.splice(index,0,user);
  }
async getCommentaries(pgNumber:number,id:number){
  this.Commentaries$=new Array<CommentaryDto>;
  const endpoint="Commentary";
  let params=new HttpParams();
  params=params.append("idZone",id);
  params=params.append("pgNumber",pgNumber);

   this.resultCommentary$=this.commentaryApiQuery.getWithPaginationParams(endpoint,params);
    const response= await lastValueFrom(this.resultCommentary$);
    this.Commentaries$=response.items;
    await this.getUsersId();
}

async getUsersId(){
  //this.Users$=new Array<userDisplay>;
  this.ResultUsers$=new Array<Observable<userDisplay>>;//a voir
    this.Commentaries$.forEach((m,i)=>{
      this.getUser(m.user_id,i);
    });
}
async getTag(id:number){
  const endpoint="Tag"
 const response= this.tagApiQuery.getWithDetails(endpoint,id.toString());
 await lastValueFrom(response).then((res)=>{
  this.resultTag$=res;
 });
}


async likeButton(id:number){
const endpoint="Commentary/Like"
const response=this.commentaryApiCommand.putSpec(endpoint,id.toString());
await lastValueFrom(response).then((res)=>{
console.log(res);
 this.getCommentaries(1,this.idZone);
});
}
signalButton(id:number){
  const endpoint="Commentary/Signal"
  const response=this.commentaryApiCommand.putSpec(endpoint,id.toString());
  lastValueFrom(response).then((res)=>{
  console.log(res);
  //window.location.reload();
  });
}
  handlePageEvent(event:PageEvent){
    this.currentPage=event.pageIndex+1;
    this.getCommentaries(event.pageIndex+1,this.idZone);
  }

  adapteUser(user_id:string){
    if(user_id==this.CurrentUser$)return true;

    return false;
  }
  
  deleteCommentary(id:number){
    const endpoint="Commentary"
    const response=this.commentaryApiCommand.delete(endpoint,id.toString());
    lastValueFrom(response).then((res)=>{
      console.log(res);
      this.getCommentaries(this.currentPage,this.idZone);
    });
  }


  async ChangeState(){
    if(this.resultDetails$.finished){
      await this.ongoingState();
    }
    else{
      console.log("finish")
      await this.finishState();
    }
  }

  async ongoingState(){
    const endpoint=this.Endpoint+"/Ongoing"
    const response= this.StoryTellCommandQuery.putSpec(endpoint,this.ParamRoute$) 
    const result=await lastValueFrom(response);
    console.log(result);
    this.getStoryTellDetails(this.ParamRoute$);
  }

  async finishState(){
    const endpoint=this.Endpoint+"/Finish"
    const response= this.StoryTellCommandQuery.putSpec(endpoint,this.ParamRoute$) 
    const result=await lastValueFrom(response);
    console.log(result);
    this.getStoryTellDetails(this.ParamRoute$);
  }

  isFinished(){
  
  }
}

import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import {faArrowDown,faBookReader, faCloud, faEdit, faEye, faTrash} from '@fortawesome/free-solid-svg-icons'
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { PaginatedItems, Result } from 'src/app/private/models/Common';
import { Commentary } from 'src/app/private/models/Entity';
import { ChapterFacadeDto, CommentaryDto, StoryBoxesDto, userDisplay } from 'src/app/private/models/EntityDto';
@Component({
  selector: 'app-chapitres',
  templateUrl: './chapitres.component.html',
  styleUrls: ['./chapitres.component.scss']
})
export class ChapitresComponent implements OnInit {

  faTrash=faTrash;
  faEye=faEye;
  faCloud=faCloud;
  faEdit=faEdit;
  faBookReader=faBookReader;
  faArrowDown=faArrowDown;
  CommentaryForm : FormGroup;
  resultCommentary$:Observable<PaginatedItems<CommentaryDto>>;
  Commentaries$:Array<CommentaryDto>;
StoryBoxe:StoryBoxesDto
Chapters:PaginatedItems<ChapterFacadeDto>
Users$:Array<userDisplay>;
private ParamRoute$:string;
  private Endpoint:string;
  private LastChapterPageChecked: number;
  private LastCommentaryPageChecked: number;
  private IdStoryTell:number;
  private CurrentUser$:string
   private idZone:number;
   ResultUsers$:Array<Observable<userDisplay>>;
  constructor(private storyBoxApiQuery:HttpApiQueryService<StoryBoxesDto>,
    private storyBoxChapterApiQuery:HttpApiQueryService<ChapterFacadeDto>,
    private commentaryApiQuery:HttpApiQueryService<CommentaryDto>,
    private commentaryApiCommand:HttpApiCommandService<Commentary>,
    private userApiQuery:HttpApiQueryService<userDisplay>,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.CurrentUser$="UserLambda_270b7c19-1968-4920-970a-e3deed612cb3";
    this.Endpoint="StoryBox";
    this.LastChapterPageChecked=1;
    this.LastCommentaryPageChecked=1;
    this.getIdStoryBox();
    await this.getStoryFacade();
    await this.getStoryChapters();


    await this.initForm();
    await this.getCommentaries();

  }


lastChapterChecked(order:number){
if(order===this.StoryBoxe.lastPageChecked){
  return {
    color: 'white',
    background:'linear-gradient(17deg, rgba(205,204,75,1) 13%, rgba(168,252,149,1) 51%, rgba(56,145,135,0.9135855025603992) 88%)'
  }
}

return 
}

  async initForm(){
    this.CommentaryForm =  this.formBuilder.group({
      user_id:[this.CurrentUser$,[Validators.required,Validators.minLength(1)]],
      commentaire: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(200)]],
      idZone: [this.idZone,[Validators.required]]
    });
  }


  async onSubmit(){ 
    const endpoint="Commentary";
   if(this.CommentaryForm.valid){
     const response=this.commentaryApiCommand.post(this.CommentaryForm.value,endpoint);    
    const result= await lastValueFrom(response);
    console.log(result);
    await this.getCommentaries();
    this.resetPage();
//     await this.getUsersId();
   }
  }  

  resetPage(){
    this.CommentaryForm.reset();
    this.initForm();
   }

  get commentaires(){
    return this.Commentaries$;
  }




  async getUser(user_id:string,index:number){
    const endpoint="User/Simple"
    const response=this.userApiQuery.getWithDetails(endpoint,user_id);
    this.ResultUsers$.push(response);
   // const user= await lastValueFrom( response);
    //this.Users$.splice(index,0,user);
  }


async getCommentaries(){
  this.Commentaries$=new Array<CommentaryDto>;
  const endpoint="Commentary";
  let params=new HttpParams();
  params=params.append("idZone",this.idZone);
  params=params.append("pgNumber",this.LastCommentaryPageChecked);

   this.resultCommentary$=this.commentaryApiQuery.getWithPaginationParams(endpoint,params);
    const response= await lastValueFrom(this.resultCommentary$);
    this.Commentaries$=response.items;
    await this.getUsersId();
}

async getUsersId(){
  this.ResultUsers$=new Array<Observable<userDisplay>>;//a voir
  this.Users$=new Array<userDisplay>;
    this.Commentaries$.forEach((m,i)=>{
      this.getUser(m.user_id,i);
    });
}



async likeButton(id:number){
  const endpoint="Commentary/Like"
  const response=this.commentaryApiCommand.putSpec(endpoint,id.toString());
  const result=await lastValueFrom(response);
  console.log(result);
   this.getCommentaries();
  }
  async signalButton(id:number){
    const endpoint="Commentary/Signal"
    const response=this.commentaryApiCommand.putSpec(endpoint,id.toString());
    const result=await lastValueFrom(response);
  console.log(result);
   this.getCommentaries();
  }
    handleCommentaryPageEvent(event:PageEvent){
      this.LastCommentaryPageChecked=event.pageIndex+1;
      this.getCommentaries();
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
        this.getCommentaries();
      });
    }
  



  getIdStoryBox(){
    this.ParamRoute$ = this.route.snapshot.paramMap.get('id')?? "No value";
  }

async getStoryFacade(){
  const response=this.storyBoxApiQuery.getWithDetails(this.Endpoint,this.ParamRoute$);
  this.StoryBoxe=await lastValueFrom(response);
  this.IdStoryTell=this.StoryBoxe.idStoryTell;
  this.idZone=this.StoryBoxe.facade.idZone;
}

async getStoryChapters(){
  const endpoint=this.Endpoint+"/facade"
  let params=new HttpParams();
  params=params.append("idStoryTell",this.IdStoryTell);
  params=params.append('pgNumber',this.LastChapterPageChecked);
  const response=this.storyBoxChapterApiQuery.getWithPaginationParams(endpoint,params);
  this.Chapters=await lastValueFrom(response);
}

  async handlePageEvent(event:PageEvent){
    this.LastChapterPageChecked= event.pageIndex+1
    await this.getStoryChapters();
  }

}

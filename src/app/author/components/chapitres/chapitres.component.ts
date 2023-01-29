import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { PaginatedItems } from 'src/app/private/models/Common';
import { Chapitre, Commentary, Idea } from 'src/app/private/models/Entity';
import { ChapitreDto, CommentaryDto, IdeaDto, ImageDto, StoryDto } from 'src/app/private/models/EntityDto';
import { CommonService } from 'src/app/private/services/common.service';
import {faTrash,faEye,faCloud,faEdit} from '@fortawesome/free-solid-svg-icons'
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogImageChoiceComponent } from '../dialog-image-choice/dialog-image-choice.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-chapitres',
  templateUrl: './chapitres.component.html',
  styleUrls: ['./chapitres.component.scss']
})
export class ChapitresComponent implements OnInit {

  private currentPage:number;
  private Endpoint$:string;
  private ChapitreForm:FormGroup;
   ParamRoute$:string;
  result$:Observable<PaginatedItems<ChapitreDto>>;
Chapters:Array<ChapitreDto>

  Images:Array<Observable<ImageDto>>;
  Narrations:Array<Observable<StoryDto>>;
  faTrash=faTrash;
  faEye=faEye;
  CurrentUser$: string;

  constructor(
    private chapitreApiQuery:HttpApiQueryService<ChapitreDto>,
    private chapitreApiCommand:HttpApiCommandService<Chapitre>,
    private imageApiQuery:HttpApiQueryService<ImageDto>,
    private storyApiQuery:HttpApiQueryService<StoryDto>,
    private service:CommonService,
    private route:ActivatedRoute,
     private common:CommonService,
    public dialog: MatDialog,
    private formBuilder:FormBuilder) { }

    async ngOnInit(): Promise<void> {
      this.Chapters= new Array<ChapitreDto>;
    
      this.currentPage=1;
      this.Endpoint$="Chapitre";
      this.getUserid();
      this.getIdStoryTell();
       await this.getChapters(this.ParamRoute$,1);
    }


    getUserid(){
      const id= this.route.parent?.parent?.parent?.snapshot.paramMap.get("user_id") ?? "no value";
      this.CurrentUser$=this.common.formatUserId(id); 
    }

innitform(id:number,idImage:number){
  this.ChapitreForm=this.formBuilder.group({
    idChapitre:[id,[Validators.required,Validators.min(1)]],
    idImage:[idImage,[Validators.required,Validators.min(1)]],
  })
}

    getIdStoryTell(){
      this.ParamRoute$ = this.route.snapshot.paramMap.get('id')?? "No value";
    }
  
     async getChapters(idStoryTell:string,pgNumber:number){
      const endpoint=this.Endpoint$+"/StoryTell";
      let params=new HttpParams();
      params=params.append("pgNumber",pgNumber);
   this.result$=this.chapitreApiQuery.getSpecWithPaginationParams(endpoint,idStoryTell,params);
   const response=await lastValueFrom(this.result$);
   this.Chapters=response.items;
   this.getImageId(response.items);
     this.getNarrationId(response.items); 
    }
  
  




      getImageId(response: ChapitreDto[]){
        this.Images=new Array<Observable<ImageDto>>;
        response.forEach( (m,i)=>{
          this.getImage(m.idImage,i);
        });

    }
  

   getImage(id:number,index:number){
    const endpoint = "SearchImage"
    const response = this.imageApiQuery.getWithDetails(endpoint,id.toString());
   this.Images.push(response);
  console.log(this.Images.length);
  }
  
   getNarrationId( response:ChapitreDto[]){
    this.Narrations=new Array<Observable<StoryDto>>;
        response.forEach(  (m,i)=>{
           this.getNarration(m.idStory,i);
        });
  }
  
   getNarration(id:number,index:number){
    const endpoint = "Story"
    const response = this.storyApiQuery.getWithDetails(endpoint,id.toString());
  this.Narrations.push(response);
  console.log(this.Narrations.length);
  }








  async deleteChapitre(id:number){
    const response=this.chapitreApiCommand.delete(this.Endpoint$,id.toString());
    const result=await lastValueFrom(response);
    console.log(result);
    this.getChapters(this.ParamRoute$,this.currentPage);
  }



  async openDialog(id:number){
    const dialogRef =this.dialog.open(DialogImageChoiceComponent,{
      data:this.CurrentUser$
    });

   const choice= await lastValueFrom(dialogRef.afterClosed());
   const newImage=choice.image as ImageDto;
   await this.updateChapter(id,newImage.idImage);
  }

async updateChapter(id:number,idImage:number){
    this.innitform(id,idImage);
    const response=this.chapitreApiCommand.put(this.ChapitreForm.value,this.Endpoint$,id.toString());
    const result=await lastValueFrom(response);
    console.log(result);
    this.getChapters(this.ParamRoute$,this.currentPage);  
  }




  handlePageEvent(event:PageEvent){
    this.currentPage=event.pageIndex+1
    this.getChapters(this.ParamRoute$,this.currentPage);
  }
}

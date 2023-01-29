import { DialogRef } from '@angular/cdk/dialog';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { PaginatedItems, Result } from 'src/app/private/models/Common';
import { Chapitre, Story } from 'src/app/private/models/Entity';
import { ImageDto } from 'src/app/private/models/EntityDto';
import { CommonService } from 'src/app/private/services/common.service';
import { DialogImageChoiceComponent } from '../dialog-image-choice/dialog-image-choice.component';

@Component({
  selector: 'app-chapitre-creation',
  templateUrl: './chapitre-creation.component.html',
  styleUrls: ['./chapitre-creation.component.scss']
})
export class ChapitreCreationComponent implements OnInit {

  private Endpoint:string;
  private ParamRoute$:string;
  ActionBtn="save";
  private StoryTell:number;
  private story:number;
  currentImageChosen:number;
  CurrentUser$:string;
  LastPageChecked$:number;
  isImageChosen:boolean;
  ChapitreForm : FormGroup;
  StoryForm:FormGroup;
  result$:Observable<Result>;
  resultImage$:Observable<PaginatedItems<ImageDto>>;
  Images:Array<ImageDto>;
  ImageChoisi:ImageDto;


  constructor(private formBuilder:FormBuilder,
    private storyApiCommand:HttpApiCommandService<Story>,
    private chapitreApiCommand:HttpApiCommandService<Chapitre>,
    private imageApiQuery: HttpApiQueryService<ImageDto>,
    private router:Router,
    private common:CommonService,
    private route:ActivatedRoute,
    public dialog: MatDialog) { }

  async ngOnInit(): Promise<void>{
    this.Images=new Array<ImageDto>;
    this.currentImageChosen=0;
    this.getUserid();
    this.LastPageChecked$=1;
    this.Endpoint="Chapitre"
    this.getIdStoryTell();
    await this.getImages(this.LastPageChecked$,this.CurrentUser$);
    this.innitStoryForm();
     this.innitChapitreForm();
  }

  getUserid(){
    const id= this.route.parent?.parent?.parent?.snapshot.paramMap.get("user_id") ?? "no value";
    this.CurrentUser$=this.common.formatUserId(id); 
  }
  getIdStoryTell(){
    this.ParamRoute$ = this.route.snapshot.paramMap.get('id')?? "No value";
    this.StoryTell=parseInt(this.ParamRoute$);
  }



   innitChapitreForm(){
    this.ChapitreForm=this.formBuilder.group({
      idStoryTelling:[this.StoryTell,[Validators.required,Validators.min(1)]],
      idImage:[this.currentImageChosen,[Validators.required,Validators.min(1)]],
      idStory:[this.story,[Validators.required,Validators.min(1)]],
      order:[0,[Validators.min(1)]]
    })
  }

  innitStoryForm(){
    this.StoryForm=this.formBuilder.group({
      nomStory:['',[Validators.required, Validators.maxLength(20)]],
      textStory: ['',[Validators.required,Validators.minLength(20),Validators.maxLength(400)]],
    });
  }

   async onSubmit(){ 
    this.chosenImage(this.ImageChoisi.idImage);
     await this.CreateStory();
   this. innitChapitreForm();
   await this.createChapter();
   this.router.navigate(['../Chapitres/'+this.StoryTell]);  
   }

   async CreateStory(){
    const endpoint="Story"
    const response=this.storyApiCommand.post(this.StoryForm.value,endpoint);
    const result=await lastValueFrom(response);
    console.log(result);
    this.story=result.idEntity;
   }



   async createChapter(){
    const response=this.chapitreApiCommand.post(this.ChapitreForm.value,this.Endpoint);
    const result=await lastValueFrom(response);
    console.log(result);
   }


   chosenImage(id:number){
      this.currentImageChosen=id;
   }
   


async getImages(pgNumber:number,user_id:string){
  const endpoint="SearchImage"
  let params=new HttpParams();
  params=params.append("pgNumber",pgNumber);
  params=params.append("user_id",user_id);
  this.resultImage$=this.imageApiQuery.getWithPaginationParams(endpoint,params);
  const response=await lastValueFrom(this.resultImage$);
  this.Images=response.items;
}


  resetPage(){
    this.StoryForm.reset();
   }

   get NomStory(){
    return this.ChapitreForm.get('nomStory');
   }

   get ContentStory(){
    return this.ChapitreForm.get('textStory');
  }

async ImageFound(){
  const response=await lastValueFrom(this.resultImage$);
  if(response.totalCount>0)return true;
  return false;
}


  async openDialog(){
    const dialogRef =this.dialog.open(DialogImageChoiceComponent,{
      data:this.CurrentUser$
    });

   const choice= await lastValueFrom(dialogRef.afterClosed());
   this.ImageChoisi=choice.image as ImageDto;
   this.isImageChosen=true;
  }






  handlePageEvent(event:PageEvent){
    this.LastPageChecked$= event.pageIndex+1
    this.getImages(this.LastPageChecked$,this.CurrentUser$);
  }


}

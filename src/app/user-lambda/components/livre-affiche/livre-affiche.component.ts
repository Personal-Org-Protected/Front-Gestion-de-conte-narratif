import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { ActivatedRoute, Router } from '@angular/router';
import {faArrowDown,faBookReader, faEye, faMoneyBill} from '@fortawesome/free-solid-svg-icons'
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { PaginatedItems, Result } from 'src/app/private/models/Common';
import { BasketItems, Commentary } from 'src/app/private/models/Entity';
import { ChapterFacadeDto, CommentaryDto, FacadeDto, HasBeenBoughtDto, StoryBoxesDto, userDisplay } from 'src/app/private/models/EntityDto';
import { CommonService } from 'src/app/private/services/common.service';
@Component({
  selector: 'app-livre-affiche',
  templateUrl: './livre-affiche.component.html',
  styleUrls: ['./livre-affiche.component.scss']
})
export class LivreAfficheComponent implements OnInit {


  faEye=faEye;
  faArrowDown=faArrowDown;
  faMoneyBill=faMoneyBill;
  isBought:boolean;
  resultCommentary$:Observable<PaginatedItems<CommentaryDto>>;
  Commentaries$:Array<CommentaryDto>;
StoryBoxe:FacadeDto
Chapters:PaginatedItems<ChapterFacadeDto>
Users$:Array<userDisplay>;
ItemForm:FormGroup
private ParamRoute$:string;
  private Endpoint:string;
  private LastChapterPageChecked: number;
  private LastCommentaryPageChecked: number;
  private IdStoryTell:number;
  private CurrentUser$:string
   private idZone:number;
   ResultUsers$:Array<Observable<userDisplay>>;
  constructor(private storyBoxApiQuery:HttpApiQueryService<FacadeDto>,
    private storyBoxChapterApiQuery:HttpApiQueryService<ChapterFacadeDto>,
    private commentaryApiQuery:HttpApiQueryService<CommentaryDto>,
    private userApiQuery:HttpApiQueryService<userDisplay>,
    private StoryTellHasBennBoughtApiQuery:HttpApiQueryService<HasBeenBoughtDto>,
    private BasketApiCommand:HttpApiCommandService<BasketItems>,
    private route:ActivatedRoute,
    private router:Router,
    private formBuilder:FormBuilder,
    public common:CommonService
    ) { }

  async ngOnInit(): Promise<void> {
    this.Endpoint="StoryTelling";
    this.LastChapterPageChecked=1;
    this.LastCommentaryPageChecked=1;
    this.getUserid();
    this.getIdStory();
    await this.getStoryFacade();
    await this.getStoryChapters();
    await this.getCommentaries();
    await this.AlreadyBought(this.IdStoryTell);
  }

  getUserid(){
    const id= this.route.parent?.parent?.parent?.snapshot.paramMap.get("username") ?? "no value";
    this.CurrentUser$=id;
  }
  innitItemForm(){//modified
    this.ItemForm=this.formBuilder.group({
      itemId: [this.ParamRoute$,[Validators.min(1)]]
    });
  }


  get commentaires(){
    return this.Commentaries$;
  }




  async getUser(user_id:string){
    const endpoint="User/Simple"
    const response=this.userApiQuery.getWithDetails(endpoint,user_id);
    this.ResultUsers$.push(response);
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
      this.getUser(m.user_id);
    });
}


getIdStory(){
  this.ParamRoute$ = this.route.snapshot.paramMap.get('id')?? "No value";
}

async getStoryFacade(){
  const endpoint=this.Endpoint+"/facade"
const response=this.storyBoxApiQuery.getWithDetails(endpoint,this.ParamRoute$);
this.StoryBoxe=await lastValueFrom(response);
this.IdStoryTell=this.StoryBoxe.idStoryTelling;
this.idZone=this.StoryBoxe.idZone;
}

async getStoryChapters(){
const endpoint=this.Endpoint+"/facade"
let params=new HttpParams();
params=params.append("idStoryTell",this.IdStoryTell);
params=params.append('pgNumber',this.LastChapterPageChecked);
const response=this.storyBoxChapterApiQuery.getWithPaginationParams(endpoint,params);
this.Chapters=await lastValueFrom(response);
}

handleCommentaryPageEvent(event:PageEvent){
  this.LastCommentaryPageChecked=event.pageIndex+1;
  this.getCommentaries();
}

async AlreadyBought(id:number){
  const endpoint=this.Endpoint+"/AlreadyBought"
  const response=this.StoryTellHasBennBoughtApiQuery.getWithDetails(endpoint,id.toString());
  const result=await lastValueFrom(response);
  this.isBought=result.isBought;
}


async putInBasket(){
  this.innitItemForm();
  const endpoint="BasketItem";
  const response= this.BasketApiCommand.post(this.ItemForm.value,endpoint);
  const result=await lastValueFrom(response);
  setTimeout(() => {
    this.router.navigate(['/Private/'+this.CurrentUser$+'/User-lambda/Transaction-process']);
  }, 2000);
}

}



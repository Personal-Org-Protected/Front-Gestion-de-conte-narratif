import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { stringToKeyValue } from '@angular/flex-layout/extended/style/style-transforms';
import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { PaginatedItems } from 'src/app/private/models/Common';
import { FacadeDto, HaveForfaitDto, StoryTellingDto, TagDto, tagVM, userDisplay } from 'src/app/private/models/EntityDto';
import {faMoneyBill,faEye,faFilter,faXmark} from '@fortawesome/free-solid-svg-icons'
import { CommonService } from 'src/app/private/services/common.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  private Endpoint:string;
  private Search:string;
  private IsRate:boolean;
  private IsPrice:boolean;
  faEye=faEye;
  faFilter=faFilter;
  faCross=faXmark;
  faMoneyBill=faMoneyBill;
StoryTells:Array<FacadeDto>;
ResultAuthor$:Array<Observable<userDisplay>>
hasForfait:HaveForfaitDto;
CurrentTag$:number;
CurrentUser$:string;
LastPageChecked$:number;
Result$:Observable<PaginatedItems<FacadeDto>>;
resultTag$:tagVM;
  constructor(private storytellApiQuery:HttpApiQueryService<FacadeDto>,
    private tagApiQuery:HttpApiQueryService<tagVM>,
    private forfaitApiQuery:HttpApiQueryService<HaveForfaitDto>,
    public common:CommonService,
    private route:ActivatedRoute,) { }

  async ngOnInit(): Promise<void> {
    this.Search="";
    this.IsRate=false;
    this.IsPrice=false;
    this.Endpoint="StoryTelling/Store";
    this.CurrentTag$=1;
    this.getUserid();
    this.LastPageChecked$=1;
    this.StoryTells=new Array<FacadeDto>;
    await this.getBooks(this.Search,this.IsRate,this.IsPrice);
    await this.getAllTags()
    await this.getForfait();
  }

  getUserid(){
    const id= this.route.parent?.parent?.parent?.snapshot.paramMap.get("user_id") ?? "no value";
    this.CurrentUser$=this.common.formatUserId(id); 
  }

  
  async getBooks(search:string, rate:boolean,price:boolean,idTag?:number){//modified
this.configFilter(search,rate,price,idTag);
    let params= new HttpParams();
    params=params.append("idTag",this.CurrentTag$);
    params=params.append("pgNumber",this.LastPageChecked$);
    params=params.append("search",search);
    params=params.append("price",price);
    params=params.append("rate",rate);
    const response=this.storytellApiQuery.getWithPaginationParams(this.Endpoint,params);
    const result=await lastValueFrom(response);
    this.StoryTells=result.items;
  }

configFilter(search:string, rate:boolean,price:boolean,idTag?:number){
  if(idTag!=null ){this.CurrentTag$=idTag;this.LastPageChecked$=1;}
  this.Search=search;
  this.IsRate=rate;
  this.IsPrice=price;
}

  Storytag(idTag:number){
    return this.resultTag$.tags.find(t=>t.idTag==idTag)?.nameTag;
  }
  

  async getAllTags(){
    const endpoint="Tag/All"
  const response=this.tagApiQuery.get(endpoint);
   this.resultTag$=await lastValueFrom(response);
  }


  pannelDisplay(){
    const btn= document.querySelector(".filter");
    const pannel= document.querySelector(".alignment");
    pannel?.classList.add("appearance");
    btn?.classList.add("disable");
  }
  pannelDiseapear(){
    const btn= document.querySelector(".filter");
    const pannel= document.querySelector(".alignment");
    pannel?.classList.add("hidden");
    pannel?.classList.remove("appearance");
    btn?.classList.remove("disable");
  }


  async getForfait(){
//HaveForfaitLambda
  const endpoint="UserForfaits/HaveForfaitLambda"
  const response=this.forfaitApiQuery.get(endpoint);
  this.hasForfait=await lastValueFrom(response);
  }


   handlePageEvent(event:PageEvent){
    this.LastPageChecked$= event.pageIndex+1
     this.getBooks(this.Search,this.IsRate,this.IsPrice);
  }
}

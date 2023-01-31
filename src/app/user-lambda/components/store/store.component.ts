import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { stringToKeyValue } from '@angular/flex-layout/extended/style/style-transforms';
import { PageEvent } from '@angular/material/paginator';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { PaginatedItems } from 'src/app/private/models/Common';
import { FacadeDto, StoryTellingDto, TagDto, tagVM, userDisplay } from 'src/app/private/models/EntityDto';
import {faMoneyBill} from '@fortawesome/free-solid-svg-icons'
import { CommonService } from 'src/app/private/services/common.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  private Endpoint:string;
  faMoneyBill=faMoneyBill;
StoryTells:Array<FacadeDto>;
ResultAuthor$:Array<Observable<userDisplay>>
CurrentTag$:number;
CurrentUser$:string;
LastPageChecked$:number;
Result$:Observable<PaginatedItems<FacadeDto>>;
resultTag$:tagVM;
  constructor(private storytellApiQuery:HttpApiQueryService<FacadeDto>,
    private tagApiQuery:HttpApiQueryService<tagVM>,
    private common:CommonService,
    private route:ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.Endpoint="StoryTelling/Store";
    this.CurrentTag$=1;
    this.getUserid();
    this.LastPageChecked$=1;
    this.StoryTells=new Array<FacadeDto>;
    await this.getBooks();
    await this.getAllTags()
  }

  getUserid(){
    const id= this.route.parent?.parent?.parent?.snapshot.paramMap.get("user_id") ?? "no value";
    this.CurrentUser$=this.common.formatUserId(id); 
  }

  
  async getBooks(idTag?:number){
    if(idTag!=null){this.CurrentTag$=idTag;this.LastPageChecked$=1;}
    let params= new HttpParams();
    params=params.append("idTag",this.CurrentTag$);
    params=params.append("user_id",this.CurrentUser$);
    params=params.append("pgNumber",this.LastPageChecked$);
    const response=this.storytellApiQuery.getWithPaginationParams(this.Endpoint,params);
    const result=await lastValueFrom(response);
    this.StoryTells=result.items;
  }
  Storytag(idTag:number){
    return this.resultTag$.tags.find(t=>t.idTag==idTag)?.nameTag;
  }


  enoughBook(){
    if(this.StoryTells.length>3) return "";

    return "100";
  }


  async getAllTags(){
    const endpoint="Tag/All"
  const response=this.tagApiQuery.get(endpoint);
   this.resultTag$=await lastValueFrom(response);
  }




   handlePageEvent(event:PageEvent){
    this.LastPageChecked$= event.pageIndex+1
     this.getBooks();
  }
}

import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { endWith, first, lastValueFrom, Observable } from 'rxjs';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { PaginatedItems } from 'src/app/private/models/Common';
import { StoryTelling } from 'src/app/private/models/Entity';
import { AlreadyRated, HasBeenBoughtDto, IsRoleDto, StoryTellingDto, TagDto, tagVM, userDisplay, UserRolesVM } from 'src/app/private/models/EntityDto';
import { CommonService } from 'src/app/private/services/common.service';
import { NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-story-tellings',
  templateUrl: './story-tellings.component.html',
  styleUrls: ['./story-tellings.component.scss']
})
export class StoryTellingsComponent implements OnInit {
 
  currentRate = 3.14;
  private Endpoint:string;
  private open:number;
  private LastPageChecked:number;
  resultTag$:tagVM;
  tagRef:Array<number>;
  result$:Observable<PaginatedItems<StoryTellingDto>>;
  resultAuthor$:Observable<userDisplay>;
  CurrentUser$:string;
  private CurrentTag$:number;
  isBoughts:Array<Observable<HasBeenBoughtDto>>;
  isFormer:boolean;
  isAuthor:boolean;
  constructor(private config: NgbRatingConfig,private storyTellApiQuery: HttpApiQueryService<StoryTellingDto>,
    private storyTellStateApiQuery: HttpApiQueryService<HasBeenBoughtDto>,
    private storyTellApiCommand:HttpApiCommandService<StoryTelling>,
    private userApiQuery: HttpApiQueryService<userDisplay>,
    private tagApiQuery:HttpApiQueryService<tagVM>,
    private userRolesApiQuery:HttpApiQueryService<IsRoleDto>,
    private router:Router,
    private common:CommonService,
    private route:ActivatedRoute) {this.Endpoint="StoryTelling";this.LastPageChecked= 1;this.open=0;}

  async ngOnInit(): Promise<void> {
    this.LastPageChecked=1;
    this.CurrentTag$=1;
    this.getUserid();
    await this.getStoryTell();
   await this.getAllTags();
await this.userAuthor();
this.ratingConfig();
//await this.userFormer();
  }


  ratingConfig(){
    this.config.max = 5;
		this.config.readonly = true;
  }
  async getAllTags(){
    const endpoint="Tag/All"
  const response=this.tagApiQuery.get(endpoint);
   this.resultTag$=await lastValueFrom(response);
  }


  getUserid(){
    const id= this.route.parent?.parent?.parent?.snapshot.paramMap.get("user_id") ?? "no value";
    this.CurrentUser$=this.common.formatUserId(id); 
  }

  async getStoryTell(idTag?:number){
this.configSearch(idTag);
    this.isBoughts=new Array<Observable<HasBeenBoughtDto>>;
    const endpoint=this.Endpoint+"/user"
    let params=new HttpParams();
    params=params.append("pgNumber",this.LastPageChecked);
    params=params.append("idTag",this.CurrentTag$);
    this.result$=this.storyTellApiQuery.getWithPaginationParams(endpoint,params);//modified
    this.getAuthor();
    await this.getStoriesId();
}

configSearch(idTag?:number){
  if(idTag!=null){ this.CurrentTag$=idTag!;this.LastPageChecked=1;}

}
getAuthor(){
  const endpoint="User/Own"
 this.resultAuthor$=this.userApiQuery.get(endpoint);
}


imagePresent(url:string){
  if(url!="") {return true;}

  return false;
}


handlePageEvent(event:PageEvent){
  this.LastPageChecked= event.pageIndex+1
  this.getStoryTell();
}

async getStoriesId(){
  const result=await lastValueFrom(this.result$);
  result.items.forEach(async m=>{
    await this.checkIsBought(m.idStoryTelling);
  })
}

async checkIsBought(id:number){
  const endpoint=this.Endpoint+"/hasBeenBought";
const response=this.storyTellStateApiQuery.getWithDetails(endpoint,id.toString());
this.isBoughts.push(response);
}

async delete(id:number){
 const response=this.storyTellApiCommand.delete(this.Endpoint,id.toString());
 const result=await lastValueFrom(response);
 this.getStoryTell();
}










onClickCard(id:number){
if(this.checkBoxState(id) && id==this.open)
{
  this.closeBox(id);
}
else if(!this.checkBoxState(id) && id==this.open){
  this.openBox(id);
}
else{
    this.closeBox(this.open);
  this.openBox(id);
}
}
openBox(id:number){
  const box = document.getElementById('box'+id);
  box?.classList.add("open");
  this.open=id;
}

closeBox(id:number){
  const box = document.getElementById('box'+id);
  box?.classList.remove("open");
}

checkBoxState(id:number){
const box=document.getElementById('box'+id);
if(box?.classList.contains("open"))
return true;

return false;

}

/* if(old!=null && $(old).hasClass('open'))
    $(old).toggleClass('open');
   $(this).toggleClass('open');
   old = this;
 */



   async userAuthor(){
    const endpoint="UserRoles/isAuthor"
    const response=this.userRolesApiQuery.get(endpoint);
    const result=await lastValueFrom(response);
    this.isAuthor=result.isRole;
   }
/* 
   async userFormer(){
    const endpoint="UserRoles/isFormer"
    const response=this.userRolesApiQuery.get(endpoint);
    const result=await lastValueFrom(response);
    this.isFormer=result.isRole;

   } */
}


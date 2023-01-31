import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { endWith, first, lastValueFrom, Observable } from 'rxjs';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { PaginatedItems } from 'src/app/private/models/Common';
import { StoryTellingDto, TagDto, tagVM, userDisplay } from 'src/app/private/models/EntityDto';
import { CommonService } from 'src/app/private/services/common.service';

@Component({
  selector: 'app-story-tellings',
  templateUrl: './story-tellings.component.html',
  styleUrls: ['./story-tellings.component.scss']
})
export class StoryTellingsComponent implements OnInit {

  private Endpoint:string;
  private open:number;
  private LastPageChecked:number;
  resultTag$:tagVM;
  tagRef:Array<number>;
  result$:Observable<PaginatedItems<StoryTellingDto>>;
  resultAuthor$:Observable<userDisplay>;
  CurrentUser$:string;
  private CurrentTag$:number;
  constructor(private storyTellApiQuery: HttpApiQueryService<StoryTellingDto>,
    private userApiQuery: HttpApiQueryService<userDisplay>,
    private tagApiQuery:HttpApiQueryService<tagVM>,
    private router:Router,
    private common:CommonService,
    private route:ActivatedRoute) {this.Endpoint="StoryTelling";this.LastPageChecked= 1;this.open=0;}

  async ngOnInit(): Promise<void> {
    this.LastPageChecked=1;
    this.CurrentTag$=1;
    this.getUserid();
    this.getStoryTell();
   await this.getAllTags();
    this.getAuthor();
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

  getStoryTell(idTag?:number){
    if(idTag!=null){this.CurrentTag$=idTag;this.LastPageChecked=1;}
    const endpoint=this.Endpoint+"/user"
    let params=new HttpParams();
    params=params.append("pgNumber",this.LastPageChecked);
    params=params.append("idTag",this.CurrentTag$);
    this.result$=this.storyTellApiQuery.getSpecWithPaginationParams(endpoint,this.CurrentUser$,params);
}
getAuthor(){
  const endpoint="User"
 this.resultAuthor$=this.userApiQuery.getWithDetails(endpoint,this.CurrentUser$);
}


imagePresent(url:string){
  if(url!="") {return true;}

  return false;
}


handlePageEvent(event:PageEvent){
  this.LastPageChecked= event.pageIndex+1
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
}


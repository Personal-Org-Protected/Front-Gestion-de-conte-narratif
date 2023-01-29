import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { endWith, first, lastValueFrom, Observable } from 'rxjs';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { PaginatedItems } from 'src/app/private/models/Common';
import { StoryTellingDto, userDisplay } from 'src/app/private/models/EntityDto';
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
  result$:Observable<PaginatedItems<StoryTellingDto>>;
  resultAuthor$:Observable<userDisplay>;
  CurrentUser$:string;
  constructor(private storyTellApiQuery: HttpApiQueryService<StoryTellingDto>
    ,private userApiQuery: HttpApiQueryService<userDisplay>
    ,private router:Router,
    private common:CommonService,
    private route:ActivatedRoute) {this.Endpoint="StoryTelling";this.LastPageChecked= 1;this.open=0;}

  ngOnInit(): void {
    this.getUserid();
    //this.CurrentUser$="Author_6af174d4-5c02-49c8-b8f1-4c76d855d4be";
    this.getStoryTell(1,this.CurrentUser$);
    this.getAuthor(this.CurrentUser$);
  }

  getUserid(){
    const id= this.route.parent?.parent?.parent?.snapshot.paramMap.get("user_id") ?? "no value";
    this.CurrentUser$=this.common.formatUserId(id); 
  }

  getStoryTell(pgNumber:number,user_id:string){
    const endpoint=this.Endpoint+"/user"
    let params=new HttpParams();
    params=params.append("pgNumber",pgNumber);
this.result$=this.storyTellApiQuery.getSpecWithPaginationParams(endpoint,user_id,params);
}
getAuthor(user_id:string){
  const endpoint="User"
 this.resultAuthor$=this.userApiQuery.getWithDetails(endpoint,user_id);
}


imagePresent(url:string){
  if(url!="") {console.log("l'url existe : "+url);return true;}

  return false;
}


handlePageEvent(event:PageEvent){
  this.LastPageChecked= event.pageIndex+1
  this.getStoryTell(this.LastPageChecked,this.CurrentUser$);
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


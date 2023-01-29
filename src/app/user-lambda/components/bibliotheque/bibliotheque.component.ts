import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { PaginatedItems } from 'src/app/private/models/Common';
import { LibraryDto, StoryBoxesDto } from 'src/app/private/models/EntityDto';
import { CommonService } from 'src/app/private/services/common.service';

@Component({
  selector: 'app-bibliotheque',
  templateUrl: './bibliotheque.component.html',
  styleUrls: ['./bibliotheque.component.scss']
})
export class BibliothequeComponent implements OnInit {
  private Endpoint="StoryBox";
  private LastPageChecked: number;
  private CurrentUser$: string;
   Library:LibraryDto;
 StoryBoxes:PaginatedItems<StoryBoxesDto>;

  constructor(private libraryApiQuery:HttpApiQueryService<LibraryDto>,
    private storyboxesApiQuery:HttpApiQueryService<StoryBoxesDto>,
    private common:CommonService,
    private route:ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.LastPageChecked=1;
    this.getUserid();
await this.getLibrary();
await this.getStoryBoxes();
  }

  isBookThere(index:number){
    if(this.StoryBoxes.items?.[index])return true;
    return false;
  }


  getUserid(){
    const id= this.route.parent?.parent?.parent?.snapshot.paramMap.get("user_id") ?? "no value";
    this.CurrentUser$=this.common.formatUserId(id); 
  }

  async getLibrary(){
    const endpoint="Library";
    const response=this.libraryApiQuery.getWithDetails(endpoint,this.CurrentUser$);
    this.Library=await lastValueFrom(response);
  }
 async  getStoryBoxes(){
    let params= new HttpParams();
    params=params.append("pgNumber",this.LastPageChecked);
    params=params.append("IdLibrary",this.Library.idLibrary);
 const response= this.storyboxesApiQuery.getWithPaginationParams(this.Endpoint,params);
 this.StoryBoxes=await lastValueFrom(response);
console.log(this.StoryBoxes);
  }


  libraryEmpty(){
    if(this.StoryBoxes.items.length==0)return true;

    return false;
  }


  handlePageEvent(event:PageEvent){
    this.LastPageChecked= event.pageIndex+1
    this.getStoryBoxes();
  }
  
}

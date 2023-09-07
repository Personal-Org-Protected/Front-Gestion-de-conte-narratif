import { Component, OnInit } from '@angular/core';
import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { Route, Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { PaginatedItems } from 'src/app/private/models/Common';
import { Tag } from 'src/app/private/models/Entity';
import { TagDto } from 'src/app/private/models/EntityDto';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  
  isLoading:boolean;
  result$:Observable<PaginatedItems<TagDto>>;
  private Endpoint:string;
  private pgNumber:number;
  constructor(private tagQueryApi:HttpApiQueryService<TagDto>,
    private tagCommandApi:HttpApiCommandService<Tag>
    ,private router:Router) 
    { this.Endpoint="Tag";this.pgNumber=1; }

  ngOnInit(): void {
    this.isLoading=true;
    this.getTags(1);
  }

  DeleteTag(id:number){
    let response=this.tagCommandApi.delete(this.Endpoint,id.toString());

    lastValueFrom(response).then((res)=>{
      console.log(res);
      window.location.reload();
    });
  }

  getTags(pgNumber:number){
  this.result$=this.tagQueryApi.getWithPagination(this.Endpoint,pgNumber);
  this.isLoading=false;
  }

  handlePageEvent(event:PageEvent){
    this.getTags(event.pageIndex+1);
  }
}

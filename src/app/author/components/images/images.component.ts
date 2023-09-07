import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { PaginatedItems, Result } from 'src/app/private/models/Common';
import { Image } from 'src/app/private/models/Entity';
import { AlreadyInChapter, ImageDto, IsRoleDto } from 'src/app/private/models/EntityDto';
import {faTrash,faEye,faCloud,faEdit} from '@fortawesome/free-solid-svg-icons'
import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/private/services/common.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  private CurrentUser$:string;
  private Endpoint:string;
  private lastPageChecked:number;
  private idTag:number;
  faEdit=faEdit;
  faTrash=faTrash;
   resultImages$:Observable<PaginatedItems<ImageDto>>
   Images:Array<ImageDto>;
   private result$:Observable<Result>;
   isImagesUsed:Array<Observable<AlreadyInChapter>>
isAuthor:boolean;

  constructor(private imageApiQuery:HttpApiQueryService<ImageDto>,
    private imageApiCommand:HttpApiCommandService<Image>,
    private imageChapterApiQuery:HttpApiQueryService<AlreadyInChapter>,
    public common:CommonService,
    private userRolesApiQuery:HttpApiQueryService<IsRoleDto>,
    private route:ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.idTag=0;
    this.lastPageChecked=1;
    this.getUserid();
    this.Endpoint="SearchImage"
    this.Images=new Array<ImageDto>;
    await this.getImages(this.lastPageChecked,0);
    await this.userAuthor();
  }


  getUserid(){
    const id= this.route.parent?.parent?.parent?.snapshot.paramMap.get("user_id") ?? "no value";
    this.CurrentUser$=this.common.formatUserId(id); 
  }


  async getImages(pgNumber:number,idTag:number){//modified
    let params= new HttpParams();
    params=params.append("pgNumber",pgNumber);
    params=params.append("idTag",idTag);
    this.resultImages$=this.imageApiQuery.getWithPaginationParams(this.Endpoint,params);
    const response=await lastValueFrom(this.resultImages$)
    this.Images=response.items;
    this.getIdImages();
  }
  
  getIdImages(){
    this.isImagesUsed=new Array<Observable<AlreadyInChapter>>;
    this.Images.forEach(async m=>{
      await this.imagUsed(m.idImage);
    });
  }

  async imagUsed(id:number){
    const endpoint= this.Endpoint+"/alreadyHasChapter";
    const response= this.imageChapterApiQuery.getWithDetails(endpoint,id.toString());
    this.isImagesUsed.push(response);
  }

 async deleteImage(id:number){
    this.result$=this.imageApiCommand.delete(this.Endpoint,id.toString());
    const response=await lastValueFrom(this.result$);
    console.log(response);
    this.getImages(this.lastPageChecked,this.idTag);
  }

  handlePageEvent(event:PageEvent){
    this.lastPageChecked=event.pageIndex+1;
    this.getImages(this.lastPageChecked,this.idTag);
  }

  async userAuthor(){
    const endpoint="UserRoles/isAuthor"
    const response=this.userRolesApiQuery.get(endpoint);
    const result=await lastValueFrom(response);
    this.isAuthor=result.isRole;
   }
}

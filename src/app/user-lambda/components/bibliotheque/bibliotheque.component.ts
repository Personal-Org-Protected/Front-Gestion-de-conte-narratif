import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { PaginatedItems } from 'src/app/private/models/Common';
import { LibraryDto, StoryBoxesDto } from 'src/app/private/models/EntityDto';
import { CommonService } from 'src/app/private/services/common.service';
import {faEdit} from '@fortawesome/free-solid-svg-icons'
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { Library } from '@fortawesome/fontawesome-svg-core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bibliotheque',
  templateUrl: './bibliotheque.component.html',
  styleUrls: ['./bibliotheque.component.scss']
})
export class BibliothequeComponent implements OnInit {
  faEdit=faEdit;
  private Endpoint="StoryBox";
  private LastPageChecked: number;
  private inputTitle:any;
  private  titleForm:FormGroup;
  isInput=false;
  Library:LibraryDto;
  StoryBoxes:PaginatedItems<StoryBoxesDto>;

  constructor(private libraryApiQuery:HttpApiQueryService<LibraryDto>,
    private storyboxesApiQuery:HttpApiQueryService<StoryBoxesDto>,
    private libraryApiCommand:HttpApiCommandService<Library>,
    private common:CommonService,
    private route:ActivatedRoute,
    private formBuilder:FormBuilder,
    ) { }

  async ngOnInit(): Promise<void> {
    this.LastPageChecked=1;
await this.getLibrary();
await this.getStoryBoxes();
  }

  isBookThere(index:number){
    if(this.StoryBoxes.items?.[index])return true;
    return false;
  }


  async getLibrary(){
    const endpoint="Library";
    const response=this.libraryApiQuery.get(endpoint);
    this.Library=await lastValueFrom(response);
  }
 async  getStoryBoxes(){
    let params= new HttpParams();
    params=params.append("pgNumber",this.LastPageChecked);
    params=params.append("IdLibrary",this.Library.idLibrary);
 const response= this.storyboxesApiQuery.getWithPaginationParams(this.Endpoint,params);
 this.StoryBoxes=await lastValueFrom(response);
  }


  libraryEmpty(){
    if(this.StoryBoxes.items.length==0)return true;

    return false;
  }


  inputMode(){
    var e = document.querySelector('.title') as HTMLParagraphElement;
    var d = document.createElement('input');
    this.inputTitle=e;
    d.value=e.textContent!;
    e.parentNode?.replaceChild(d, e);
  }

  backToTextMode(){
    var e = document.getElementsByTagName('input')[0];
    var d = document.createElement('p');
    d=this.inputTitle;
    d.textContent=e.value ;
    e.parentNode?.replaceChild(d, e);
    return e.value;
  }

  async process(){
    if( ! this.isInput){
      this.inputMode();
      this.isInput=true;
    }
    else{
      let name=this.backToTextMode();
      this.isInput=false;
      await this.submit(name);
    }
  }



  patchValueForm(name:string){
    this.titleForm=this.formBuilder.group({
      libraryId:[this.Library.idLibrary,[Validators.required,Validators.minLength(1)]],
      name:[name,[Validators.required,Validators.minLength(10)]],
    });
  }

  async submit(name:string){
    const endpoint="Library";
    this.patchValueForm(name);
    const response=this.libraryApiCommand.put(this.titleForm.value,endpoint,this.Library.idLibrary);
    const result=await lastValueFrom(response);
  }

  handlePageEvent(event:PageEvent){
    this.LastPageChecked= event.pageIndex+1
    this.getStoryBoxes();
  }
  
}

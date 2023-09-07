import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IdeaDto, IdeaVM } from 'src/app/private/models/EntityDto';
import {faTrash,faEdit,faAdd} from '@fortawesome/free-solid-svg-icons'
import { Idea } from 'src/app/private/models/Entity';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-idea-elements',
  templateUrl: './dialog-idea-elements.component.html',
  styleUrls: ['./dialog-idea-elements.component.scss']
})
export class DialogIdeaElementsComponent implements OnInit {

  faTrash=faTrash;
  faEdit=faEdit;
  faAdd=faAdd;
  Disable:boolean;
  IdeaEditformgroup:FormGroup
  IdeaPostformgroup:FormGroup
  private Endpoint:string;
  currentPage:number;
  Ideas$:Array<IdeaDto>;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: number,
    private ideaApiQuery:HttpApiQueryService<IdeaVM>,
    private ideaApiCommand:HttpApiCommandService<Idea>,
    private formBuilder:FormBuilder,
 ) { }
  async ngOnInit(): Promise<void> {
    this.Disable=true;
this.Endpoint="Idea";
    this.Ideas$=new Array<IdeaDto>;
    await this.getIdeaContent(this.data);
    this.innitEditForm();
    this.innitPostForm();
  }

  innitEditForm(idea?:string,id?:number){
    this.IdeaEditformgroup=this.formBuilder.group({
      idea: [idea,[Validators.required,Validators.maxLength(200)]],
      idIdea: [id]
    });
  }
  innitPostForm(){
    this.IdeaPostformgroup=this.formBuilder.group({
      storyId: [this.data,[Validators.required,Validators.min(1)]],
      idea: ['',[Validators.required,Validators.maxLength(200)]]
    });
  }

  async getIdeaContent(id:number){
    const endpoint="Idea/StoryTell"
   const response=this.ideaApiQuery.getWithDetails(endpoint,id.toString());
    const result=await lastValueFrom( response);
    this.Ideas$=result.ideas;
  }
 
async edit(id:number,val:string){
  this.innitEditForm(val,id);
  if(this.IdeaEditformgroup.valid){
    const response=this.ideaApiCommand.put(this.IdeaEditformgroup.value,this.Endpoint,id.toString());
    const result=await lastValueFrom(response);
    this.getIdeaContent(this.data);
}
 }
 async delete(id:number){
const response=this.ideaApiCommand.delete(this.Endpoint,id.toString());
const result=await lastValueFrom(response);
await this.getIdeaContent(this.data);
 }

 async add(){
  if(this.IdeaPostformgroup.valid){
const response=this.ideaApiCommand.post(this.IdeaPostformgroup.value,this.Endpoint);
const result=await lastValueFrom(response);
this.getIdeaContent(this.data);
 }
}

disable(){
  this.Disable=false;
}
}

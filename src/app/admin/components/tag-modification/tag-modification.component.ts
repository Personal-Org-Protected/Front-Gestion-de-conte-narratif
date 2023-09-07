import { Component, OnInit } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { Result } from 'src/app/private/models/Common';
import {  Tag } from 'src/app/private/models/Entity';
import { TagDto } from 'src/app/private/models/EntityDto';

@Component({
  selector: 'app-tag-modification',
  templateUrl: './tag-modification.component.html',
  styleUrls: ['./tag-modification.component.scss']
})
export class TagModificationComponent implements OnInit {

  ActionBtn:string="Save";

  TagForm : FormGroup;
  data$ : Observable<TagDto>;
  result$:Observable<Result>;
  private ParamRoute$:string;
  private Endpoint:string;
  CurrentUser$:string;

   constructor(private formBuilder:FormBuilder,
     private TagCommandApi: HttpApiCommandService<Tag>,
      private TagQueryApi:HttpApiQueryService<TagDto>,
      private router:Router,
      private route:ActivatedRoute
     ) { this.Endpoint="Tag"}
 
     ngOnInit(): void {//changer le nom des proprietes
      this.getUserid();
      this.getId();
      this.getData(this.ParamRoute$);
      this.TagForm=this.formBuilder.group({
        idTag:['',[Validators.min(1)]],
       nameTag:['',[Validators.required,Validators.maxLength(20)]],
      });
    }
 
    getUserid(){
      const id= this.route.parent?.parent?.parent?.snapshot.paramMap.get("username") ?? "no value";
      this.CurrentUser$=id;
    }
     onSubmit(){
     if(this.TagForm.valid){
       this.result$=this.TagCommandApi.put(this.TagForm.value,this.Endpoint,this.ParamRoute$);    
      let response=lastValueFrom(this.result$);
      response.then((res)=>{
      console.log(res);
      this.router.navigate(['/Private/'+this.CurrentUser$+'/Admin/Tags']);
      })
     }
    }
 

    getData(id:string){
      this.data$=this.TagQueryApi.getWithDetails(this.Endpoint,id);

       lastValueFrom(this.data$).then((res:TagDto)=>{
        this.TagForm.patchValue(
         {
           idTag:res.idTag,
           nameTag:res.nameTag,
          }
        );
       }); 
     }

     getId(){
      this.ParamRoute$ = this.route.snapshot.paramMap.get('id')?? "No value";
    }
    
    resetPage(){
     this.TagForm.reset();
    }
 
 
    get nameTag(){
     return this.TagForm.get('nameTag');
    }
    get id(){
      return this.TagForm.get('idTag');
     }


}


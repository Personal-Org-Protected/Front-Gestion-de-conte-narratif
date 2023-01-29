import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, lastValueFrom } from 'rxjs';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { Result } from 'src/app/private/models/Common';
import {  Tag } from 'src/app/private/models/Entity';

@Component({
  selector: 'app-tag-creation',
  templateUrl: './tag-creation.component.html',
  styleUrls: ['./tag-creation.component.scss']
})
export class TagCreationComponent implements OnInit {
  ActionBtn:string="Save";
  TagForm : FormGroup;

  private Endpoint:string;
  result$:Observable<Result>;
   constructor(private formBuilder:FormBuilder,
     private TagCommandApi: HttpApiCommandService<Tag>, private router:Router
     ) { this.Endpoint="Tag"}
 
     ngOnInit(): void {//changer le nom des proprietes
      this.TagForm=this.formBuilder.group({
       nameTag:['',[Validators.required,Validators.maxLength(20)]],
      });
    }
 
     onSubmit(){
     if(this.TagForm.valid){
       this.result$=this.TagCommandApi.post(this.TagForm.value,this.Endpoint);    
      let response=lastValueFrom(this.result$);
      response.then((res)=>{
      console.log(res);
      this.router.navigate(['/Private/Admin/Tags']);
      })
     }
 
    }
    resetPage(){
     this.TagForm.reset();
    }
 
 
    get nameTag(){
     return this.TagForm.get('nameTag');
    }



}

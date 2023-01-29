import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { Result } from 'src/app/private/models/Common';
import { Forfait } from 'src/app/private/models/Entity';
import { RoleDto } from 'src/app/private/models/EntityDto';

@Component({
  selector: 'app-forfait-creation',
  templateUrl: './forfait-creation.component.html',
  styleUrls: ['./forfait-creation.component.scss']
})
export class ForfaitCreationComponent implements OnInit {

  ActionBtn:string="Save";
  ForfaitForm : FormGroup;

  private Endpoint:string;
  result$:Observable<Result>;
   constructor(private formBuilder:FormBuilder,
     private forfaitCommandApi: HttpApiCommandService<Forfait>,
      private router:Router
     ) { this.Endpoint="Forfait"}
 
     ngOnInit(): void {//changer le nom des proprietes
      this.ForfaitForm=this.formBuilder.group({
       forfaitLibelle:['',[Validators.required,Validators.maxLength(20)]],
       forfaitValue:['',[Validators.required,Validators.min(1)]],
       reduction: ['',[Validators.required,Validators.min(0),Validators.max(100)]],
       isForAuthor: [false],
       idRole: ['',Validators.required]
      });
    }
 
     onSubmit(){
     if(this.ForfaitForm.valid){
       this.result$=this.forfaitCommandApi.post(this.ForfaitForm.value,this.Endpoint);    
      let response=lastValueFrom(this.result$);
      response.then((res)=>{
      console.log(res);
      this.router.navigate(['../Forfaits']);
      })
     }
 
    }
    resetPage(){
     this.ForfaitForm.reset();
    }
 

 
    get Libelle(){
     return this.ForfaitForm.get('forfaitLibelle');
    }
    get Value(){
      return this.ForfaitForm.get('forfaitValue');
    }
    get Reduction(){
      return this.ForfaitForm.get('reduction');
    }


}

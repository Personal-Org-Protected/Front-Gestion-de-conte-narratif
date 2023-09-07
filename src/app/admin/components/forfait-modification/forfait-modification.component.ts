import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { Result } from 'src/app/private/models/Common';
import { Forfait } from 'src/app/private/models/Entity';
import { ForfaitDto } from 'src/app/private/models/EntityDto';

@Component({
  selector: 'app-forfait-modification',
  templateUrl: './forfait-modification.component.html',
  styleUrls: ['./forfait-modification.component.scss']
})
export class ForfaitModificationComponent implements OnInit {
  ActionBtn:string="Save";
  ForfaitForm : FormGroup;
  result$:Observable<Result>;
  data$ : Observable<ForfaitDto>;
  CurrentUser$:string;

  private ParamRoute$:string;
  private Endpoint:string;

   constructor(private formBuilder:FormBuilder,private forfaitQueryApi:HttpApiQueryService<ForfaitDto>,
     private forfaitCommandApi: HttpApiCommandService<Forfait>, private router:Router,private route:ActivatedRoute
     ) { this.Endpoint="Forfait"}
 
     ngOnInit(): void {//changer le nom des proprietes
      this.getUserid();
      this.getId();
      this.getData(this.ParamRoute$);
      this.implementForm();
    }

    getUserid(){
      const id= this.route.parent?.parent?.parent?.snapshot.paramMap.get("username") ?? "no value";
      this.CurrentUser$=id;
    }
    implementForm(){
      this.ForfaitForm=this.formBuilder.group({
        idForfait:['',[Validators.required,Validators.min(1)]],
        forfaitLibelle:['',[Validators.required,Validators.maxLength(20)]],
        forfaitValue:['',[Validators.required,Validators.min(1)]],
        reduction: ['',[Validators.required,Validators.min(0),Validators.max(100)]],
        isForAuthor: [false],
        idRole: ['',Validators.required]
       });
    }
 
     onSubmit(){
     if(this.ForfaitForm.valid){
       this.result$=this.forfaitCommandApi.put(this.ForfaitForm.value,this.Endpoint,this.ParamRoute$);
       lastValueFrom(this.result$).then((response)=>{
        console.log(response);
        this.router.navigate(['/Private/'+this.CurrentUser$+'/Admin/Forfaits']);
       }); 
       console.log(this.ForfaitForm.value);

     }
    }

    getId(){
      this.ParamRoute$ = this.route.snapshot.paramMap.get('id')?? "No value";
    }

    getData(id:string){
     this.data$=this.forfaitQueryApi.getWithDetails(this.Endpoint,id)
      lastValueFrom(this.data$).then((res:ForfaitDto)=>{
       this.ForfaitForm.patchValue(
        {
          idForfait:res.idForfait,
          forfaitLibelle:res.forfaitLibelle,
          forfaitValue:res.forfaitValue,
          reduction: res.reduction,
          isForAuthor: res.isForAuthor,
          idRole: res.roleId
         }
       );
      }); 
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

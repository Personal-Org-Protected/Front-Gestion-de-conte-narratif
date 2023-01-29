import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { PaginatedItems, Result } from 'src/app/private/models/Common';
import { Image } from 'src/app/private/models/Entity';
import { TagDto } from 'src/app/private/models/EntityDto';
import { CommonService } from 'src/app/private/services/common.service';

@Component({
  selector: 'app-image-creation',
  templateUrl: './image-creation.component.html',
  styleUrls: ['./image-creation.component.scss']
})
export class ImageCreationComponent implements OnInit {

  ActionBtn:string="Save";
  CurrentUser$:string;
  ImageForm : FormGroup;
  result$:Observable<Result>;
  private Endpoint: string;
  resultTags$:Observable<PaginatedItems<TagDto>>;

  constructor(private formBuilder:FormBuilder,
    private imageCommandApi: HttpApiCommandService<Image>, 
    private tagApiQuery: HttpApiQueryService<TagDto>,
     private router:Router,
     private common:CommonService,
     private route:ActivatedRoute
    ) { }

    ngOnInit(): void {//changer le nom des proprietes
      this.Endpoint="SearchImage";
      this.getUserid();
      this.getTags(1);
      this.innitForm();
    }

    getUserid(){
      const id= this.route.parent?.parent?.parent?.snapshot.paramMap.get("user_id") ?? "no value";
      this.CurrentUser$=this.common.formatUserId(id); 
    }

    innitForm(){
      this.ImageForm=this.formBuilder.group({
        uri: ['',[Validators.required,Validators.maxLength(200)]],
        nomImage:['',[Validators.required, Validators.maxLength(20)]],
        user_id:[this.CurrentUser$,[Validators.required,Validators.minLength(1)]],
        descriptionImage: ['',[Validators.required,Validators.minLength(20),Validators.maxLength(300)]],
        idTag: ['',[Validators.min(1)]]
      });
    }


    getTags(pgNumber:number){
      const endpoint="Tag"
      let params=new HttpParams();
      params=params.append("pgNumber",pgNumber)
    this.resultTags$=this.tagApiQuery.getWithPaginationParams(endpoint,params);
    }

  onSubmit(){ //Le soleil se levait, l'horizon s’éclaircissait.
    if(this.ImageForm.valid){
      this.result$=this.imageCommandApi.post(this.ImageForm.value,this.Endpoint);    
     let response=lastValueFrom(this.result$);
     response.then((res)=>{
     console.log(res);
     this.router.navigate(['../Images-librairie']);
     })
    } 

   }

   resetPage(){
    this.ImageForm.reset();
   }


   get nomImage(){
    return this.ImageForm.get('nomImage');
   }
   get idTag(){
     return this.ImageForm.get('idTag');
   }
   get descriptionImage(){
    return this.ImageForm.get('descriptionImage');
  }
  get user_id(){
    return this.ImageForm.get('user_id');
  }
  get uri(){
    return this.ImageForm.get('uri');
  }
}

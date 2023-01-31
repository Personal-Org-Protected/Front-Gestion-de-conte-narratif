import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { PaginatedItems, Result } from 'src/app/private/models/Common';
import { StoryTelling, StoryTellingEdit } from 'src/app/private/models/Entity';
import { StoryTellingDto, TagDto } from 'src/app/private/models/EntityDto';
import { CommonService } from 'src/app/private/services/common.service';

@Component({
  selector: 'app-story-tell-modification',
  templateUrl: './story-tell-modification.component.html',
  styleUrls: ['./story-tell-modification.component.scss']
})
export class StoryTellModificationComponent implements OnInit {

  ActionBtn:string="Save";
  StoryTellForm : FormGroup;
  result$:Observable<Result>;
  data$ : Observable<StoryTellingDto>;
  resultTags$:Observable<PaginatedItems<TagDto>>;
  private ParamRoute$:string;
  private Endpoint:string;
  CurrentUser$:string;
   constructor(private formBuilder:FormBuilder,
    private storyTellQueryApi:HttpApiQueryService<StoryTellingDto>,
     private storyTellCommandApi: HttpApiCommandService<StoryTellingEdit>,
     private tagApiQuery: HttpApiQueryService<TagDto>,
     private router:Router,
     private route:ActivatedRoute,
     private common:CommonService
     ) { }
 
     ngOnInit(): void {//changer le nom des proprietes
      this.Endpoint="StoryTelling"
      this.getIdStoryTell();
      this.getData(this.ParamRoute$);
      this.getTags(1);
      this.innitForm();
    }

    getUserid(){
      const id= this.route.parent?.parent?.parent?.snapshot.paramMap.get("user_id") ?? "no value";
      this.CurrentUser$=this.common.formatUserId(id); 
    }

    innitForm(){
      this.StoryTellForm=this.formBuilder.group({
        id: ['',[Validators.required,Validators.min(1)]],
        nameStory: ['',[Validators.required,Validators.maxLength(40)]],
        url: ['',[Validators.maxLength(200)]],
        price: ['',[Validators.required]],
        synopsis: ['',[Validators.required,Validators.minLength(20),Validators.maxLength(300)]],
        idTag: ['',[Validators.min(1)]]
       });
    }
 
     onSubmit(){
     if(this.StoryTellForm.valid){
       this.result$=this.storyTellCommandApi.put(this.StoryTellForm.value,this.Endpoint,this.ParamRoute$);
       lastValueFrom(this.result$).then((response)=>{
        console.log(response);
        setTimeout(() => {
          this.router.navigate(['/Private/'+this.CurrentUser$+'/Author/Histoire-details/'+this.ParamRoute$]);
        }, 400); 
       }); 
       console.log(this.StoryTellForm.value);

     }
    }

    
  getIdStoryTell(){
    this.ParamRoute$ = this.route.snapshot.paramMap.get('id')?? "No value";
  }
    getTags(pgNumber:number){
      const endpoint="Tag"
      let params=new HttpParams();
      params=params.append("pgNumber",pgNumber)
    this.resultTags$=this.tagApiQuery.getWithPaginationParams(endpoint,params);
    }


     getData(id:string){
     this.data$=this.storyTellQueryApi.getWithDetails(this.Endpoint,id)
       lastValueFrom(this.data$).then((res:StoryTellingDto)=>{
       this.StoryTellForm.patchValue(
        {
          id:res.idStoryTelling,
        nameStory: res.nameStory,
        url: res.url ,
        price: res.price,
        synopsis: res.sypnopsis,
        idTag:res.idTag 
         }
       );
      }); 
    }
    resetPage(){
     this.StoryTellForm.reset();
    }
 
 
    get nameStory(){
     return this.StoryTellForm.get('nameStory');
    }
    get url(){
      return this.StoryTellForm.get('url');
    }
    get price(){
      return this.StoryTellForm.get('price');
    }
    get synopsis(){
      return this.StoryTellForm.get('synopsis');
    }

}

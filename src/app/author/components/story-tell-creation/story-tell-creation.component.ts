import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { PaginatedItems, Result } from 'src/app/private/models/Common';
import { StoryTelling } from 'src/app/private/models/Entity';
import { TagDto } from 'src/app/private/models/EntityDto';
import { CommonService } from 'src/app/private/services/common.service';

@Component({
  selector: 'app-story-tell-creation',
  templateUrl: './story-tell-creation.component.html',
  styleUrls: ['./story-tell-creation.component.scss']
})
export class StoryTellCreationComponent implements OnInit {
  ActionBtn:string="Save";
  CurrentUser$:string;
  StoryTellForm : FormGroup;
  result$:Observable<Result>;
  private Endpoint: string;
  resultTags$:Observable<PaginatedItems<TagDto>>;

  constructor(private formBuilder:FormBuilder,
    private storyTellingCommandApi: HttpApiCommandService<StoryTelling>, 
    private tagApiQuery: HttpApiQueryService<TagDto>,
     private router:Router,
     private common:CommonService,
    private route:ActivatedRoute
    ) { }

    ngOnInit(): void {//changer le nom des proprietes
      this.Endpoint="StoryTelling";
      this.getUserid();
      this.getTags(1);
   this.innitForm();
    }

    getUserid(){
      const id= this.route.parent?.parent?.parent?.snapshot.paramMap.get("user_id") ?? "no value";
      this.CurrentUser$=this.common.formatUserId(id); 
    }
    
innitForm(){
  this.StoryTellForm=this.formBuilder.group({
    url: ['',[Validators.maxLength(200)]],
    nameStory:['',[Validators.required,Validators.maxLength(20)]],
    user_id:[this.CurrentUser$,[Validators.required,Validators.minLength(1)]],
    price:['',[Validators.required,Validators.min(0)]],
    synopsis: ['',[Validators.required,Validators.minLength(20),Validators.maxLength(300)]],
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
    if(this.StoryTellForm.valid){
      this.result$=this.storyTellingCommandApi.post(this.StoryTellForm.value,this.Endpoint);    
     let response=lastValueFrom(this.result$);
     response.then((res)=>{
     console.log(res);
     setTimeout(() => {
      this.router.navigate(['/Private/'+this.CurrentUser$+'/Author/Histoires']);
    }, 400); 
     })
    } 

   }

   resetPage(){
    this.StoryTellForm.reset();
   }


   get nameStory(){
    return this.StoryTellForm.get('nameStory');
   }
   get price(){
     return this.StoryTellForm.get('price');
   }
   get idTag(){
     return this.StoryTellForm.get('idTag');
   }
   get synopsis(){
    return this.StoryTellForm.get('synopsis');
  }
  get user_id(){
    return this.StoryTellForm.get('user_id');
  }
  get url(){
    return this.StoryTellForm.get('url');
  }
}

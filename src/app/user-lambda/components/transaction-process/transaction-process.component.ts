import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { StoryTellBox, Transaction } from 'src/app/private/models/Entity';
import { FacadeDto, StoryBoxDto, userDisplay } from 'src/app/private/models/EntityDto';
import { CommonService } from 'src/app/private/services/common.service';

@Component({
  selector: 'app-transaction-process',
  templateUrl: './transaction-process.component.html',
  styleUrls: ['./transaction-process.component.scss']
})
export class TransactionProcessComponent implements OnInit {

  private Endpoint$:string;
  private paramaRoute$:string;
  CurrentUser$:string;
  Facade:FacadeDto;
  User:userDisplay;
  TransactionForm : FormGroup;
  StoryBoxForm : FormGroup;
  constructor(private storytellFacadeApiQuery:HttpApiQueryService<FacadeDto>,
    private userInfoApiQuery:HttpApiQueryService<userDisplay>,
    private transationApiCommand:HttpApiCommandService<Transaction>,
    private storyBoxApiCommand:HttpApiCommandService<StoryTellBox>,
    private route:ActivatedRoute,
    private formBuilder:FormBuilder,
    private router:Router,
    private common:CommonService) { }

  ngOnInit(): void {
    this.Endpoint$="StoryTelling/facade";
    this.getUserid();
    this.getid();
    this.getFacade();
    this.getCurrentUserInfo();
  }


  getUserid(){
    const id= this.route.parent?.parent?.parent?.snapshot.paramMap.get("user_id") ?? "no value";
    this.CurrentUser$=this.common.formatUserId(id); 
  }

innitTransactionForm(){
  this.TransactionForm=this.formBuilder.group({
    nameBook:[this.Facade.nameStory,[Validators.required,Validators.maxLength(20)]],
    user_id:[this.CurrentUser$,[Validators.required,Validators.minLength(1)]],
    price:[this.Facade.price,[Validators.required,Validators.min(0)]],
    storyTellId: [this.Facade.idStoryTelling,[Validators.min(1)]]
  });
}


innitStoryBoxForm(){
  this.StoryBoxForm=this.formBuilder.group({
    user_id:[this.CurrentUser$,[Validators.required,Validators.minLength(1)]],
    storyTell: [this.Facade.idStoryTelling,[Validators.min(1)]]
  });
}



  getid(){
      this.paramaRoute$=this.route.snapshot.paramMap.get('id')?? "No value";
  }

  async getFacade(){
    let params = new HttpParams();
    params=params.append("user_id",this.CurrentUser$);
  const response=this.storytellFacadeApiQuery.getWithDetailsParams(this.Endpoint$,this.paramaRoute$,params);
  this.Facade=await lastValueFrom(response);
  }

  async getCurrentUserInfo(){
    const endpoint="User"
const response=this.userInfoApiQuery.getWithDetails(endpoint,this.CurrentUser$);
this.User=await lastValueFrom(response);
  }


  async commitTransaction(){
    const endpoint="Transactions"
    this.innitTransactionForm();
    const response=this.transationApiCommand.post(this.TransactionForm.value,endpoint);
    const result=await lastValueFrom(response);
    console.log(result);
  }

  async createStoryBox(){
    const endpoint="StoryBox"
    this.innitStoryBoxForm();
    const response=this.storyBoxApiCommand.post(this.StoryBoxForm.value,endpoint);
    const result=await lastValueFrom(response);
    console.log(result);
    setTimeout(() => {
      this.router.navigate(['/Private/'+this.CurrentUser$+'/User-lambda/Library']);
    }, 400); 
  }

  async commit(){
await this.commitTransaction();
await this.createStoryBox();

  }
}

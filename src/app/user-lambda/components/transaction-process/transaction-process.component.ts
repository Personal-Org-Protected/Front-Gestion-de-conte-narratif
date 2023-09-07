import { HttpBackend, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { Basket, Notification, StoryTellBox, StoryTelling, Transaction } from 'src/app/private/models/Entity';
import { BasketDto, BasketItems, FacadeDto, StoryBoxDto, TagDto, userDisplay } from 'src/app/private/models/EntityDto';
import { CommonService } from 'src/app/private/services/common.service';
import {faXmark,faEuro} from '@fortawesome/free-solid-svg-icons'
import { PaginatedItems } from 'src/app/private/models/Common';
import { PageEvent } from '@angular/material/paginator';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';


@Component({
  selector: 'app-transaction-process',
  templateUrl: './transaction-process.component.html',
  styleUrls: ['./transaction-process.component.scss']
})
export class TransactionProcessComponent implements OnInit {

  faXmark=faXmark;
  faEuro=faEuro;
  private Endpoint$:string;
  CurrentUser$:string;
  Facades:Array<Observable<FacadeDto>>;
  Tags:Array<Observable<TagDto>>;
  User:userDisplay;
  Basket:BasketDto;
  Items:PaginatedItems<BasketItems>;
  TransactionForm : FormGroup;
  StoryBoxForm : FormGroup;
  CurentPage:number;
  notifForm:FormGroup;

  constructor(private storytellFacadeApiQuery:HttpApiQueryService<FacadeDto>,
    private tagApiQuery:HttpApiQueryService<TagDto>,
    private basketApiQuery:HttpApiQueryService<BasketDto>,
    private basketItemsApiQuery:HttpApiQueryService<PaginatedItems<BasketItems>>,
    private storyTellingRef:HttpApiCommandService<StoryTelling>,
    private transationApiCommand:HttpApiCommandService<Transaction>,
    private BasketApiCommand:HttpApiCommandService<BasketItems>,
    private storyBoxApiCommand:HttpApiCommandService<StoryTellBox>,
    private notifApiCommand:HttpApiCommandService<Notification>,
    private route:ActivatedRoute,
    private formBuilder:FormBuilder,
    private router:Router,
    private common:CommonService) { }

  async ngOnInit(): Promise<void> {
    this.CurentPage=1;
    this.Endpoint$="StoryTelling/facade";
    this.getUserid();
    await this.getBasketId();
    await this.getItems();
    console.log(this.CurrentUser$);
  }

  getUserid(){
    const id= this.route.parent?.parent?.parent?.snapshot.paramMap.get("username") ?? "no value";
    this.CurrentUser$=id;
  }
 getTagsId(){
  this.Tags=new Array<Observable<TagDto>>;
  this.Facades.forEach(async m=>{
  let value= await lastValueFrom(m);
  this.getTag(value.idTag);
  });
}

  getTag(id:number){
    const endpoint="Tag";
    const response=this.tagApiQuery.getWithDetails(endpoint,id.toString());
    this.Tags.push(response);
  }

innitTransactionForm(facade:FacadeDto){//modified
  this.TransactionForm=this.formBuilder.group({
    nameBook:[facade.nameStory,[Validators.required,Validators.maxLength(20)]],
    price:[facade.price,[Validators.required,Validators.min(0)]],
    storyTellId: [facade.idStoryTelling,[Validators.min(1)]]
  });
}


innitStoryBoxForm(facade:FacadeDto){
  this.StoryBoxForm=this.formBuilder.group({//modified
    storyTell: [facade.idStoryTelling,[Validators.min(1)]]
  });
}

innitNotifForm(facade:FacadeDto){//modified
  this.notifForm=this.formBuilder.group({
  title:['Achat de livre'],
  message:["Vous venez d'acheter le livre "+facade.nameStory] 
  });
}




  async getBasketId(){
    const endpoint="Basket";
    const response=this.basketApiQuery.get(endpoint);
     this.Basket=await lastValueFrom(response);
  }

  async getItems(){
    const endpoint="BasketItem";
    let params= new HttpParams();
   params=params.append("pgNumber",this.CurentPage);
    const response= this.basketItemsApiQuery.getWithDetailsParams(endpoint,this.Basket.basket_id.toString(),params);
    this.Items = await lastValueFrom(response);
    this.getFacades();
  }

  async getFacades(){
    this.Facades=new Array<Observable<FacadeDto>>;
      this.Items.items.forEach((m)=>{
      const response=this.storytellFacadeApiQuery.getWithDetails(this.Endpoint$,m.idStoryTelling.toString());
      this.Facades.push(response);
    });
    this.getTagsId();
  }



  async commitTransaction(facade:FacadeDto){
    const endpoint="Transactions"
    this.innitTransactionForm(facade);
    const response=this.transationApiCommand.post(this.TransactionForm.value,endpoint);
    const result=await lastValueFrom(response);
  }

  async createStoryBox(facade:FacadeDto){
    const endpoint="StoryBox"
    this.innitStoryBoxForm(facade);
    const response=this.storyBoxApiCommand.post(this.StoryBoxForm.value,endpoint);
    const result=await lastValueFrom(response);
  }

  async riseRef(facade:FacadeDto){
    const endpoint="StoryTelling/haveBeenBought";
   const response= this.storyTellingRef.putSpec(endpoint,facade.idStoryTelling.toString());
   const result=await lastValueFrom(response);
  }


  async commit(facades:Array<Observable<FacadeDto>>){

    facades.forEach(async m=>{
      let facade=await lastValueFrom(m);
      await this.commitTransaction(facade);
      await this.createStoryBox(facade);
      await this.riseRef(facade);
      await this.createNotification(facade)
    });
    await this.emptyBucket();
    await this.getItems();
    console.log('/Private/'+this.CurrentUser$+'/User-lambda/Library');
    setTimeout(() => {
      this.router.navigate(['/Private/'+this.CurrentUser$+'/User-lambda/Library']);
    }, 800);
  }
async emptyBucket(){
  const endpoint="BasketItem/empty";
  const response=this.BasketApiCommand.delete(endpoint,this.Basket.basket_id);
  const result=await lastValueFrom(response);
}



  async deleteItem(id:number){
    const endpoint="BasketItem";
    let params= new HttpParams();
    params=params.append("storyTell",id)
    const response=this.BasketApiCommand.deleteWithParams(endpoint,this.Basket.basket_id,params);
    const result=await lastValueFrom(response);
    this.getItems(); 
  }


  async createNotification(facade:FacadeDto){
    this.innitNotifForm(facade);
    const endpoint="Notification";
    const response=this.notifApiCommand.post(this.notifForm.value,endpoint);
    await lastValueFrom(response);
  }


  handleCommentaryPageEvent(event:PageEvent){
    this.CurentPage=event.pageIndex+1;
   this.getItems();
  }
}

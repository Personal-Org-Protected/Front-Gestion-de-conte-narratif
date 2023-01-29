import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { UserForfaitDto, UserForfaitVM } from 'src/app/private/models/EntityDto';
import {faEye,faStop} from '@fortawesome/free-solid-svg-icons'
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { ChangeForfait, UpdateUser } from 'src/app/private/models/Entity';
import { HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/private/services/common.service';
@Component({
  selector: 'app-forfait-possede',
  templateUrl: './forfait-possede.component.html',
  styleUrls: ['./forfait-possede.component.scss']
})
export class ForfaitPossedeComponent implements OnInit {
  private Endpoint:string;
  faEye=faEye;
  faStop=faStop;
  userRoleForm:FormGroup;
  result$:Observable<UserForfaitVM>;
  ForfaitUser:UserForfaitVM;
  private ParamRoute$:string;
   CurrentUser$:string;

  constructor(private forfaitUserApiQuery:HttpApiQueryService<UserForfaitVM>,
    private userForfaitApiCommand:HttpApiCommandService<ChangeForfait>,
    private userRoleApiCommand:HttpApiCommandService<UpdateUser>,
    private common:CommonService,
    private route:ActivatedRoute,
    private formBuilder:FormBuilder) {}

  async ngOnInit(): Promise<void> {
    this.Endpoint="UserForfaits";
    this.getUserid();
//this.CurrentUser$="UserLambda_270b7c19-1968-4920-970a-e3deed612cb3";
    await this.getUserForfait();
  }

  getUserid(){
    const id= this.route.parent?.parent?.parent?.snapshot.paramMap.get("user_id") ?? "no value";
    this.CurrentUser$=this.common.formatUserId(id); 
  }

  async getUserForfait(){
  const response = this.forfaitUserApiQuery.getWithDetails(this.Endpoint,this.CurrentUser$);
  this.ForfaitUser=await lastValueFrom(response) as UserForfaitVM;
  }


  async resiliate(id:number,roleId:number){
    await this.resiliateProcess(id);
    if(roleId==3){
      await this.deleteRoleUser(roleId);
      await this.deleteRoleAuth(roleId);
      await this.giveRoleUser();
      await this.giveRoleAuth();
    }

    if(roleId==2){
      console.log("lambda")
    await this.giveDefault();}

   await this.getUserForfait();
  }

  async resiliateProcess(id:number){
    const endpoint="UserForfaits"
    let params= new HttpParams();
    params=params.append('idForfait',id);
    const response=this.userForfaitApiCommand.deleteWithParams(endpoint,this.CurrentUser$,params);
    const result=await lastValueFrom(response);
    console.log(result);
  }


async giveDefault(){
  this.innitRoleForm();
  const endpoint="UserForfaits/Default";
const response=this.userForfaitApiCommand.post(this.userRoleForm.value,endpoint);
const result=await lastValueFrom(response);
console.log(result);
}

async deleteRoleUser(id:number){
const endpoint="UserRoles/Resiliate";
let params= new HttpParams();
params=params.append('roleId',id);
const response=this.userForfaitApiCommand.deleteWithParams(endpoint,this.CurrentUser$,params);
const result=await lastValueFrom(response);
console.log(result);
}
async deleteRoleAuth(id:number){
  console.log("delte user auth")
  const endpoint="UserAuth/Resiliate"
  let params= new HttpParams();
  params=params.append('roleId',id);
  const response=this.userForfaitApiCommand.deleteWithParams(endpoint,this.CurrentUser$,params);
  const result=await lastValueFrom(response);
  console.log(result);
}







innitRoleForm(){
  this.userRoleForm=this.formBuilder.group({
    user_id:[this.CurrentUser$,[Validators.required,Validators.minLength(1)]],
  });
}

async giveRoleUser(){
  this.innitRoleForm();
  const endpoint="UserRoles/FormerAuthor";
const response=this.userRoleApiCommand.post(this.userRoleForm.value,endpoint);
const result=await lastValueFrom(response);
console.log(result);
}

async giveRoleAuth(){
  this.innitRoleForm();
  const endpoint="UserAuth/FormerAuthor";
const response=this.userRoleApiCommand.post(this.userRoleForm.value,endpoint);
const result=await lastValueFrom(response);
console.log(result);
}
}

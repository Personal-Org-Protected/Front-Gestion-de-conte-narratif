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
  userForfaitForm:FormGroup;
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
    await this.getUserForfait();
  }

  getUserid(){
    const id= this.route.parent?.parent?.parent?.snapshot.paramMap.get("username") ?? "no value";
    this.CurrentUser$=this.common.formatUserId(id); 
  }

  async getUserForfait(){
  const response = this.forfaitUserApiQuery.get(this.Endpoint);
  this.ForfaitUser=await lastValueFrom(response) as UserForfaitVM;
  }


  async resiliate(id:number,roleId:number){//modified
    this.innitRoleForm(roleId);
    this.innitForfaitForm(1);
    if(roleId==3){
      await this.resiliateProcess(id);
      await this.deleteRoleUser(roleId);
      await this.deleteRoleAuth(roleId);
      await this.giveRoleUser();
      await this.giveRoleAuth();
    }

    if(roleId==2){
    await this.processForfait();}

   await this.getUserForfait();
  }

  async resiliateProcess(id:number){//modified
    const endpoint="UserForfaits/Resiliate"
    const response=this.userForfaitApiCommand.delete(endpoint,id.toString());
    const result=await lastValueFrom(response);
    console.log(result);
  }


async giveDefault(){//modfied
  const endpoint="UserForfaits/Default";
const response=this.userForfaitApiCommand.post(this.userRoleForm.value,endpoint);
const result=await lastValueFrom(response);
console.log(result);
}

async processForfait(){
  const endpoint="UserForfaits/Standard";
  const response=this.userForfaitApiCommand.post(this.userForfaitForm.value,endpoint);
  await lastValueFrom(response);
}

async deleteRoleUser(id:number){//modified
const endpoint="UserRoles/Resiliate/Own";
const response=this.userRoleApiCommand.delete(endpoint,id.toString());
const result=await lastValueFrom(response);
console.log(result);
}
async deleteRoleAuth(id:number){//modified
  const endpoint="UserAuth/Resiliate/Own"
  const response=this.userRoleApiCommand.delete(endpoint,id.toString());
  const result=await lastValueFrom(response);
  console.log(result);
}







innitRoleForm(roleId:number){
  this.userRoleForm=this.formBuilder.group({
    idRole: [roleId,[Validators.min(1)]]
  });

}

innitForfaitForm(id:number){//modified
  this.userForfaitForm=this.formBuilder.group({
    
    idForfait: [id,[Validators.min(1)]]
  });
}

async giveRoleUser(){
  const endpoint="UserRoles/FormerAuthor";
const response=this.userRoleApiCommand.post(this.userRoleForm.value,endpoint);
const result=await lastValueFrom(response);
console.log(result);
}

async giveRoleAuth(){
  const endpoint="UserAuth/FormerAuthor";
const response=this.userRoleApiCommand.post(this.userRoleForm.value,endpoint);
const result=await lastValueFrom(response);
console.log(result);
}
}

import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { ChangeForfait, UpdateUser } from 'src/app/private/models/Entity';
import { ForfaitDto, RoleDto, userDisplay, UserForfaitVM, UserRolesVM } from 'src/app/private/models/EntityDto';
import { CommonService } from 'src/app/private/services/common.service';

@Component({
  selector: 'app-achat-forfait',
  templateUrl: './achat-forfait.component.html',
  styleUrls: ['./achat-forfait.component.scss']
})
export class AchatForfaitComponent implements OnInit {

  private Endpoint$:string;
  private paramaRoute$:string;
  private roles:UserRolesVM;
  private pgNumber:number;
  CurrentUser$:string;
  User:userDisplay;
  result$:Observable<ForfaitDto>;
  Forfait:ForfaitDto;
  userForfaitForm:FormGroup;
  userRoleForm:FormGroup;
  constructor(
    private userInfoApiQuery:HttpApiQueryService<userDisplay>,
    private formBuilder:FormBuilder,
    private forfaitQueryApi:HttpApiQueryService<ForfaitDto>,
    private userForfaitApiCommand:HttpApiCommandService<ChangeForfait>,
    private userRoleApiCommand:HttpApiCommandService<UpdateUser>,
    private userRoleApiQueries:HttpApiQueryService<UserRolesVM>,
    private route:ActivatedRoute,
    private router:Router,
    private common:CommonService,) { }

  async ngOnInit(): Promise<void> {
    this.Endpoint$="Forfait";this.pgNumber=1;
    this.getUserid();
    this.getid();
    await this.getForfait();
    await this.getUserRoles();
    await this.getCurrentUserInfo();
  }

  getUserid(){
    const id= this.route.parent?.parent?.parent?.snapshot.paramMap.get("user_id") ?? "no value";
    this.CurrentUser$=this.common.formatUserId(id); 
  }

  innitForfaitForm(id:number){
    this.userForfaitForm=this.formBuilder.group({
      user_id:[this.CurrentUser$,[Validators.required,Validators.minLength(1)]],
      idForfait: [id,[Validators.min(1)]]
    });
  }
  innitRoleForm(){
    this.userRoleForm=this.formBuilder.group({
      user_id:[this.CurrentUser$,[Validators.required,Validators.minLength(1)]],
    });
  }



  async getUserRoles(){
    const endpoint="UserRoles"
    const response=this.userRoleApiQueries.getWithDetails(endpoint,this.CurrentUser$);
    this.roles=await lastValueFrom(response);
  }
  getid(){
      this.paramaRoute$=this.route.snapshot.paramMap.get('id')?? "No value";
  }

  async getForfait(){
    this.result$=this.forfaitQueryApi.getWithDetails(this.Endpoint$,this.paramaRoute$);
    this.Forfait=await lastValueFrom(this.result$);
  }

  async getCurrentUserInfo(){
    const endpoint="User"
const response=this.userInfoApiQuery.getWithDetails(endpoint,this.CurrentUser$);
this.User=await lastValueFrom(response);
  }



  async BuyForfait(id:number){
     this.innitForfaitForm(id);
        const endpoint="UserForfaits/Standard";
      const response=this.userForfaitApiCommand.post(this.userForfaitForm.value,endpoint);
      const result=await lastValueFrom(response);
      console.log(result);
     if(this.Forfait.roleId==3){
    await this.addressAuthorConfig();
    } 
    setTimeout(() => {
      this.router.navigate(['/Private/'+this.CurrentUser$+'/User-lambda/Forfait-acheté']);
    }, 600); 
      }

      

     async addressAuthorConfig(){
        await this.giveRoleUser();
        await this.giveRoleAuth();
        if(this.roles.userRoles.find(t=>t.idRole==4)!=null)
        {
        await this.deleteRoleUser(4);
       await this.deleteRoleAuth(4);}
      }
  async giveRoleUser(){
    this.innitRoleForm();
    const endpoint="UserRoles/Author";
  const response=this.userRoleApiCommand.post(this.userRoleForm.value,endpoint);
  const result=await lastValueFrom(response);
  console.log(result);
  }

  async giveRoleAuth(){
    this.innitRoleForm();
    const endpoint="UserAuth/Author";
  const response=this.userRoleApiCommand.post(this.userRoleForm.value,endpoint);
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
}

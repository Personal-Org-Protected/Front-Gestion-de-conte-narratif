import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { ChangeForfait, Notification, UpdateUser } from 'src/app/private/models/Entity';
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
  notifForm:FormGroup;

  constructor(
    private userInfoApiQuery:HttpApiQueryService<userDisplay>,
    private formBuilder:FormBuilder,
    private forfaitQueryApi:HttpApiQueryService<ForfaitDto>,
    private userForfaitApiCommand:HttpApiCommandService<ChangeForfait>,
    private userRoleApiCommand:HttpApiCommandService<UpdateUser>,
    private userRoleApiQueries:HttpApiQueryService<UserRolesVM>,
    private notifApiCommand:HttpApiCommandService<Notification>,
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
    const id= this.route.parent?.parent?.parent?.snapshot.paramMap.get("username") ?? "no value";
    this.CurrentUser$=this.common.formatUserId(id); 
  }

  innitForfaitForm(id:number){//modified
    this.userForfaitForm=this.formBuilder.group({
      
      idForfait: [id,[Validators.min(1)]]
    });
  }

  innitRoleForm(id:number){//modified
    this.userRoleForm=this.formBuilder.group({
      idRole: [id,[Validators.min(1)]]
    });
  }
  innitNotifForm(nom:string){//modified
    this.notifForm=this.formBuilder.group({
    title:['Achat de forfait'],
    message:["Vous venez d'acheter le forfait "+nom] 
    });
  }



  async getUserRoles(){
    const endpoint="UserRoles"
    const response=this.userRoleApiQueries.get(endpoint);
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
    const endpoint="User/Own"
const response=this.userInfoApiQuery.get(endpoint);
this.User=await lastValueFrom(response);
  }



  async BuyForfait(id:number,nom:string){//modified
     this.innitForfaitForm(id);
     let idRole=this.Forfait.roleId;
      await this.processForfait();

     if(idRole==3){
      this.innitRoleForm(idRole)
    await this.addressAuthorConfig();
    }
     await this.createNotification(nom);
    setTimeout(() => {
      this.router.navigate(['/Private/'+this.CurrentUser$+'/User-lambda/Forfait-acheté']);
    }, 600); 
      }

      async createNotification(nom:string){
        this.innitNotifForm(nom);
        const endpoint="Notification";
        const response=this.notifApiCommand.post(this.notifForm.value,endpoint);
        await lastValueFrom(response);
      }

      async processForfait(){
        const endpoint="UserForfaits/Standard";
        const response=this.userForfaitApiCommand.post(this.userForfaitForm.value,endpoint);
        await lastValueFrom(response);
      }

     async addressAuthorConfig(){
        await this.giveRoleUser();
        await this.giveRoleAuth();
        if(this.roles.userRoles.find(t=>t.idRole==4)!=null)
        {
          console.log("delete former author process ....");
        await this.deleteRoleUser(4);
        await this.deleteRoleAuth(4);
       }
      }


  async giveRoleUser(){//modified
    const endpoint="UserRoles/Author";
  const response=this.userRoleApiCommand.post(this.userRoleForm.value,endpoint);
  const result=await lastValueFrom(response);
  console.log(result);
  }

  async giveRoleAuth(){//modified
  const endpoint="UserAuth/Author";
  const response=this.userRoleApiCommand.post(this.userRoleForm.value,endpoint);
  const result=await lastValueFrom(response);
  console.log(result);
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
}

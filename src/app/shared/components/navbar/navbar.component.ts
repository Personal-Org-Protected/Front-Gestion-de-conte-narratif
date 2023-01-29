import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/core/auth/auth-services.service';
import{firstValueFrom, lastValueFrom} from 'rxjs'
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { UserRolesDto, UserRolesVM } from 'src/app/private/models/EntityDto';
import { User } from '@auth0/auth0-angular';
import { CommonService } from 'src/app/private/services/common.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  Roles!:Array<UserRolesDto>;
 user_id!:string;
 private  Endpoint!:string;
  constructor(public auth:AuthServicesService,
    private userRoleApiQuery:HttpApiQueryService<UserRolesVM>,
    private common:CommonService) { }

  async ngOnInit(): Promise<void> {
    this.Endpoint="UserRoles";
    this.Roles= new Array<UserRolesDto>;
   await  this.getIdUser();
   await this.getUserRoles();
  }


  async getIdUser(){
    const response= this.auth.getUser();
    const result=await firstValueFrom(response) as User;
    this.user_id=this.common.formatUserId(result.sub as string) as string;
  }
 async getUserRoles(){
  const user_id=this.common.formatUserId(this.user_id);
  const response=this.userRoleApiQuery.getWithDetails(this.Endpoint,user_id);
 const result=await lastValueFrom(response);
  this.Roles=result.userRoles;
}

   login(){
    this.auth.login();
  }

  logout(){
    this.auth.logout();
  }

  isAuthor(){
    const role=this.Roles.find(t=>t.idRole===3 || t.idRole==4);
    if(role==null)return false;
    return true;
  }

  isAdmin(){
const role=this.Roles.find(t=>t.idRole===1);
if(role==null)return false;
return true;
  }

  isUserLambda(){
    const role=this.Roles.find(t=>t.idRole===2);
    if(role==null)return false;
    return true;
  }

}

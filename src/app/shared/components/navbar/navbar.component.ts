import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/core/auth/auth-services.service';
import{firstValueFrom, lastValueFrom, Observable} from 'rxjs'
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { IsRoleDto, NotificationDto } from 'src/app/private/models/EntityDto';
import { User } from '@auth0/auth0-angular';
import { CommonService } from 'src/app/private/services/common.service';
import {faBasketShopping,faArrowLeft,faArrowRight} from '@fortawesome/free-solid-svg-icons'
import { PaginatedItems } from 'src/app/private/models/Common';
import { PageEvent } from '@angular/material/paginator';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

   resultNotif:PaginatedItems<NotificationDto>
  currentPage:number;
  faBasketShopping=faBasketShopping;
  faArrowLeft=faArrowLeft;
  faArrowRight=faArrowRight;
  Roles!:boolean;
 user_id!:string;
 username!:string;
 countBasket:Observable<number>;
 countNotif:Observable<number>;
 private  Endpoint!:string;
  constructor(public auth:AuthServicesService,
    private userRoleApiQuery:HttpApiQueryService<IsRoleDto>,
    private countApiQuery:HttpApiQueryService<number>,
    private notifApiQuery:HttpApiQueryService<PaginatedItems<NotificationDto>>,
    private notifApiCommand:HttpApiCommandService<NotificationDto>,
    public common:CommonService) { }

    async ngOnInit(): Promise<void> {
    this.currentPage=1;
    this.Endpoint="UserRoles";
    this.Roles= false
   await  this.getIdUser();
   await this.getUsername();
   await this.getUserRoles();
    await this.getCountBasket();
   await this.getCountNotif();
   await this.getNotifications();
  }


  async getIdUser(){
    const response= this.auth.getUser();
    const result=await firstValueFrom(response) as User;
    this.user_id=this.common.formatUserId(result.sub as string) as string;
  }

  async getUsername(){
    const response= this.auth.getUser();
    const result=await firstValueFrom(response) as User;
    this.username=(result.nickname as string) as string;
  }

 async getUserRoles(){
  const user_id=this.common.formatUserId(this.user_id);
  let response = this.userRoleApiQuery.get(this.Endpoint);
  const result= await lastValueFrom(response);
  this.Roles=result.isRole;
}

   login(){
    this.auth.login();
  }

  logout(){
    this.auth.logout();
  }


  isAdmin(){;
  if(!this.Roles)return false;
  return true;
  }


  async getCountBasket(){
    const endpoint="BasketItem/count";
    this.countBasket=this.countApiQuery.get(endpoint);
  }
  async getCountNotif(){
    const endpoint="Notification/count";
    this.countNotif=this.countApiQuery.get(endpoint);
  }


  async getNotifications(){
    const endpoint="Notification";
    const response=this.notifApiQuery.getWithDetails(endpoint,this.currentPage.toString());
    this.resultNotif=await lastValueFrom(response);
  }

  async changePage(pg:number){
    this.currentPage= this.currentPage+pg;
    await this.getNotifications();
  }

  async readNotif(id:number){
    const endpoint="Notification"
    let params=new HttpParams();
    params=params.append("NotifId",id);
    const response=this.notifApiCommand.putWithParams(endpoint,id.toString(),null,params);
    const result=await lastValueFrom(response);
   await this.getCountNotif();
    await this.getNotifications();
    }
}

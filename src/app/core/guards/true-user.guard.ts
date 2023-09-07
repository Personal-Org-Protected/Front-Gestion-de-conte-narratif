import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { User } from '@auth0/auth0-angular';
import { firstValueFrom, Observable } from 'rxjs';
import { CommonService } from 'src/app/private/services/common.service';
import { AuthServicesService } from '../auth/auth-services.service';

@Injectable({
  providedIn: 'root'
})
export class TrueUserGuard implements CanActivate {

  constructor(private userInfo:AuthServicesService,private router:Router,private common: CommonService){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const userRoute=route.paramMap.get("username")!;
      let user=this.getUserInfo();
      return this.checkUserId(user,userRoute);
  }
  

  private async getUserInfo(){
    const response = this.userInfo.getUser();
    const result= await firstValueFrom(response);
    return result;
    }
    
    private async checkUserId(userInfo:Promise<User>,userRoute:string){

      let user= await userInfo;
      let username=this.common.formatUserId(user.nickname!);
    if(username==undefined || username==null || username!=userRoute){this.router.navigate(['Error/forbidden']); return false;}
    return true;
    }
}

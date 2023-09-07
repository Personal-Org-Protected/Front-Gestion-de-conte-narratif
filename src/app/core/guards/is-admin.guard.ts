import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { User } from '@auth0/auth0-angular';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { IsRoleDto, UserRolesDto } from 'src/app/private/models/EntityDto';
import { AuthServicesService } from '../auth/auth-services.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate,CanActivateChild {

  constructor(private userRolesApiQuery:HttpApiQueryService<IsRoleDto>,private router:Router){}

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return true;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let userRole= this.getUserRole();
      return this.checkUserRole(userRole);


  }
  


  private async checkUserRole(userRole:Promise<IsRoleDto>){
   let Role=await userRole;
   if(Role.isRole)return true;
   else{
    this.router.navigate(['Error/forbidden']);
  return false;}
  }

  private async  getUserRole(){
    const endpoint="UserRoles/isAdmin";
   const response= this.userRolesApiQuery.get(endpoint);
   const result=await lastValueFrom(response)
   return result;
  }
}

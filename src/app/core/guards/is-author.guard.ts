import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { IsRoleDto } from 'src/app/private/models/EntityDto';

@Injectable({
  providedIn: 'root'
})
export class IsAuthorGuard implements CanActivate {
  constructor(private userRolesApiQuery:HttpApiQueryService<IsRoleDto>,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let author= this.isUserAuhtor();
      let former= this.isUserFormer();
      return this.checkUserRole(author,former);
  }
  

  private async checkUserRole(author:Promise<IsRoleDto>,former:Promise<IsRoleDto>){
    let auteur=await author;
    let ancien=await former;
    if(auteur.isRole || ancien.isRole)return true;
    else{
      this.router.navigate(['Error/forbidden']);
    return false;}
   }
 
   private async  isUserAuhtor(){
     const endpoint="UserRoles/isAuthor";
    const response= this.userRolesApiQuery.get(endpoint);
    const result=await lastValueFrom(response)
    return result;
   }
   private async  isUserFormer(){
    const endpoint="UserRoles/isFormer";
   const response= this.userRolesApiQuery.get(endpoint);
   const result=await lastValueFrom(response)
   return result;
  }
}

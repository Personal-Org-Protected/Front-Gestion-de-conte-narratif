import { AsyncPipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { PaginatedItems } from 'src/app/private/models/Common';
import { Commentary, Transaction, UpdateUser, User, UserIntern } from 'src/app/private/models/Entity';
import { HasBeenBoughtDto, IsRoleDto, StoryTellingDto, userDisplay, UserRolesDto, UserRolesVM } from 'src/app/private/models/EntityDto';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  isLoading:boolean;
  private Endpoint:string;
  private pgNumber:number;
  userRoleForm:FormGroup;
  Users$:PaginatedItems<userDisplay>;
  Roles$:Array<Observable<IsRoleDto>>;
  result$!:Observable<PaginatedItems<userDisplay>>;
  constructor(private userQueryApi:HttpApiQueryService<userDisplay>,
    private userRoleQueryApi:HttpApiQueryService<IsRoleDto>,
  private userRoleCommandApi:HttpApiCommandService<UpdateUser> ,
  private formBuilder:FormBuilder,
     private router:Router) { 
    this.Endpoint="User";
    this.pgNumber=1;
  }

  async ngOnInit(): Promise<void> {
    this.isLoading=true;
    await this.getUsers(this.pgNumber);
  }

   async getUsers(pgNumber:number){
  this.result$=this.userQueryApi.getWithPagination(this.Endpoint,pgNumber);
  this.Users$=await lastValueFrom(this.result$);
  this.getRoleById();
}


GetDetails(user_id:string){
this.router.navigate(['User-details',user_id]);
}




getRoleById(){
  this.Roles$=new Array<Observable<IsRoleDto>>();
this.Users$.items.forEach(m=>this.isAlreadyAdmin(m.user_id));
this.isLoading=false;
}
async isAlreadyAdmin(user_id:string){
  const endpoint="UserRoles/isAdmin"
  const response= this.userRoleQueryApi.getWithDetails(endpoint,user_id);
this.Roles$.push(response);
}



/* checkUserHasStorySold(user_id:string):boolean{
  let hasBeenBought:boolean=false;
const endpoint="StoryTelling/hasBeenBought";
const response=this.StoryHasbeenBoughtTellQueryApi.getWithDetails(endpoint,user_id);
lastValueFrom(response).then((res)=>{
 hasBeenBought= res.IsBought
});
return hasBeenBought;
}
 */


async makeAdmin(user_id:string){
await this.giveRoleUser(user_id);
await this.giveRoleAuth(user_id);

await this.getUsers(this.pgNumber);
}

innitRoleForm(user_id:string){
  this.userRoleForm=this.formBuilder.group({
    user_id:[user_id,[Validators.required,Validators.minLength(1)]],
  });
}

async giveRoleUser(user_id:string){
  this.innitRoleForm(user_id);
  const endpoint="UserRoles/Admin";
const response=this.userRoleCommandApi.post(this.userRoleForm.value,endpoint);
const result=await lastValueFrom(response);
}

async giveRoleAuth(user_id:string){
  this.innitRoleForm(user_id);
  const endpoint="UserAuth/Admin";
const response=this.userRoleCommandApi.post(this.userRoleForm.value,endpoint);
const result=await lastValueFrom(response);
}







handlePageEvent(event:PageEvent){
  this.pgNumber=event.pageIndex+1
  this.getUsers(this.pgNumber);
}



}

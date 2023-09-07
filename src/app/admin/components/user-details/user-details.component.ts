import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { UpdateUser, User } from 'src/app/private/models/Entity';
import { userDisplay, UserRolesVM } from 'src/app/private/models/EntityDto';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  private EndPoint:string;
  private ParamRoute$:string;
  private  userAuthForm:FormGroup;
  // InternResult$:Observable<any>;
  User$:userDisplay;
  result$:Observable<userDisplay>;
  resultRole$:Observable<UserRolesVM>
  CurrentUser$:string;
  isLoading:boolean;

  constructor(
    private userRolesQueryApi:HttpApiQueryService<UserRolesVM>,
    private userQueryApi:HttpApiQueryService<userDisplay> ,
    private userAuthCommandApi:HttpApiCommandService<UpdateUser> ,
    private ActiveRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute,
    private router:Router) {
    this.EndPoint="User"
   }

    ngOnInit(): void {
    this.isLoading=true;
        this.getId();
        this.getUserid();
         this.getUserDetails(this.ParamRoute$);
         this.getRolesUser(this.ParamRoute$);
  }

  getUserid(){
    const id= this.route.parent?.parent?.parent?.snapshot.paramMap.get("username") ?? "no value";
    this.CurrentUser$=id;
  }
  getId(){
    this.ParamRoute$ = this.ActiveRoute.snapshot.paramMap.get('user_id')?? "No value";
  }
/*    getUserInternDetails(user_id:string){
    const endpoint=this.EndPoint+"/UsersIntern"
    this.InternResult$= this.userInternQueryApi.getWithDetails(endpoint,this.ParamRoute$);
  } */

  getRolesUser(user_id:string){
    const endpoint="UserRoles"
    this.resultRole$=this.userRolesQueryApi.getWithDetails(endpoint,user_id);
    this.isLoading=false;
  }
  async getUserDetails(user_id:string){
    this.result$=this.userQueryApi.getWithDetails(this.EndPoint, this.ParamRoute$);
    this.User$=await lastValueFrom(this.result$);
  }


  innitAuthForm(username:string){
    this.userAuthForm=this.formBuilder.group({
      user_id:[this.ParamRoute$,[Validators.required,Validators.minLength(1)]],
      username:[username,[Validators.required,Validators.minLength(1)]],
    });
  }
  

  async blockUser(username:string){
     this.innitAuthForm(username);
    const endpoint="UserAuth/block";
    const response=this.userAuthCommandApi.put(this.userAuthForm.value,endpoint,this.ParamRoute$);
    const result=await lastValueFrom(response);
    console.log(result); 
    setTimeout(() => {
      this.router.navigate(['/Private/'+this.CurrentUser$+'/Admin/Users-liste']);
    }, 400); 
  }

}

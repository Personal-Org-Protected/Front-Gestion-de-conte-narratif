import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Library } from '@fortawesome/fontawesome-svg-core';
import { lastValueFrom, Observable } from 'rxjs';
import { AuthServicesService } from 'src/app/core/auth/auth-services.service';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { Result } from 'src/app/private/models/Common';
import { UpdateUser, User } from 'src/app/private/models/Entity';
import { UserIdDto } from 'src/app/private/models/EntityDto';


@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.scss']
})
export class UserCreationComponent implements OnInit {

  ActionBtn:string="Save";
  UserForm : FormGroup;
  UserRoleForm:FormGroup;
  LibraryForm:FormGroup;
  result$:Observable<Result>;
  private Endpoint: string;
  private user_id:string;

  constructor(private formBuilder:FormBuilder,
    private userApiQuery:HttpApiQueryService<UserIdDto>,
    private userApiCommand:HttpApiCommandService<User>,
    private userAuthApiCommand:HttpApiCommandService<User>,
    private userForfaitCommand:HttpApiCommandService<UpdateUser>,
    private userRoleCommand:HttpApiCommandService<UpdateUser>,
    private basketApiCommand:HttpApiCommandService<UpdateUser>,
    private libraryCommandApi:HttpApiCommandService<Library>,
    private auth:AuthServicesService) { }

  ngOnInit(): void {
    this.Endpoint="User";
    this.innitUserForm();
  }


  innitUserForm(){
    this.UserForm=this.formBuilder.group({
      password: ['',[Validators.maxLength(15),Validators.minLength(5),Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,15}$")]],
      username:['',[Validators.required,Validators.maxLength(15)]],
      user_id:['',],
      email: ['',[Validators.required,Validators.email]],
      location: ['',[Validators.maxLength(60)]],
      phoneNumber:['',[Validators.required,Validators.minLength(10),Validators.pattern("^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$")]],
      birthDate:['',[Validators.required]],
      description:['',[Validators.maxLength(200)]]
    });
  }

  innitUserRoleForm(){
    this.UserRoleForm=this.formBuilder.group({
      user_id:[this.user_id,[Validators.required,Validators.minLength(1)]],
    });
  }




  
 async onSubmit(){ //Le soleil se levait, l'horizon s’éclaircissait.

    if(this.UserForm.valid){
      await this.fillForm();
     await this.createUser();
    await this.createUserAuth();
     await this.addressDefaultForfait();
     await this.addressDefaultRole();
     await this.addressDefaultAuthRole(); 
     await this.createLibrary();
     await this.createBasket();
      setTimeout(() => {
      this.auth.login();
     }, 800); 
    } 
  
   }


   async fillForm(){
    await this.getUserId(this.UserForm.get('username')?.value);
    this.UserForm.patchValue({
      user_id:this.user_id
    });
    this.innitUserRoleForm();
   }


   async getUserId(username:string){
    const endpoint=this.Endpoint+"/GenerateId";
   const response= this.userApiQuery.getNoToken(endpoint,username);
   const result=await lastValueFrom(response);
   this.user_id=result.user_id; 
   }

   async createLibrary(){
    const endpoint="Library";
    const response= this.libraryCommandApi.PostNotoken(this.UserRoleForm.value,endpoint);
   const result=await lastValueFrom(response); 
   console.log(result);
   }

   async createBasket(){
    const endpoint="Basket";
    const response=this.basketApiCommand.PostNotoken(this.UserRoleForm.value,endpoint);
    const result = await lastValueFrom(response);
    console.log(result);
   }

  async createUser(){
    const response=this.userApiCommand.PostNotoken(this.UserForm.value,this.Endpoint);
    const result=await lastValueFrom(response);
    console.log(result);
   }

   async createUserAuth(){
    const endpoint="UserAuth"
    const response=this.userAuthApiCommand.PostNotoken(this.UserForm.value,endpoint);
    const result=await lastValueFrom(response);
    console.log(result);
   }

   async addressDefaultRole(){
    const endpoint="UserRoles/Default"
    const response=this.userAuthApiCommand.PostNotoken(this.UserRoleForm.value,endpoint);
    const result=await lastValueFrom(response);
    console.log(result);
   }

   async addressDefaultAuthRole(){
    const endpoint="UserAuth/Default"
    const response=this.userAuthApiCommand.PostNotoken(this.UserRoleForm.value,endpoint);
    const result=await lastValueFrom(response);
    console.log(result);
   }

   async addressDefaultForfait(){
    const endpoint="UserForfaits/Default"
    const response=this.userAuthApiCommand.PostNotoken(this.UserRoleForm.value,endpoint);
    const result=await lastValueFrom(response);
    console.log(result);
   }

   resetPage(){
    this.UserForm.reset();
   }


   get username(){
    return this.UserForm.get("username");
   }
   get password(){
    return this.UserForm.get("password");
   }
   get email(){
    return this.UserForm.get("email");
   }
   get location(){
    return this.UserForm.get("location");
   }
   get phoneNumber(){
    return this.UserForm.get("phoneNumber");
   }
   get birthDate(){
    return this.UserForm.get("birthDate");
   }
   get description(){
    return this.UserForm.get("description");
   }

}

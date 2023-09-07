import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiCommandService } from '../../http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from '../../http/Queries-Services/http-api-query.service';
import { UpdateUser } from '../../models/Entity';
import { userDisplay, UserRolesVM } from '../../models/EntityDto';
import { DialogImageChoiceComponent } from '../dialog-image-choice/dialog-image-choice.component';
import {faEdit} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.scss']
})
export class UserDisplayComponent implements OnInit {
  private content:any;
  private inputPhone:any;
  private inputLocation:any;
  isTexteArea=false;
  isInput=false;
  faEdit=faEdit;

  private EndPoint:string;
  private  userAuthForm:FormGroup;
  private avatarForm:FormGroup;
  private  userForm:FormGroup;
  User$:userDisplay;
  result$:Observable<userDisplay>;
  resultRole$:Observable<UserRolesVM>
  CurrentUser$:string;
  ngOnInit(): void {
        this.getUserid();
         this.getUserDetails();
         this.getRolesUser();
  }

  constructor(
    private userRolesQueryApi:HttpApiQueryService<UserRolesVM>,
    private userQueryApi:HttpApiQueryService<userDisplay> ,
    private userAuthCommandApi:HttpApiCommandService<UpdateUser> ,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute,
    public dialog: MatDialog,) {
    this.EndPoint="User"
   }

   getUserid(){
    const id= this.route.parent?.parent?.parent?.snapshot.paramMap.get("user_id") ?? "no value";
    this.CurrentUser$=id;
  }



  getRolesUser(){
    const endpoint="UserRoles"
    this.resultRole$=this.userRolesQueryApi.get(endpoint);
  }
  async getUserDetails(){
const endpoint=this.EndPoint+'/Own'
    this.result$=this.userQueryApi.get(endpoint);
    this.User$=await lastValueFrom(this.result$);
  }


  patchValueForm(description:string,location:string,phone:string){
    this.userForm=this.formBuilder.group({
      location:[location,[Validators.required,Validators.minLength(1)]],
      phoneNumber:[phone,[Validators.required,Validators.minLength(10),Validators.pattern("^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$")]],
      description:[description,[Validators.required,Validators.minLength(1),Validators.maxLength(200)]],
    });
  }

  innitAvatarForm(avatar:string){
    this.avatarForm=this.formBuilder.group({
      avatar:avatar,
    });
  }


  async modifyUser(){
  const response= this.userAuthCommandApi.putStand(this.userForm.value,this.EndPoint);
 const result=await lastValueFrom(response);
  }
  async modifyAuthUser(){
    const endpoint='UserAuth'
    const response=this.userAuthCommandApi.putStand(this.userAuthForm.value,endpoint);
    const result=await lastValueFrom(response);
  }


  async changeAvatar(){
    const dialogRef =this.dialog.open(DialogImageChoiceComponent,{
      data:this.User$.avatar
    });
    const choice= await lastValueFrom(dialogRef.afterClosed());
    const newImage=choice.image as string
    this.innitAvatarForm(newImage);
    await this.updateImage();
  }

  async updateImage(){
  const endpoint="User/avatar";
  const response=this.userAuthCommandApi.putStand(this.avatarForm.value,endpoint)
  const result=await lastValueFrom(response);
  console.log(result);
  await this.getUserDetails()
  }



  TextAreaMode(){
    var e = document.querySelector('.description') as HTMLParagraphElement;
    var d = document.createElement('textarea');
    this.content=e;
    d.cols=60;
    d.rows=8;
    d.textContent=e.textContent ;
    e.parentNode?.replaceChild(d, e);
  }

  inputPhoneMode(){
    var e = document.querySelector('.phone') as HTMLParagraphElement;
    var d = document.createElement('input');
    this.inputPhone=e;
    d.value=e.textContent!;
    e.parentNode?.replaceChild(d, e);
  }

  inputLocationMode(){
    var e = document.querySelector('.location') as HTMLParagraphElement;
    var d = document.createElement('input');
    this.inputLocation=e;
    d.value=e.textContent!;
    e.parentNode?.replaceChild(d, e);
  }


  backToTextDescriptionMode(){
    var e = document.getElementsByTagName('textarea')[0];
    var d = document.createElement('p');
    d=this.content;
    d.textContent=e.value ;
    e.parentNode?.replaceChild(d, e);
    d.classList.add("text-muted");
    return e.value;
  }

  backToTextPhoneMode(){
    var e = document.getElementsByTagName('input')[0];
    var d = document.createElement('p');
    d=this.inputPhone;
    d.textContent=e.value ;
    e.parentNode?.replaceChild(d, e);
    d.classList.add("text-muted");
    return e.value;
  }
  backToTextLocationMode(){
    var e = document.getElementsByTagName('input')[0];
    var d = document.createElement('p');
    d=this.inputLocation;
    d.textContent=e.value ;
    e.parentNode?.replaceChild(d, e);
    d.classList.add("text-muted");
    return e.value;
  }

  async backToOriginal(){
    let inputLocation:string="";
    let inputPhone:string="";
    let content:string="";
    content=this.backToTextDescriptionMode()!;
    inputPhone=this.backToTextPhoneMode();
    inputLocation=this.backToTextLocationMode()
    this.patchValueForm(content,inputLocation,inputPhone);
    await this.modifyUser();
  }

 



  formMode(){
      this.TextAreaMode();
      this.inputPhoneMode();
      this.inputLocationMode();
  }


  process(){
    if(!this.isTexteArea && ! this.isInput){
      this.formMode();
      this.isInput=true;
      this.isTexteArea=true;
    }
    else{
      this.backToOriginal();
      this.isTexteArea=false;
      this.isInput=false;
    }
  }
  
}

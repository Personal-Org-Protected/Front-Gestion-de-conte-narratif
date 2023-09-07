import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, } from '@angular/material/dialog';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { Notification } from 'src/app/private/models/Entity';
import {lastValueFrom} from 'rxjs';
import {faAdd} from '@fortawesome/free-solid-svg-icons';
import { Result } from 'src/app/private/models/Common';


@Component({
  selector: 'app-send-message-to-user',
  templateUrl: './send-message-to-user.component.html',
  styleUrls: ['./send-message-to-user.component.scss']
})
export class SendMessageToUserComponent {
  faAdd=faAdd;
  private Endpoint:string;
  NotifForm:FormGroup
  constructor(  @Inject(MAT_DIALOG_DATA) private data: string,
  private notifApiCommmand:HttpApiCommandService<Notification>,
  private formBuilder:FormBuilder,
  public dialogRef: MatDialogRef<SendMessageToUserComponent>
) { }

async ngOnInit(): Promise<void> {
this.Endpoint="Notification/admin";
  this.innitPostForm();
}

innitPostForm(){
  this.NotifForm=this.formBuilder.group({
    user_id:[this.data,[Validators.required,Validators.minLength(1)]],
    title: ['',[Validators.required,Validators.minLength(1)]],
    message: ['',[Validators.required,Validators.maxLength(200)]]
  });
}

async submit(){
  if(this.NotifForm.valid){
  const response=this.notifApiCommmand.post(this.NotifForm.value,this.Endpoint)
  const result=await lastValueFrom(response)
  this.dialogRef.close(result)}
}
}

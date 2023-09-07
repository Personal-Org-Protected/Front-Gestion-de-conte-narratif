import { HttpParams } from '@angular/common/http';
import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { PaginatedItems } from 'src/app/private/models/Common';
import { ImageDto } from 'src/app/private/models/EntityDto';
import {faCheck} from '@fortawesome/free-solid-svg-icons'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog-image-choice',
  templateUrl: './dialog-image-choice.component.html',
  styleUrls: ['./dialog-image-choice.component.scss']
})
export class DialogImageChoiceComponent {


  faCheck=faCheck;
  image:string;

  constructor( @Inject(MAT_DIALOG_DATA) data:string,
  public dialogRef: MatDialogRef<DialogImageChoiceComponent>,) {this.image=data;}

  chosenImage(){
    this.dialogRef.close({image:this.image});
  }

  loadImage(){
  var input=document.querySelector("#image") as HTMLInputElement;
  this.image=input.value;
  window.location.reload;
  }

}

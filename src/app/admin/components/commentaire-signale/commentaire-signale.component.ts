import { Component, Inject, OnInit } from '@angular/core';
import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { ConnectableObservable, first, lastValueFrom, Observable, observeOn, of, queueScheduler } from 'rxjs';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { PaginatedItems, Result } from 'src/app/private/models/Common';
import { CommentaryDto, userDisplay } from 'src/app/private/models/EntityDto';
import {faTrash,faCheckDouble,faEye,faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { Commentary } from 'src/app/private/models/Entity';
import { MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { SendMessageToUserComponent } from '../send-message-to-user/send-message-to-user.component';

@Component({
  selector: 'app-commentaire-signale',
  templateUrl: './commentaire-signale.component.html',
  styleUrls: ['./commentaire-signale.component.scss']
})
export class CommentaireSignaleComponent implements OnInit {

  faEye=faEye;
  faTrash=faTrash;
  faCheckDouble=faCheckDouble;
  faEnvelope=faEnvelope;
  result$:Observable<PaginatedItems<CommentaryDto>>;
  resultCommentary$:Array<CommentaryDto>;
  resultUser$:Array<Observable<userDisplay>>;
  isLoading:boolean;
  private Endpoint:string;
  private CurrentPage:number;

  constructor(private commentaryQueryApi:HttpApiQueryService<CommentaryDto>,
    private userQueryApi:HttpApiQueryService<userDisplay>,
    private commentaryCommandApi:HttpApiCommandService<Commentary>,
    public dialog: MatDialog) { this.Endpoint="Commentary/Signal";}

  async ngOnInit(): Promise<void> {
    this.isLoading=true;
    this.resultCommentary$=new Array<CommentaryDto>;
    this.resultUser$=new Array<Observable<userDisplay>>;
    this.CurrentPage=1;
   await this.getCommentary(this.CurrentPage);
    this.getUsersId();
  
  }

  async getCommentary(pgNumber:number){
    this.result$=this.commentaryQueryApi.getWithPagination(this.Endpoint,pgNumber);
    const response=await lastValueFrom(this.result$);
    this.resultCommentary$=response.items;
  }

  getUser(id:string){
    const endpoint="User"
    const response=this.userQueryApi.getWithDetails(endpoint,id);
    this.resultUser$.push(response);
  }

  getUsersId(){
    lastValueFrom(this.result$).then((res)=>{
      const items=res.items;
      items.forEach(m=>{
       this.getUser(m.user_id);
      });
    });
    this.isLoading=false;
  }



  getContentCommentary(id:number){
 const response=lastValueFrom(this.result$)
 response.then((res)=>{
  const item=res.items.find(t=>t.idCommentaire==id) as CommentaryDto;
  this.dialog.open(DialogElementsExampleDialog,{
    data: ` ${item.commentaire}`
  });
 });

  }
  openDialog(id:number){
   
   this.getContentCommentary(id);

  }

  async openTxtMessage(user:Observable<userDisplay>){
    const response= lastValueFrom(user)

    response.then(async(res)=>{
      const dialog=this.dialog.open(SendMessageToUserComponent,{
        data:res.user_id
      });
      const result= await lastValueFrom(dialog.afterClosed())as Result;
      console.log(result);
    })
  }

  handlePageEvent(event:PageEvent){
    this.CurrentPage=event.pageIndex+1;
this.getCommentary(this.CurrentPage);
  }

  async deleteCommentary(id:number){
    const  endpoint=this.Endpoint.replace("/Signal","")
    const response=this.commentaryCommandApi.delete(endpoint,id.toString());
    await lastValueFrom(response).then((res)=>{
      console.log(res);
     this.getCommentary(this.CurrentPage);
    })
  }

  async OkCommentary(id:number){
  
  const  endpoint=this.Endpoint.replace("Signal","Signal-to-zero")
    const response=this.commentaryCommandApi.putSpec(endpoint,id.toString());
    await lastValueFrom(response).then((res)=>{
      console.log(res);
      this.getCommentary(this.CurrentPage);
    })

  }
}


@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {

  content$:string;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: string
 ) { this.content$=data; console.log("third log : "+data)
  console.log("fourth log :" +this.content$)}
}

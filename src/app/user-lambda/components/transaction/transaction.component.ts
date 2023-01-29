import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { PaginatedItems } from 'src/app/private/models/Common';
import { TransactionDto, userDisplay } from 'src/app/private/models/EntityDto';
import { CommonService } from 'src/app/private/services/common.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  private Endpoint$:string;
  LastPageChecked$:number;
  CurrentUser$:string;
  result$:Observable<PaginatedItems<TransactionDto>>;
  resultUser$:Array<Observable<userDisplay>>;
  constructor(private transactionApiQuery:HttpApiQueryService<TransactionDto>,
    private userQueryApi:HttpApiQueryService<userDisplay>,
    private common:CommonService,
    private route:ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.Endpoint$="Transactions"
    this.LastPageChecked$=1;
    this.getUserid();
    //this.currentUser$="UserLambda_270b7c19-1968-4920-970a-e3deed612cb3";
    await this.getTransaction();
  }

  getUserid(){
    const id= this.route.parent?.parent?.parent?.snapshot.paramMap.get("user_id") ?? "no value";
    this.CurrentUser$=this.common.formatUserId(id); 
  }
  async getTransaction(){
    let params= new HttpParams();
    params=params.append('pgNumber',this.LastPageChecked$);
    params=params.append('user_id',this.CurrentUser$);
    this.result$=this.transactionApiQuery.getWithPaginationParams(this.Endpoint$,params);
  }


  handlePageEvent(event:PageEvent){
this.LastPageChecked$=event.pageIndex+1;

this.getTransaction();
  }
}

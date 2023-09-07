import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
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
    public common:CommonService,
    private route:ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.Endpoint$="Transactions"
    this.LastPageChecked$=1;
    this.getUserid();
    await this.getTransaction();
  }

  getUserid(){
    const id= this.route.parent?.parent?.parent?.snapshot.paramMap.get("user_id") ?? "no value";
    this.CurrentUser$=this.common.formatUserId(id); 
  }
  async getTransaction(){//modified
    let params= new HttpParams();
    params=params.append('pgNumber',this.LastPageChecked$);
    this.result$=this.transactionApiQuery.getWithPaginationParams(this.Endpoint$,params);
  }


  handlePageEvent(event:PageEvent){
this.LastPageChecked$=event.pageIndex+1;

this.getTransaction();
  }
}

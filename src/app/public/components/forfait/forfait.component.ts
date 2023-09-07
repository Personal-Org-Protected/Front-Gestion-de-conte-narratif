import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { PaginatedItems } from 'src/app/private/models/Common';
import { ChangeForfait } from 'src/app/private/models/Entity';
import { ForfaitDto, HaveForfaitDto, UserForfaitVM } from 'src/app/private/models/EntityDto';
import { CommonService } from 'src/app/private/services/common.service';

@Component({
  selector: 'app-forfait',
  templateUrl: './forfait.component.html',
  styleUrls: ['./forfait.component.scss']
})
export class ForfaitComponent implements OnInit {

  private Endpoint:string;
  private pgNumber:number;
  CurrentUser$:string;
  result$:Observable<PaginatedItems<ForfaitDto>>;
  resultForfaits:Array<ForfaitDto>
  Forfaits:UserForfaitVM;

  constructor(
    private forfaitQueryApi:HttpApiQueryService<ForfaitDto>,
    private userForfaitApiQuery:HttpApiQueryService<UserForfaitVM>,
    private common:CommonService,
    private route:ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.Endpoint="Forfait";this.pgNumber=1;
    this.getUserid();
    this.resultForfaits=new Array<ForfaitDto>;
    await this.getForfait();
    await this.getCurrentForfaits();
  }



  async getForfait(){
    this.result$ = this.forfaitQueryApi.getWithPagination(this.Endpoint,this.pgNumber);
    const response= await lastValueFrom(this.result$);
    this.resultForfaits=response.items;
  }

  getUserid(){
    const id= this.route.snapshot.paramMap.get("username") ?? "no value";
    this.CurrentUser$=this.common.formatUserId(id); 
  }

   isAllowToBuy(id:number){
    let result=this.Forfaits.userForfaits.find(t=>t.idForfait==id);
    if(result)return false;
    return true;
  }

  async getCurrentForfaits(){
    const endpoint="UserForfaits";
   const response= this.userForfaitApiQuery.get(endpoint);
   this.Forfaits=await lastValueFrom(response);
  }
  
}

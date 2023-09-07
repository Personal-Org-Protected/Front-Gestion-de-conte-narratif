import { Component, OnInit } from '@angular/core';
import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpApiCommandService } from 'src/app/private/http/Command-Services/http-api-command.service';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { PaginatedItems } from 'src/app/private/models/Common';
import { Forfait } from 'src/app/private/models/Entity';
import { ForfaitDto } from 'src/app/private/models/EntityDto';

@Component({
  selector: 'app-forfaits',
  templateUrl: './forfaits.component.html',
  styleUrls: ['./forfaits.component.scss']
})
export class ForfaitsComponent implements OnInit {
  isLoading:boolean;
  private Endpoint:string;
  result$:Observable<PaginatedItems<ForfaitDto>>;
  constructor(private forfaitQueryApi:HttpApiQueryService<ForfaitDto>,
    private forfaitCommandApi:HttpApiCommandService<Forfait>,
    private router:Router) {this.Endpoint="Forfait";}

  ngOnInit(): void {
    this.isLoading=true;
    this.getForfait(1);
  }

  getForfait(pgNgumber:number){
    this.result$ = this.forfaitQueryApi.getWithPagination(this.Endpoint, pgNgumber);
    this.isLoading=false;
  }


  deleteForfait(id:number){
    //resilier forfait des users dirst puis supprimer
   /*  let response=this.forfaitCommandApi.delete(this.Endpoint,id.toString());

    lastValueFrom(response).then((res)=>{
      console.log(res);
      window.location.reload();
    }); */
  }

  handlePageEvent(event:PageEvent){
    this.getForfait(event.pageIndex+1);
  }
}

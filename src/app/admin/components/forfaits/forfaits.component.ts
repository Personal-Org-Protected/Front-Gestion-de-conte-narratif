import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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

  private Endpoint:string;
  result$:Observable<PaginatedItems<ForfaitDto>>;
  constructor(private forfaitQueryApi:HttpApiQueryService<ForfaitDto>,
    private forfaitCommandApi:HttpApiCommandService<Forfait>,
    private router:Router) {this.Endpoint="Forfait";}

  ngOnInit(): void {
    this.getForfait(1);
  }

  getForfait(pgNgumber:number){
    this.result$ = this.forfaitQueryApi.getWithPagination(this.Endpoint, pgNgumber);
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

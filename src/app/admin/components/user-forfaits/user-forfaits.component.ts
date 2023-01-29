import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpApiQueryService } from 'src/app/private/http/Queries-Services/http-api-query.service';
import { UserForfaitDto, UserForfaitVM } from 'src/app/private/models/EntityDto';
import {faEye} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-user-forfaits',
  templateUrl: './user-forfaits.component.html',
  styleUrls: ['./user-forfaits.component.scss']
})
export class UserForfaitsComponent implements OnInit {

  private Endpoint:string;
  faEye=faEye;
  result$:Observable<UserForfaitVM>;
  private ParamRoute$:string;
  constructor(private forfaitUserApiQuery:HttpApiQueryService<UserForfaitVM>,
    private route : ActivatedRoute) { this.Endpoint="UserForfaits"}

  ngOnInit(): void {
    this.getId();
    this.getUserForfait(this.ParamRoute$)
  }

  getUserForfait(pgNumber:string){
  this.result$ = this.forfaitUserApiQuery.getWithDetails(this.Endpoint,pgNumber);
  }
  getId(){
    this.ParamRoute$ = this.route.snapshot.paramMap.get('user_id')?? "No value";
  }
}

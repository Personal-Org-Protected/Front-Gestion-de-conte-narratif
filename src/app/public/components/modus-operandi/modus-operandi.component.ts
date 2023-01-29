import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/core/auth/auth-services.service';

@Component({
  selector: 'app-modus-operandi',
  templateUrl: './modus-operandi.component.html',
  styleUrls: ['./modus-operandi.component.scss']
})
export class ModusOperandiComponent implements OnInit {

  profileJson:string;
  constructor(public auth:AuthServicesService) { }

  ngOnInit(): void {

  }

}

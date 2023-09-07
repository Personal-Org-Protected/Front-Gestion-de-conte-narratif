import { Injectable } from '@angular/core';
import { nameof } from 'ts-simple-nameof';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private date:Date;
  constructor() { }

 nameof(value:any){
   return nameof(value);
}

timeFormat(rawTime:Date){
  this.date=new Date(rawTime);
  return this.date.toLocaleDateString();
}


formatUserId(user_id:string){
let id=user_id.replace("auth0|","")
return id;
}
}

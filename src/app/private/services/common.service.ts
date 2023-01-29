import { Injectable } from '@angular/core';
import { nameof } from 'ts-simple-nameof';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

 nameof(value:any){
   return nameof(value);
}


setParameters(){
  
}


formatUserId(user_id:string){
let id=user_id.replace("auth0|","")
return id;
}
}

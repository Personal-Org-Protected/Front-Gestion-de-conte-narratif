import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnInit } from '@angular/core';
import { AuthService, IdToken, User } from '@auth0/auth0-angular';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService{

  constructor(private auth:AuthService,
    @Inject(DOCUMENT) private doc:Document) { }


  login(){
    this.auth.loginWithRedirect({appState:{
      target:"Public/project"
    }});
  }

  logout(){
    this.auth.logout({returnTo:this.doc.location.origin+"/Public/project"});
  }
  getStateConnection(){
    return this.auth.isAuthenticated$;
  }

  getToken(){
    return this.auth.getAccessTokenSilently();
  }

  getUser(){
   return this.auth.user$ as Observable<User>;
  }

  getTokenClaims(){
return this.auth.getIdTokenClaims();
  }
  
getErrors(){
  return this.auth.error$;
}

}

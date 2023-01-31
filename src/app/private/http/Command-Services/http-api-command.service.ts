import { HttpBackend, HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Result } from '../../models/Common';

@Injectable({
  providedIn: 'root'
})
export class HttpApiCommandService<T> {

  private uri:string;
  constructor(private http:HttpClient,private clientSpec:HttpClient,private byPass:HttpBackend) { 
    this.uri=environment.serverApi.DefaultConfig.uri
    this.clientSpec=new HttpClient(this.byPass);
  }



post(data:T,Endpoint:string):Observable<Result>{
  console.log(`${this.uri}${Endpoint}`+ data);
return this.http.post<Result>(`${this.uri}${Endpoint}`,data);
}

put(data:T,Endpoint:string,id:string):Observable<Result>{
return this.http.put<Result>(`${this.uri}${Endpoint}/${id}`,data);
}
putWithParams(Endpoint:string,id:string,body:any,params:HttpParams):Observable<Result>{
  console.log(`${this.uri}${Endpoint}/${id}`+ params);
  return this.http.put<Result>(`${this.uri}${Endpoint}/${id}`,body,{
    params:params
  });
  }



  putSpec(Endpoint:string,id:string,params?:HttpParams):Observable<Result>{
   return this.http.put<Result>(`${this.uri}${Endpoint}/${id}`,{params:params});
   
  }
  


delete(Endpoint:string,id:string):Observable<Result>{
  console.log(`${this.uri}${Endpoint}/${id}`);
return this.http.delete<Result>(`${this.uri}${Endpoint}/${id}`);
}

deleteWithParams(Endpoint:string,id:string,parameter:HttpParams):Observable<Result>{
  console.log("Endpoint: "+`${this.uri}${Endpoint}/${id}`);
return this.http.delete<Result>(`${this.uri}${Endpoint}/${id}`,
{
  params:parameter
}
);
}


PostNotoken(data:T,Endpoint:string):Observable<Result>{
  return this.clientSpec.post<Result>(`${this.uri}${Endpoint}`,data);
}
}

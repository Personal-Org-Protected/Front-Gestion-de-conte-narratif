import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { PaginatedItems } from '../../models/Common';

@Injectable({
  providedIn: 'root'
})
export class HttpApiQueryService<T> {

  private uri:string;
  constructor(private http:HttpClient,private clientSpec:HttpClient,private byPass:HttpBackend) { 
    this.uri=environment.serverApi.DefaultConfig.uri
    this.clientSpec=new HttpClient(this.byPass);
  }

  get(EndPoint:string):Observable<T>{
    return this.http.get<T>(`${this.uri}${EndPoint}`);
    }

getWithPagination(EndPoint:string,pgNumber:number):Observable<PaginatedItems<T>>{
return this.http.get<PaginatedItems<T>>(`${this.uri}${EndPoint}?pgNumber=${pgNumber}`);
}
getWithPaginationParams(EndPoint:string,parameter:HttpParams):Observable<PaginatedItems<T>>{
  return this.http.get<PaginatedItems<T>>(`${this.uri}${EndPoint}`,{
    params:parameter
  });
}
getSpecWithPaginationParams(EndPoint:string,id:string,parameter:HttpParams):Observable<PaginatedItems<T>>{
return this.http.get<PaginatedItems<T>>(`${this.uri}${EndPoint}/${id}`,{
  params:parameter
});
}

getWithDetails(EndPoint:string,IdElement:string):Observable<T>{
  return this.http.get<T>(`${this.uri}${EndPoint}/${IdElement}`); 
}
getWithDetailsParams(EndPoint:string,IdElement:string,parameter:HttpParams):Observable<T>{
  return this.http.get<T>(`${this.uri}${EndPoint}/${IdElement}`,{
    params:parameter
  });
}


getNoToken(EndPoint:string,IdElement:string){
  return this.clientSpec.get<T>(`${this.uri}${EndPoint}/${IdElement}`); 
}

}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchRequest } from './search-request';
import { SearchResponse } from './search-response'; 

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  private baseUrl:string="http://localhost:8080/";


  constructor(private httpClient : HttpClient) { 

  }
 //This service class is used to access backend rest api(get,post....) using http client
  // Used to get the unqiue plan name form the table
  getPlanNames() : Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8080/plannames`)
  }

  // Used to get the unqiue plan Status form the table
  getPlanStatus() : Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8080/planstatus`);
  }

  // Used to implement the search 
  search(request : SearchRequest) : Observable<SearchResponse[]>{
    return this.httpClient.post<SearchResponse[]>(`http://localhost:8080/plans`, request);
  }

  // Used to get xl report
  getExcel(){
    return this.httpClient.get<any>(`http://localhost:8080/excel`, {responseType : 'arrayBuffer' as 'json'});
  }
  // Used to get get pdf report
  getPdf(){
    return this.httpClient.get<any>(`http://localhost:8080/pdf`, {responseType : 'arrayBuffer' as 'json'});
  }
}
 
//post this service class we have created a insuranc component to and injectng this service to that insurance component
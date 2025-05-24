// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://brok.topshipping.co/api';

  constructor(private http: HttpClient) { }

  // GET
  get<T>(endpoint: string, params?: any): Observable<ApiResponse<T>> {
    const httpParams = new HttpParams({ fromObject: params || {} });
    return this.http.get<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, { params: httpParams });
  }

  // POST
  post(endpoint: string, body: any): Observable<NoDataApiResponse> {
    return this.http.post<NoDataApiResponse>(`${this.baseUrl}/${endpoint}`, body);
  }

  // // PUT
  // put<T>(endpoint: string, body: any): Observable<ApiResponse> {
  //   return this.http.put<ApiResponse<T>>(`${this.baseUrl}/${endpoint}`, body,{withCredentials:true});
  // }

}


export interface ApiResponse<T = any>  {
  messages?: any;
  response: T;
  totalPages: number;
  success: boolean;
  httpCode: number;
}
export interface NoDataApiResponse {
  success: boolean;
  messages: string[];
  httpCode: number;
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetClientResponse } from '../interfaces/get-client-response';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetClientService {

  URL = '/api/cliente/';

  constructor(private http: HttpClient) {
  }

  getClient(rut: string): Observable<GetClientResponse> {
    return this.http.get<GetClientResponse>(this.URL + rut);
  }
}

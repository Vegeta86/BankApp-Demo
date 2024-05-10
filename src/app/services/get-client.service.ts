import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/get-client-response';
import { API } from 'src/environments/environment.prod';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetClientService {
  baseURL = API.BASE_APY_URL;
  URL = '/obtener/cliente';

  constructor(private http: HttpClient) {
  }

  getClient(rut: string): Observable<any> {

    let body = {
      rut: rut
    }

    let bodyJSON = JSON.stringify(body);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.baseURL + this.URL, bodyJSON, { headers: headers });
  }
}

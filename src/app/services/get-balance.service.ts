import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetBalanceResponse } from '../interfaces/get-balance-response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetBalanceService {

  URL = '/api//saldo/';

  constructor(private http: HttpClient) { }

  getBalance(productNumber: string): Observable<GetBalanceResponse> {
    return this.http.get<GetBalanceResponse>(this.URL + productNumber);
  }

}

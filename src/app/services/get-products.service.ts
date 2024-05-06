import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetProductsResponse } from '../interfaces/get-products-response';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {

  URL = '/api/productos/';

  constructor(private http: HttpClient) { }

  getProducts(clientRut: string): Observable<GetProductsResponse[]> {
    return this.http.get<GetProductsResponse[]>(this.URL + clientRut);
  }

}

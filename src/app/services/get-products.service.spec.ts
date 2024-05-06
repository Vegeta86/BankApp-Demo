import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GetProductsService } from './get-products.service';

describe('GetProductsService', () => {
  let service: GetProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetProductsService]
    });

    service = TestBed.inject(GetProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch the products', () => {
    const mockProducts = [
      { id: '1', name: 'Product 1', price: 100 },
      { id: '2', name: 'Product 2', price: 200 }
    ];
    const clientRut = '1234567-8';

    service.getProducts(clientRut).subscribe((products:any) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(service.URL + clientRut);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });
});
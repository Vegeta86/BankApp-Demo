import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GetBalanceService } from './get-balance.service';

describe('GetBalanceService', () => {
  let service: GetBalanceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetBalanceService]
    });

    service = TestBed.inject(GetBalanceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch the balance', () => {
    const mockBalance = { balance: 1000 };
    const productNumber = '123';
    service.getBalance(productNumber).subscribe((balance: any) => {
      expect(balance).toEqual(mockBalance);
    });

    const req = httpMock.expectOne(service.URL + productNumber);
    expect(req.request.method).toBe('GET');
    req.flush(mockBalance);
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GetClientService } from './get-client.service';

describe('GetClientService', () => {
  let service: GetClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetClientService]
    });

    service = TestBed.inject(GetClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch the client data', () => {
    const mockClientData = { name: 'John Doe', age: 30 };
    const clientId = '123';

    service.getClient(clientId).subscribe((clientData: any) => {
      expect(clientData).toEqual(mockClientData);
    });

    const req = httpMock.expectOne(service.URL + clientId);
    expect(req.request.method).toBe('GET');
    req.flush(mockClientData);
  });
});
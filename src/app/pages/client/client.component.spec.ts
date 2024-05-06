import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { ClientComponent } from './client.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { GetBalanceService } from 'src/app/services/get-balance.service';
import { GetClientService } from 'src/app/services/get-client.service';
import { GetProductsService } from 'src/app/services/get-products.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; 
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('ClientComponent', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;
  let getClientService: GetClientService;
  let getProductsService: GetProductsService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientComponent ],
      imports: [HttpClientTestingModule, NoopAnimationsModule],
      providers: [
        { provide: GetClientService, useValue: { getClient: () => of({}) } },
        { provide: GetProductsService, useValue: { getProducts: () => of([]) } },
        { provide: GetBalanceService, useValue: {} },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '123' } } } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
    getClientService = TestBed.inject(GetClientService);
    getProductsService = TestBed.inject(GetProductsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getClient on init', () => {
    spyOn(getClientService, 'getClient').and.callThrough();
    component.ngOnInit();
    expect(getClientService.getClient).toHaveBeenCalledWith('123');
  });

  it('should call getProducts on init', () => {
    spyOn(getProductsService, 'getProducts').and.callThrough();
    component.ngOnInit();
    expect(getProductsService.getProducts).toHaveBeenCalledWith('123');
  });
});
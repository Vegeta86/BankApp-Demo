import { Component, OnInit } from '@angular/core';
import { GetBalanceResponse } from 'src/app/interfaces/get-balance-response';
import { GetClientResponse } from 'src/app/interfaces/get-client-response';
import { GetProductsResponse } from 'src/app/interfaces/get-products-response';
import { GetBalanceService } from 'src/app/services/get-balance.service';
import { GetClientService } from 'src/app/services/get-client.service';
import { GetProductsService } from 'src/app/services/get-products.service';
import { delay } from 'rxjs/operators';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('visible', style({ opacity: 1 })),
      state('void', style({ opacity: 0 })),
      transition('void => visible', animate('500ms'))
    ])
  ]
})
export class ClientComponent implements OnInit {

  client: GetClientResponse = {
    id: 0,
    rut: '',
    nombre: '',
    apellido: '',
    email: '',
  };
  clientProducts!: GetProductsResponse[];
  productBalance!: GetBalanceResponse;

  productIcons = [
    { tipo: 'Tarjeta Credito', icono: 'assets/img/credit_card_icon.svg' },
    { tipo: 'Cuenta Corriente', icono: 'assets/img/current_account_icon.png' },
    { tipo: 'Linea Credito', icono: 'assets/img/credit_card_icon.svg' },
    { tipo: 'Cuenta Corriente USD', icono: 'assets/img/current_account_icon.png' },
  ];

  detailLoaded = false;
  formState = 'void';


  constructor(
    private clientSrv: GetClientService,
    private clientPrdSrv: GetProductsService,
    private clientBalanceSrv: GetBalanceService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const rut = this.route.snapshot.paramMap.get('rut')!;

    this.clientSrv.getClient(rut).subscribe(response => {
      console.log(this.client);
      this.client = response;
    });

    this.clientPrdSrv.getProducts(rut).subscribe(response => {
      this.clientProducts = response.map(product => ({
        ...product,
        icon: this.productIcons[Number(product.tipo)]
      }));;
    });

    this.formState = 'visible';


  }

  setSelectedProduct(product: GetProductsResponse) {
    this.detailLoaded = false;
    this.productBalance = {
      id: 0,
      numeroProducto: '',
      montoDisponible: 0,
      montoContable: 0,
      montoUtilizado: 0,
    };
    this.clientBalanceSrv.getBalance(product.numero).pipe(delay(2000)).subscribe(response => {
      this.productBalance = response;
      this.detailLoaded = true;
    });
  }

  onTransferClick() { }

}

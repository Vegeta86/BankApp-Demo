import { Component, OnInit } from '@angular/core';
import { GetBalanceResponse } from 'src/app/interfaces/get-balance-response';
import { Cliente, Response, Datos  } from 'src/app/interfaces/get-client-response';
import { GetProductsResponse } from 'src/app/interfaces/get-products-response';
import { GetBalanceService } from 'src/app/services/get-balance.service';
import { GetClientService } from 'src/app/services/get-client.service';
import { GetProductsService } from 'src/app/services/get-products.service';
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

  client: any ={};
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
     this.client = response.datos.cliente;     
    });

    /*
    this.clientPrdSrv.getProducts(rut).subscribe(response => {

      this.clientProducts = response.map(product => ({
        ...product,
        icon: this.productIcons[Number(product.tipo)]
      }));;
    });

    this.clientProducts = productosDummy.map(product => ({
      ...product,
      icon: this.productIcons[Number(product.tipo)]
    }));*/

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
    this.productBalance = balanceDummy;
    this.detailLoaded = true;
    /*
    this.clientBalanceSrv.getBalance(product.numero).pipe(delay(2000)).subscribe(response => {
      this.productBalance = response;
      this.detailLoaded = true;

    });*/
  }

  onTransferClick() { }

}



export const clienteDummy = {
  id: 1,
  rut: "1-9",
  nombre: "Juan",
  apellido: "Perez",
  email: "jperez@demo.cl"
}

export const productosDummy = [
  {
    id: 1,
    numero: "1000",
    tipo: "Tarjeta Credito",
    moneda: "CLP",
    rut: "1-9",
    token: "TC"
  },
  {
    id: 2,
    numero: "1001",
    tipo: "Cuenta Corriente",
    moneda: "CLP",
    rut: "1-9",
    token: "CC"
  },
  {
    id: 3,
    numero: "1003",
    tipo: "Linea Credito",
    moneda: "CLP",
    rut: "1-9",
    token: "LC"
  },
  {
    id: 4,
    numero: "1004",
    tipo: "Cuenta Corriente",
    moneda: "USD",
    rut: "1-9",
    token: "CC"
  }
]

export const balanceDummy = {
  id: 1,
  numeroProducto: "1000",
  montoDisponible: 1000000,
  montoContable: 1000000,
  montoUtilizado: 0
}
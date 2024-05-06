import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyFormatPipe } from './pipes/currency.pipe';
import { CurrencyUSDPipe } from './pipes/currency-usd.pipe';
import { RutFormatPipe } from './pipes/rut-format.pipe';
import { LoadingDialogComponent } from './dialog/loading-dialog/loading-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@NgModule({
  declarations: [
    CurrencyFormatPipe,
    CurrencyUSDPipe,
    RutFormatPipe,
    LoadingDialogComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule

  ],
  exports: [
    CurrencyFormatPipe,
    CurrencyUSDPipe,
    RutFormatPipe,
    LoadingDialogComponent
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinMarketCapService } from './coin-market-cap.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ CoinMarketCapService ]
})
export class DataModule { }

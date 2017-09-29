import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinMarketCapService } from './coin-market-cap.service';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [],
  providers: [ CoinMarketCapService ]
})
export class DataModule { }

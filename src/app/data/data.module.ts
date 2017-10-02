import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { CoinMarketCapService } from './coin-market-cap.service';
import { UserSettingsService } from './user-settings.service';


@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [],
  providers: [ CoinMarketCapService, UserSettingsService ]
})
export class DataModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { CurrencyDataService } from './currency-data.service';
import { UserSettingsService } from './user-settings.service';


@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [],
  providers: [CurrencyDataService, UserSettingsService]
})
export class DataModule {
}

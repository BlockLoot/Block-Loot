import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { CurrencyTileComponent } from './currency-tile/currency-tile.component';
import { CurrencyStatsComponent } from './currency-stats/currency-stats.component';
import { SweetAlertService } from './sweet-alert.service';
import { CoinSearchComponent } from './coin-search/coin-search.component';
import { FormsModule } from '@angular/forms';
import { CoinSearchListComponent } from './coin-search-list/coin-search-list.component';
import { CoinSearchService } from './coin-search.service';

export const sharedComponents = [
  CurrencyListComponent,
  CurrencyTileComponent,
  CurrencyStatsComponent,
  CoinSearchComponent,
  CoinSearchListComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [SweetAlertService, CoinSearchService],
  exports: [sharedComponents],
  declarations: [sharedComponents]
})
export class LayoutModule {
}


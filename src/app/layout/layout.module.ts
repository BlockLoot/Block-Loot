import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { CurrencyTileComponent } from './currency-tile/currency-tile.component';
import { CurrencyStatsComponent } from './currency-stats/currency-stats.component';

export const sharedComponents = [CurrencyListComponent, CurrencyTileComponent, CurrencyStatsComponent];
@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ sharedComponents ],
  declarations: [ sharedComponents ]
})
export class LayoutModule { }


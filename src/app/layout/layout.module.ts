import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { CurrencyTileComponent } from './currency-tile/currency-tile.component';

export const sharedComponents = [CurrencyListComponent, CurrencyTileComponent];
@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ sharedComponents ],
  declarations: [ sharedComponents ]
})
export class LayoutModule { }


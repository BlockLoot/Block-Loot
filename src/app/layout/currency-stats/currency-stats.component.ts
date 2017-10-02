import { Component, Input, OnInit } from '@angular/core';
import { Currency } from '../../shared/models/currency.model';
import { LocalStorageService } from '../../core/local-storage.service';

@Component({
  selector: 'app-currency-stats',
  templateUrl: './currency-stats.component.html',
  styleUrls: ['./currency-stats.component.scss']
})
export class CurrencyStatsComponent implements OnInit {
  @Input() allCurrencies: Currency[];

  constructor(private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
  }

  get totalValue() {
    let sumOfCurrencies = 0;
    if (this.allCurrencies != null) {
      const currencyAmountsOwned = JSON.parse(this.localStorageService.getItem('currencyAmountsOwned'));
      for (const currentCurrency of this.allCurrencies) {
        if (currencyAmountsOwned !== null && currentCurrency.symbol.toUpperCase() in currencyAmountsOwned) {
          sumOfCurrencies += +(currentCurrency.price_usd *
          currencyAmountsOwned[currentCurrency.symbol.toUpperCase()]);
        }
      }
    }
    return sumOfCurrencies.toFixed(2);
  }

}

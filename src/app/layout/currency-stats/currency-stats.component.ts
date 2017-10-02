import { Component, Input, OnInit } from '@angular/core';
import { Currency } from '../../shared/models/currency.model';
import { UserSettingsService } from '../../data/user-settings.service';

@Component({
  selector: 'app-currency-stats',
  templateUrl: './currency-stats.component.html',
  styleUrls: ['./currency-stats.component.scss']
})
export class CurrencyStatsComponent implements OnInit {
  @Input() allCurrencies: Currency[];

  constructor(private userSettingsService: UserSettingsService) {
  }

  ngOnInit() {
  }

  get totalValue() {
    let sumOfCurrencies = 0;
    if (this.allCurrencies != null) {
      for (const currentCurrency of this.allCurrencies) {
        sumOfCurrencies += +(currentCurrency.price_usd *
          this.userSettingsService.currencyAmountsOwned[currentCurrency.symbol.toUpperCase()]);
      }
    }
    return sumOfCurrencies.toFixed(2);
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Currency } from '../../shared/models/currency.model';
import { UserSettingsService } from '../../data/user-settings.service';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss']
})
export class CurrencyListComponent implements OnInit {
  @Input() allCurrencies: Currency[];

  constructor(private userSettingsService: UserSettingsService) {
  }

  ngOnInit() {
  }

  amountOwned(currency: Currency) {
    return this.userSettingsService.currencyAmountsOwned[currency.symbol.toUpperCase()];
  }
}

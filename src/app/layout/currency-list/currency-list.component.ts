import { Component, Input, OnInit } from '@angular/core';
import { Currency } from '../../shared/models/currency.model';
import { LocalStorageService } from '../../core/local-storage.service';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss']
})
export class CurrencyListComponent implements OnInit {
  @Input() allCurrencies: Currency[];

  constructor(private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
  }

  amountOwned(currency: Currency) {
    const currencyAmountsOwned = JSON.parse(this.localStorageService.getItem('currencyAmountsOwned'));
    if (currencyAmountsOwned !== null && currency.symbol.toUpperCase() in currencyAmountsOwned) {
      return currencyAmountsOwned[currency.symbol];
    }
  }
}

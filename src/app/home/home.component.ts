import { Component, OnInit } from '@angular/core';
import { Currency } from '../shared/models/currency.model';
import { CoinMarketCapService } from '../data/coin-market-cap.service';
import { UserSettingsService } from '../data/user-settings.service';
import { Subscription } from 'rxjs/Subscription';
import { LocalStorageService } from '../core/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currencyData: Currency[];
  currencyKeysToDisplay: string[];
  currencyKeysToDisplaySubscription: Subscription;

  constructor(private coinMarketCapService: CoinMarketCapService,
              private userSettingsService: UserSettingsService,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.currencyKeysToDisplay = this.userSettingsService.currencyKeysToDisplay;
    this.currencyKeysToDisplaySubscription = this.userSettingsService.currencyKeysToDisplay$.subscribe(
      data => this.currencyKeysToDisplay = data);

    this.loadCurrencyData();
    this.loadLocalStorage();
  }

  /**
   * Return a filtered version of the set data
   * @returns {Currency[]}
   */
  get filteredCurrencyData(): Currency[] {
    if (this.currencyData) {
      return this.currencyData.filter((item: Currency) => {
        const acceptableKeys = this.currencyKeysToDisplay || [];
        const el = item;

        // Add undefined check to pass tests
        if (typeof el.symbol !== 'undefined') {
          if (acceptableKeys.indexOf(el.symbol.toUpperCase()) > -1) {
            return item;
          }
        }
      });
    }
  }

  private loadCurrencyData(): void {
    this.coinMarketCapService.getAllCurrencyData()
      .subscribe(data => this.currencyData = data);
  }

  private loadLocalStorage(): void {
    const currencyAmountsOwned = JSON.parse(this.localStorageService.getItem('currencyAmountsOwned'));

    if (currencyAmountsOwned !== null) {
      this.userSettingsService.currencyAmountsOwned = currencyAmountsOwned;
    } else {
      //this.userSettingsService.currencyAmountsOwned = {};
      this.userSettingsService.currencyAmountsOwned = {
        'BTC': 0.0271,
        'LTC': 22.00,
        'GNT': 761.00,
        'ETH': 0.807,
        'QTUM': 2.00,
        'OMG': 2.00
      };
      this.localStorageService.setItem('currencyAmountsOwned',
        JSON.stringify(this.userSettingsService.currencyAmountsOwned));
    }
  }
}

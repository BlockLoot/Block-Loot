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
  currencyData: Currency[] = [];
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

  get currencyDataReady(): boolean {
      return this.currencyData.length > 0;
  }

  private loadCurrencyData(): void {
    this.coinMarketCapService.getAllCurrencyData()
      .subscribe(data => this.currencyData = data);
  }

  private loadLocalStorage(): void {
    this.setLocalCurrencyAmountsOwned();
    this.setLocalCurrencyKeysToDisplay();
  }

  private setLocalCurrencyAmountsOwned(): void {
    const currencyAmountsOwned = JSON.parse(this.localStorageService.getItem('currencyAmountsOwned'));

    if (currencyAmountsOwned !== null) {
      this.userSettingsService.currencyAmountsOwned = currencyAmountsOwned;
    } else {
      // Default currencies owned
      this.userSettingsService.currencyAmountsOwned = {
        'BTC': 1.0,
        'LTC': 1.0,
        'ETH': 1.0,
      };
      this.localStorageService.setItem('currencyAmountsOwned',
        JSON.stringify(this.userSettingsService.currencyAmountsOwned));
    }
  }

  private setLocalCurrencyKeysToDisplay(): void {
    const keysToDisplay = JSON.parse(this.localStorageService.getItem('currencyKeysToDisplay'));

    if (keysToDisplay !== null) {
      this.userSettingsService.updateCurrenciesToDisplay(keysToDisplay);
    } else {
      this.userSettingsService.updateCurrenciesToDisplay(['BTC', 'LTC', 'GNT', 'ETH', 'QTUM', 'OMG']);
      this.localStorageService.setItem('currencyKeysToDisplay',
        JSON.stringify(this.userSettingsService.currencyKeysToDisplay));
    }
  }
}

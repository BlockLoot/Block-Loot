import { Component, OnInit } from '@angular/core';
import { Currency } from '../shared/models/currency.model';
import { UserSettingsService } from '../data/user-settings.service';
import { Subscription } from 'rxjs/Subscription';
import { LocalStorageService } from '../core/local-storage.service';
import { CurrencyDataService } from '../data/currency-data.service';
import { PriceEntry } from '../shared/models/price-entry.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currencyData: Currency[] = [];
  priceHistoryData: PriceEntry[];
  currencyKeysToDisplay: string[];
  currencyKeysToDisplaySubscription: Subscription;

  constructor(private currencyDataService: CurrencyDataService,
              private userSettingsService: UserSettingsService,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.currencyKeysToDisplay = this.userSettingsService.currencyKeysToDisplay;
    this.currencyKeysToDisplaySubscription = this.userSettingsService.currencyKeysToDisplay$.subscribe(
      data => this.currencyKeysToDisplay = data);

    this.loadCurrencyData();
    this.loadPriceHistoryData();
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
    return this.currencyData.length > 0 && this.priceHistoryData != null;
  }

  private loadCurrencyData(): void {
    const localCurrencyData = JSON.parse(this.localStorageService.getItem('allCurrencyData'));
    if (localCurrencyData !== null) {
      this.currencyData = localCurrencyData;
    }
    this.currencyDataService.getAllCurrencyData()
      .subscribe(data => this.setCurrencyData(data));
  }

  private setCurrencyData(currencyData: Currency[]): void {
    this.currencyData = currencyData;
    this.localStorageService.setItem('allCurrencyData', JSON.stringify(this.currencyData));
  }

  private loadPriceHistoryData(): void {
    // const priceHistoryData = JSON.parse(this.localStorageService.getItem('priceHistoryData'));
    // if (priceHistoryData !== null) {
    //   this.priceHistoryData = priceHistoryData;
    // }
    this.currencyDataService.getPriceHistoryData()
      .subscribe(data => this.setPriceHistory(data));
  }

  private setPriceHistory(priceHistoryData: PriceEntry[]): void {
    this.priceHistoryData = priceHistoryData;
    this.localStorageService.setItem('priceHistoryData', JSON.stringify(this.priceHistoryData));
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
      // Default currencies to display
      this.userSettingsService.updateCurrenciesToDisplay(['BTC', 'LTC', 'ETH']);
      this.localStorageService.setItem('currencyKeysToDisplay',
        JSON.stringify(this.userSettingsService.currencyKeysToDisplay));
    }
  }
}

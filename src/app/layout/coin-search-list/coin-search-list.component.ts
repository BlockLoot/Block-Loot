import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoinSearchService } from '../coin-search.service';
import { Currency } from '../../shared/models/currency.model';
import { Subscription } from 'rxjs/Subscription';
import { COIN_URLS } from '../../data/icon-urls.constants';
import { UserSettingsService } from '../../data/user-settings.service';
import { LocalStorageService } from '../../core/local-storage.service';

@Component({
  selector: 'app-coin-search-list',
  templateUrl: './coin-search-list.component.html',
  styleUrls: ['./coin-search-list.component.scss']
})
export class CoinSearchListComponent implements OnInit, OnDestroy {
  filteredCoins: Currency[] = [];
  searchResultsSubscription: Subscription;

  constructor(private coinSearchService: CoinSearchService,
              private userSettingsService: UserSettingsService,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.filteredCoins = this.coinSearchService.searchResults;
    this.searchResultsSubscription = this.coinSearchService.searchResults$.subscribe(
      data => this.filteredCoins = data);
  }

  ngOnDestroy() {
    if (this.searchResultsSubscription != null) {
      this.searchResultsSubscription.unsubscribe();
    }
  }

  iconURL(currency: Currency): void {
    return COIN_URLS[currency.symbol.toUpperCase()];
  }

  addCurrency(currency: Currency): void {
    const keys = this.userSettingsService.currencyKeysToDisplay;
    keys.push(currency.symbol.toUpperCase());

    const currencyAmountsOwned = JSON.parse(this.localStorageService.getItem('currencyAmountsOwned'));
    currencyAmountsOwned[currency.symbol.toUpperCase()] = 1;

    this.userSettingsService.updateCurrencyAmountsOwned(currencyAmountsOwned);
    this.userSettingsService.updateCurrenciesToDisplay(keys);

    this.localStorageService.setItem('currencyAmountsOwned',
      JSON.stringify(this.userSettingsService.currencyAmountsOwned));
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoinSearchService } from '../coin-search.service';
import { Currency } from '../../shared/models/currency.model';
import { Subscription } from 'rxjs/Subscription';
import { COIN_URLS } from '../../data/icon-urls.constants';

@Component({
  selector: 'app-coin-search-list',
  templateUrl: './coin-search-list.component.html',
  styleUrls: ['./coin-search-list.component.scss']
})
export class CoinSearchListComponent implements OnInit, OnDestroy {
  filteredCoins: Currency[] = [];
  searchResultsSubscription: Subscription;

  constructor(private coinSearchService: CoinSearchService) {
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

}

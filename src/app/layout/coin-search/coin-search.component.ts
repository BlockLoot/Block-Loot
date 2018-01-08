import { Component, Input, OnInit } from '@angular/core';
import { Currency } from '../../shared/models/currency.model';
import { CoinSearchService } from '../coin-search.service';

@Component({
  selector: 'app-coin-search',
  templateUrl: './coin-search.component.html',
  styleUrls: ['./coin-search.component.scss']
})
export class CoinSearchComponent implements OnInit {
  @Input() allCurrencies: Currency[];
  searchValue: string;

  constructor(private coinSearchService: CoinSearchService) {
  }

  ngOnInit() {
    this.coinSearchService.clearSearch$.subscribe(data => {
      this.clearSearchCheck(data);
    });
  }

  get searchText() {
    return this.searchValue;
  }

  set searchText(value: string) {
    this.searchValue = value;
    if (this.allCurrencies != null) {
      if (value.length !== 0) {
        this.coinSearchService.updateSearchResults(this.allCurrencies.filter((item: Currency) => {
          // If a coin doesn't have a set market cap, it's probably worthless, so we'll ignore it.  Otherwise,
          // check to see if the name or symbol contains the search text.  Sort results by the market cap descending.
          // Algorithm subject to change.
          if (item.market_cap_usd !== null && (item.name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
              item.symbol.toLowerCase().indexOf(value.toLowerCase()) > -1)) {
            return item;
          }
        }).sort(this.sortByMarketCapDescending));
      } else {
        this.coinSearchService.updateSearchResults([]);
      }
    }
  }

  private sortByMarketCapDescending(a, b) {
    return b.market_cap_usd - a.market_cap_usd;
  }

  clearSearchCheck(clearSearch: boolean) {
    if (clearSearch) {
      this.searchValue = '';
      this.coinSearchService.updateClearSearch(false);
    }
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoinSearchService } from '../coin-search.service';
import { Currency } from '../../shared/models/currency.model';
import { Subscription } from 'rxjs/Subscription';

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

}

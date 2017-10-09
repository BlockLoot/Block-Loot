import { Injectable } from '@angular/core';
import { Currency } from '../shared/models/currency.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CoinSearchService {
  searchResults: Currency[];
  private searchResultsSubject = new Subject<Currency[]>();
  searchResults$ = this.searchResultsSubject.asObservable();

  clearSearch = false;
  private clearSearchSubject = new Subject<boolean>();
  clearSearch$ = this.clearSearchSubject.asObservable();

  constructor() {
  }

  updateSearchResults(results: Currency[]) {
    this.searchResults = results;
    this.searchResultsSubject.next(this.searchResults);
  }

  updateClearSearch(value: boolean) {
    this.clearSearch = value;
    this.clearSearchSubject.next(this.clearSearch);
  }

}

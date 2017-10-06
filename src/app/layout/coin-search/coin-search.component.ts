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

  constructor(private coinSearchService: CoinSearchService) {
  }

  ngOnInit() {
  }

  set searchText(value: string) {
    this.coinSearchService.updateSearchResults(this.allCurrencies.filter((item: Currency) => {
      if (item.name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
        item.symbol.toLowerCase().indexOf(value.toLowerCase()) > -1) {
        return item;
      }
    }).sort(this.sortByNameAscending));
  }

  private sortByNameAscending(a, b) {
    if (a.name.trim().toLowerCase() < b.name.trim().toLowerCase()) {
      return -1;
    }
    if (a.name.trim().toLowerCase() > b.name.trim().toLowerCase()) {
      return 1;
    }
    return 0;
  }

}

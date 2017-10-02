import { Component, OnInit } from '@angular/core';
import { Currency } from '../shared/models/currency.model';
import { CoinMarketCapService } from '../data/coin-market-cap.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    currencyData: Currency[];
    currencyKeysToDisplay: string[];

    constructor(private coinMarketCapService: CoinMarketCapService) { }

    ngOnInit() {
        this.currencyKeysToDisplay = this.coinMarketCapService.currencyKeysToDisplay;
        this.loadCurrencyData();
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
          if (typeof el.name !== 'undefined') {
            if (acceptableKeys.indexOf(el.name.toLowerCase()) > -1) {
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
}

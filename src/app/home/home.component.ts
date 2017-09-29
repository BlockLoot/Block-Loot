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

    constructor(private coinMarketCapService: CoinMarketCapService) {
    }

    ngOnInit() {
        this.loadCurrencyData();
    }

    loadCurrencyData(): void {
        this.coinMarketCapService.getAllCurrencyData()
            .subscribe(
                data => this.currencyData = data
            );
    }

}

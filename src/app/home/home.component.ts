import {Component, OnInit} from '@angular/core';
import {Currency} from '../shared/models/currency.model';
import {CoinMarketCapService} from '../data/coin-market-cap.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    currencyData: Currency[];
    currencyKeysToDisplay: string[] = [];

    constructor(private coinMarketCapService: CoinMarketCapService) {
    }

    ngOnInit() {
        this.currencyKeysToDisplay = this.coinMarketCapService.currencyKeysToDisplay;
        this.loadCurrencyData();
    }

    private loadCurrencyData(): void {
        this.coinMarketCapService.getAllCurrencyData()
            .subscribe(
                data => this.updateCurrencyData(data)
            );
    }

    private updateCurrencyData(currencyData: Currency[]): void {
        this.currencyData = currencyData;
        const currencyKeysToDisplay = this.currencyKeysToDisplay;

        this.currencyData = this.currencyData.filter(function (el) {
            return currencyKeysToDisplay.indexOf(el.name.toLowerCase()) > -1;
        });
    }

}

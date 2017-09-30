import {Component, Input, OnInit} from '@angular/core';
import {Currency} from '../../shared/models/currency.model';

@Component({
    selector: 'app-currency-stats',
    templateUrl: './currency-stats.component.html',
    styleUrls: ['./currency-stats.component.scss']
})
export class CurrencyStatsComponent implements OnInit {
    @Input() allCurrencies: Currency[];

    constructor() {
    }

    ngOnInit() {
    }

    get totalValue() {
        let sumOfCurrencies = 0;
        if (this.allCurrencies != null) {
            for (const currentCurrency of this.allCurrencies) {
                console.log(currentCurrency.price_usd);
                sumOfCurrencies += +currentCurrency.price_usd;
            }
        }
        return sumOfCurrencies.toFixed(2);
    }

}

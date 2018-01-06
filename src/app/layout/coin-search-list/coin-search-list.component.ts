import {Component, OnDestroy, OnInit} from '@angular/core';
import {CoinSearchService} from '../coin-search.service';
import {Currency} from '../../shared/models/currency.model';
import {Subscription} from 'rxjs/Subscription';
import {UserSettingsService} from '../../data/user-settings.service';
import {LocalStorageService} from '../../core/local-storage.service';
import {AVAILABLE_COIN_ICONS} from '../../data/icons.constants';

@Component({
    selector: 'app-coin-search-list',
    templateUrl: './coin-search-list.component.html',
    styleUrls: ['./coin-search-list.component.scss']
})
export class CoinSearchListComponent implements OnInit, OnDestroy {
    private _filteredCoins: Currency[];
    searchResultsSubscription: Subscription;

    constructor(private coinSearchService: CoinSearchService,
                private userSettingsService: UserSettingsService,
                private localStorageService: LocalStorageService) {
    }

    ngOnInit() {
        this._filteredCoins = this.coinSearchService.searchResults;
        this.searchResultsSubscription = this.coinSearchService.searchResults$.subscribe(
            data => this._filteredCoins = data);
    }

    ngOnDestroy() {
        if (this.searchResultsSubscription != null) {
            this.searchResultsSubscription.unsubscribe();
        }
    }


    get filteredCoins(): Currency[] {
        if (this._filteredCoins) {
            return this._filteredCoins.map((currency: Currency) => {
                const symbol = currency.symbol.toLowerCase();
                const coinAvailable = AVAILABLE_COIN_ICONS.indexOf(symbol) > -1;
                currency.iconURL = coinAvailable ? `../../../assets/icons/${symbol}.png` : '';

                return currency;
            });
        } else {
            return [];
        }
    }

    set filteredCoins(value: Currency[]) {
        this._filteredCoins = value;
    }


    iconURL(currency: Currency): string {
        if (AVAILABLE_COIN_ICONS.indexOf(currency.symbol.toLowerCase()) > -1) {
            return '../../../assets/icons/' + currency.symbol.toLowerCase() + '.png';
        } else {
            return '';
        }
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
        this.localStorageService.setItem('currencyKeysToDisplay',
            JSON.stringify(this.userSettingsService.currencyKeysToDisplay));

        this.coinSearchService.updateSearchResults([]);
        this.coinSearchService.updateClearSearch(true);
    }

}

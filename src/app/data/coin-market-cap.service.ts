import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ENDPOINT } from './endpoint.constants';
import { Currency } from '../shared/models/currency.model';

/**
 * I suggest breaking this out into two different services. Use this one for your
 * http calls, and create a different one that provides the current user's configuration
 * values for the types of currency they want to display.
 */
@Injectable()
export class CoinMarketCapService {
    currencyKeysToDisplay: string[] = ['bitcoin', 'litecoin'];
    private currencyKeysToDisplaySubject = new Subject<string[]>();
    currencyKeysToDisplay$ = this.currencyKeysToDisplaySubject.asObservable();

    constructor(private http: Http) {
    }

    getAllCurrencyData(): Observable<Currency[]> {
        return this.http.get(ENDPOINT.currenciesURL)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateCurrenciesToDisplay(currencies: string[]): void {
        this.currencyKeysToDisplay = currencies;
        this.currencyKeysToDisplaySubject.next(this.currencyKeysToDisplay);
    }

    private extractData(res: Response) {
        const body = res.json();
        return body || [];
    }

    private handleError(error: any) {
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}

import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {ENDPOINT} from './endpoint.constants';
import { Currency } from '../shared/models/currency.model';
import {Subject} from 'rxjs/Subject';

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

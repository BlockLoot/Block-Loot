import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Currency} from './models/currency.model';
import {Observable} from 'rxjs/Observable';
import {ENDPOINT} from './endpoint.constants';

@Injectable()
export class CoinMarketCapService {

    constructor(private http: Http) {
    }

    getAllCurrencyData(): Observable<Currency[]> {
        return this.http.get(ENDPOINT.currenciesURL)
            .map(this.extractData)
            .catch(this.handleError);
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

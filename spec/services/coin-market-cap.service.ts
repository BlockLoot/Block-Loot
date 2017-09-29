import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Currency } from '../../src/app/shared/models/currency.model';

export class MockCoinMarketCapService {

  constructor() { }

  getAllCurrencyData(): Observable<Currency[]> {
    const mockData = Observable.create((observer: Observer<Currency[]>) => {
      observer.next([new Currency()]);
      observer.complete();
    });

    return mockData
  }


}

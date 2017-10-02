import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserSettingsService {
  currencyKeysToDisplay: string[] = ['BTC', 'LTC', 'GNT', 'ETH', 'QTUM', 'OMG'];
  private currencyKeysToDisplaySubject = new Subject<string[]>();
  currencyKeysToDisplay$ = this.currencyKeysToDisplaySubject.asObservable();

  currencyAmountsOwned: {} = {
    'BTC': 0.0271,
    'LTC': 22.00,
    'GNT': 761.00,
    'ETH': 0.807,
    'QTUM': 2.00,
    'OMG': 2.00
  };
  private currencyAmountsOwnedSubject = new Subject<{}>();
  currencyAmountsOwned$ = this.currencyAmountsOwnedSubject.asObservable();

  constructor() {
  }

  updateCurrenciesToDisplay(currencies: string[]): void {
    this.currencyKeysToDisplay = currencies;
    this.currencyKeysToDisplaySubject.next(this.currencyKeysToDisplay);
  }

}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserSettingsService {
  currencyKeysToDisplay: string[] = ['BTC', 'LTC', 'GNT', 'ETH', 'QTUM', 'OMG'];
  private currencyKeysToDisplaySubject = new Subject<string[]>();
  currencyKeysToDisplay$ = this.currencyKeysToDisplaySubject.asObservable();

  currencyAmountsOwned: {};
  private currencyAmountsOwnedSubject = new Subject<{}>();
  currencyAmountsOwned$ = this.currencyAmountsOwnedSubject.asObservable();

  constructor() {
  }

  updateCurrenciesToDisplay(currencies: string[]): void {
    this.currencyKeysToDisplay = currencies;
    this.currencyKeysToDisplaySubject.next(this.currencyKeysToDisplay);
  }

}

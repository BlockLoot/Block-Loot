import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserSettingsService {
  currencyKeysToDisplay: string[] = ['bitcoin', 'litecoin', 'golem', 'ethereum', 'quantum', 'omisego'];
  private currencyKeysToDisplaySubject = new Subject<string[]>();
  currencyKeysToDisplay$ = this.currencyKeysToDisplaySubject.asObservable();

  constructor() {
  }

  updateCurrenciesToDisplay(currencies: string[]): void {
    this.currencyKeysToDisplay = currencies;
    this.currencyKeysToDisplaySubject.next(this.currencyKeysToDisplay);
  }

}

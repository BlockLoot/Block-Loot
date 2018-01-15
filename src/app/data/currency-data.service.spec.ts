import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { CurrencyDataService } from './currency-data.service';

import '../rxjs-operators';

describe('CurrencyDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        CurrencyDataService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should be created', inject([CurrencyDataService], (service: CurrencyDataService) => {
    expect(service).toBeTruthy();
  }));
});

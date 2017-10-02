import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { CoinMarketCapService } from './coin-market-cap.service';

import '../rxjs-operators';

describe('CoinMarketCapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        CoinMarketCapService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should be created', inject([CoinMarketCapService], (service: CoinMarketCapService) => {
    expect(service).toBeTruthy();
  }));
});

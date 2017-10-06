import { TestBed, inject } from '@angular/core/testing';

import { CoinSearchService } from './coin-search.service';

describe('CoinSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoinSearchService]
    });
  });

  it('should be created', inject([CoinSearchService], (service: CoinSearchService) => {
    expect(service).toBeTruthy();
  }));
});

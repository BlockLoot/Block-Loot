import { TestBed, inject } from '@angular/core/testing';

import { SweetAlertService } from './sweet-alert.service';

describe('SweetAlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SweetAlertService]
    });
  });

  it('should be created', inject([SweetAlertService], (service: SweetAlertService) => {
    expect(service).toBeTruthy();
  }));
});

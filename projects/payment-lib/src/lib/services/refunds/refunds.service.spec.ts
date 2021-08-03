import { TestBed, inject } from '@angular/core/testing';

import { RefundsService } from './refunds.service';

describe('BulkScaningPaymentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RefundsService]
    });
  });

  it('should be created', inject([RefundsService], (service: RefundsService) => {
    expect(service).toBeTruthy();
  }));
});

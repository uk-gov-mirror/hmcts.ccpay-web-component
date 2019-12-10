import { TestBed, inject } from '@angular/core/testing';

import { BulkScaningPaymentService } from './bulk-scaning-payment.service';

describe('BulkScaningPaymentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BulkScaningPaymentService]
    });
  });

  it('should be created', inject([BulkScaningPaymentService], (service: BulkScaningPaymentService) => {
    expect(service).toBeTruthy();
  }));
});

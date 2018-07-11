import { TestBed, inject } from '@angular/core/testing';

import { PaymentListService } from './payment-list.service';

describe('PaymentListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentListService]
    });
  });

  it('should be created', inject([PaymentListService], (service: PaymentListService) => {
    expect(service).toBeTruthy();
  }));
});

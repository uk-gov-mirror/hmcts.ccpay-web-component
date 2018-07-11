import { TestBed, inject } from '@angular/core/testing';

import { PaymentViewService } from './payment-view.service';

describe('PaymentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentViewService]
    });
  });

  it('should be created', inject([PaymentViewService], (service: PaymentViewService) => {
    expect(service).toBeTruthy();
  }));
});

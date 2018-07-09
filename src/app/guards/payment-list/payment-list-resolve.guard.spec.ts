import { TestBed, async, inject } from '@angular/core/testing';

import { PaymentListResolveGuard } from './payment-list-resolve.guard';

describe('PaymentListResolveGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentListResolveGuard]
    });
  });

  it('should ...', inject([PaymentListResolveGuard], (guard: PaymentListResolveGuard) => {
    expect(guard).toBeTruthy();
  }));
});

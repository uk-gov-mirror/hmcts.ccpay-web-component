import { TestBed, inject } from '@angular/core/testing';

import { CaseTransactionsService } from './bulk-scaning-payment.service';

describe('CaseTransactionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaseTransactionsService]
    });
  });

  it('should be created', inject([CaseTransactionsService], (service: CaseTransactionsService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { CaseTransactionsService } from './case-transactions.service';

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

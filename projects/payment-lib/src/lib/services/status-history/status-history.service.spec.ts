import { TestBed, inject } from '@angular/core/testing';

import { StatusHistoryService } from './status-history.service';

describe('PaymentStatusesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatusHistoryService]
    });
  });

  it('should be created', inject([StatusHistoryService], (service: StatusHistoryService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { CaseListService } from './case-list.service';

describe('CaseListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaseListService]
    });
  });

  it('should be created', inject([CaseListService], (service: CaseListService) => {
    expect(service).toBeTruthy();
  }));
});

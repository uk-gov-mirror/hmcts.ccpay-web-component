import { TestBed, inject } from '@angular/core/testing';

import { CardDetailsService } from './card-details.service';

describe('CardDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardDetailsService]
    });
  });

  it('should be created', inject([CardDetailsService], (service: CardDetailsService) => {
    expect(service).toBeTruthy();
  }));
});

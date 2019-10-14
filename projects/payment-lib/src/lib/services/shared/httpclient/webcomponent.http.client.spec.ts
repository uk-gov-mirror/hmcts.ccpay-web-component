import { TestBed, inject } from '@angular/core/testing';

import { WebComponentHttpClient } from './webcomponent.http.client';

describe('PaymentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebComponentHttpClient]
    });
  });

  it('should be created', inject([WebComponentHttpClient], (service: WebComponentHttpClient) => {
    expect(service).toBeTruthy();
  }));
});

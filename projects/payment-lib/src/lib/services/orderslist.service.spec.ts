import { TestBed } from '@angular/core/testing';

import { OrderslistService } from './orderslist.service';

describe('OrderslistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderslistService = TestBed.get(OrderslistService);
    expect(service).toBeTruthy();
  });
});

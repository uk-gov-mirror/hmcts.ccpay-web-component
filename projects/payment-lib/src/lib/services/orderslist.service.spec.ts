import { TestBed } from '@angular/core/testing';
import { IRefundList } from '../interfaces/IRefundList';
import { IPaymentView } from '../interfaces/IPaymentView';
import { OrderslistService } from './orderslist.service';

describe('OrderslistService', () => {
  let service: OrderslistService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [OrderslistService] });
    service = TestBed.get(OrderslistService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});

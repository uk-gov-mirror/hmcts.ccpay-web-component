import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { ICasePayments } from '../../interfaces/ICasePayments';
import {PaymentListService} from '../../services/payment-list/payment-list.service';


@Injectable({
  providedIn: 'root'
})
export class PaymentListResolveGuard implements Resolve<ICasePayments[]> {

  constructor(private paymentListService: PaymentListService) {}

  resolve(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): ICasePayments[] {

      return null;
  }
}

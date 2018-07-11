import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ccpay-payment-lib',
  templateUrl: './payment-lib.component.html'
})

export class PaymentLibComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}

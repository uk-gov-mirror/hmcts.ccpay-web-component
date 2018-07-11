import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ccpay-payment-lib',
  templateUrl: './payment-lib.component.html'
})

export class PaymentLibComponent implements OnInit {
  @Input('API_ROOT') API_ROOT: string;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('API_ROOT url is: ', this.API_ROOT);
  }

}

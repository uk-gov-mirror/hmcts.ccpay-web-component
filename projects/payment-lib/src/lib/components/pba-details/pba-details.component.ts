import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPayment } from '../../interfaces/IPayment';

@Component({
    selector: 'ccpay-pba-details',
    templateUrl: './pba-details.component.html',
    styleUrls: ['./pba-details.component.css'],
    standalone: true,
    imports: [CommonModule]
})
export class PbaDetailsComponent implements OnInit {
  @Input() payment: IPayment;

  constructor() { }

  ngOnInit() {
  }

}

import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'ccpay-refund-list',
  templateUrl: './refund-list.component.html',
  styleUrls: ['./refund-list.component.css']
})
export class RefundListComponent implements OnInit {
  @Input('ROLE') ROLE: String;

  constructor() {
  }

  tableApprovalHeader: string;
  tableRejectedHeader: string;

  ngOnInit() {
      this.tableApprovalHeader = 'Refunds to be approved';
      this.tableRejectedHeader = 'Refunds returned to caseworker';
  }
  
}

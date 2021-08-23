import {Component, OnInit, Input} from '@angular/core';
import { RefundsService } from '../../services/refunds/refunds.service';

@Component({
  selector: 'ccpay-refund-list',
  templateUrl: './refund-list.component.html',
  styleUrls: ['./refund-list.component.css']
})
export class RefundListComponent implements OnInit {
  @Input('USERID') USERID: string;

  constructor(private refundService: RefundsService) {
  }

  tableApprovalHeader: string;
  tableRejectedHeader: string;

  ngOnInit() {
    this.refundService.getUserDetails().subscribe(
      userdetail => { 
        console.log(userdetail);
        console.log(userdetail['data']);
      } );
      this.tableApprovalHeader = 'Refunds to be approved';
      this.tableRejectedHeader = 'Refunds returned to caseworker';
  }
  
}
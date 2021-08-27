import { Component, OnInit, Input } from '@angular/core';
import { RefundsService } from '../../services/refunds/refunds.service';
import { IRefundList } from '../../interfaces/IRefundList';

@Component({
  selector: 'ccpay-refund-status',
  templateUrl: './refund-status.component.html',
  styleUrls: ['./refund-status.component.css']
})
export class RefundStatusComponent implements OnInit {
  @Input("CCDCASENUMBER") CCDCASENUMBER : string;

  rejectedRefundList: IRefundList[] = [];
  approvalStatus = 'sent for approval';
  rejectStatus = 'sent back';
  errorMessage = null;
  viewName: string;
  refundlist: IRefundList;

  constructor(private refundService: RefundsService) { }

  ngOnInit() {
    this.refundService.getRefundList(this.CCDCASENUMBER).subscribe(
      refundList => {
        this.rejectedRefundList = refundList['data']['refund_list'];
      }
    ),
    (error: any) => {
      this.errorMessage = error;
    };
  }

  goToRefundView(refundlist: IRefundList) {
    this.viewName = 'refundview';
    this.refundlist = refundlist;
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { RefundsService } from '../../services/refunds/refunds.service';
import { IRefundList } from '../../interfaces/IRefundList';
import { PaymentLibComponent } from '../../payment-lib.component';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import {Router} from '@angular/router';
const BS_ENABLE_FLAG = 'bulk-scan-enabling-fe';

@Component({
  selector: 'ccpay-refund-status',
  templateUrl: './refund-status.component.html',
  styleUrls: ['./refund-status.component.css']
})
export class RefundStatusComponent implements OnInit {
  @Input("CCDCASENUMBER") CCDCASENUMBER : string;
  @Input("VIEWSTATUSNAME") VIEWSTATUSNAME : string;
  @Input() isOldPcipalOff: string;
  @Input() isNewPcipalOff: string;
  @Input() ccdCaseNumber: string;
  @Input() isTurnOff: boolean;

  rejectedRefundList: IRefundList[] = [];
  approvalStatus = 'sent for approval';
  rejectStatus = 'sent back';
  errorMessage = null;
  viewName: string;
  viewStatusName: string;
  refundlist: IRefundList;
  bsPaymentDcnNumber: string;

  constructor(private refundService: RefundsService,
    private paymentLibComponent: PaymentLibComponent,
    private paymentViewService: PaymentViewService,
    private router: Router) { }

  ngOnInit() {
    this.bsPaymentDcnNumber = this.paymentLibComponent.bspaymentdcn;
    if(this.paymentLibComponent.isRefundStatusView) {
      this.viewName = 'refundview';
    } else {
      this.viewName = 'refundstatuslist';
    }
    this.refundService.getRefundStatusList(this.CCDCASENUMBER).subscribe(
      refundList => {
        this.rejectedRefundList = refundList['data']['refund_list'];
      }
    ),
    (error: any) => {
      this.errorMessage = error;
    };
  }

  goToRefundView(refundlist: IRefundList) {
    this.paymentLibComponent.viewName='refundstatuslist';
    this.paymentLibComponent.isRefundStatusView = true;
    this.refundlist = refundlist;
  }

  loadCaseTransactionPage() {
    this.paymentLibComponent.TAKEPAYMENT = true;
    this.paymentLibComponent.viewName = 'case-transactions';
    this.paymentViewService.getBSfeature().subscribe(
      features => {
        let result = JSON.parse(features).filter(feature => feature.uid === BS_ENABLE_FLAG);
        this.paymentLibComponent.ISBSENABLE = result[0] ? result[0].enable : false;
      },
      err => {
        this.paymentLibComponent.ISBSENABLE = false;
      }
    );

    let partUrl = `selectedOption=${this.paymentLibComponent.SELECTED_OPTION}`;
      partUrl +=this.bsPaymentDcnNumber ? `&dcn=${this.bsPaymentDcnNumber}` : '';
      partUrl +=this.paymentLibComponent.ISBSENABLE ? '&isBulkScanning=Enable' : '&isBulkScanning=Disable';
      partUrl +=this.paymentLibComponent.ISTURNOFF ? '&isTurnOff=Enable' : '&isTurnOff=Disable';
      partUrl +=this.paymentLibComponent.ISSFENABLE ? '&isStFixEnable=Enable' : '&isStFixEnable=Disable';
      partUrl +=`&caseType=${this.paymentLibComponent.CASETYPE}`;
      partUrl +=this.isNewPcipalOff ? '&isNewPcipalOff=Enable' : '&isNewPcipalOff=Disable';
      partUrl +=this.isOldPcipalOff ? '&isOldPcipalOff=Enable' : '&isOldPcipalOff=Disable';

    let url = `/payment-history/${this.ccdCaseNumber}?view=case-transactions&takePayment=true&${partUrl}`;
    this.router.navigateByUrl(url);
  }

}

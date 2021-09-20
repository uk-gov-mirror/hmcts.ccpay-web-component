import { Component, OnInit, Input } from '@angular/core';
import { RefundsService } from '../../services/refunds/refunds.service';
import { FormBuilder, FormGroup, Validators, FormControl, RequiredValidator } from '@angular/forms';
import { IRefundList } from '../../interfaces/IRefundList';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import { Router } from '@angular/router';
import { OrderslistService } from '../../services/orderslist.service';
import { IRefundReasons } from '../../interfaces/IRefundReasons';
import { IRefundStatus } from '../../interfaces/IRefundStatus';
import { IResubmitRefundRequest } from '../../interfaces/IResubmitRefundRequest';
import { PaymentLibComponent } from '../../payment-lib.component';
const BS_ENABLE_FLAG = 'bulk-scan-enabling-fe';

@Component({
  selector: 'ccpay-refund-status',
  templateUrl: './refund-status.component.html',
  styleUrls: ['./refund-status.component.css']
})
export class RefundStatusComponent implements OnInit {
  @Input('LOGGEDINUSERROLES') LOGGEDINUSERROLES: string[] = [];
  @Input() isOldPcipalOff: boolean;
  @Input() isNewPcipalOff: boolean;
  @Input() ccdCaseNumber: string;
  @Input() isTurnOff: boolean;
  refundStatusForm: FormGroup;
  selectedRefundReason: string;
  rejectedRefundList: IRefundList[] = [];
  approvalStatus = 'sent for approval';
  rejectStatus = 'sent back';
  errorMessage = null;
  viewName: string;
  refundReason: string;
  refundlist: IRefundList;
  bsPaymentDcnNumber: string;
  isCallFromRefundList: boolean;
  refundButtonState: string = '';
  isAmountEmpty: boolean = false;
  isReasonEmpty: boolean = false;
  amountHasError: boolean = false;
  isRemissionLessThanFeeError: boolean = false;
  refundHasError: boolean = false;
  refundReasons: any[] = [];
  refundStatusHistories: IRefundStatus[];
  refundReference: string;
  refundAmount: string;
  refundCode: string;
  isRefundBtnDisabled: boolean = true;
  oldRefundReason: string;
  refundreason: string;
  allowedRolesToAccessRefund = ['payments-refund-approver', 'payments-refund'];
  navigationpage: string;
  isLastUpdatedByCurrentUser: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private refundService: RefundsService,
    private paymentLibComponent: PaymentLibComponent,
    private paymentViewService: PaymentViewService,
    private router: Router,
    private OrderslistService: OrderslistService) { }

  ngOnInit() {
    this.resetRemissionForm([false, false, false, false], 'All');
    this.bsPaymentDcnNumber = this.paymentLibComponent.bspaymentdcn;
    this.isCallFromRefundList = this.paymentLibComponent.isCallFromRefundList;
    // if(this.paymentLibComponent.isFromRefundStatusPage) {
    //   this.viewName = 'reviewandsubmitview';
    // }
    if (this.paymentLibComponent.isRefundStatusView) {
      this.viewName = 'refundview';
      this.OrderslistService.getRefundView().subscribe((data) => this.refundlist = data);
      this.OrderslistService.getCCDCaseNumberforRefund.subscribe((data) => this.ccdCaseNumber = data);
    } else {
      this.viewName = 'refundstatuslist';
      this.refundService.getRefundStatusList(this.ccdCaseNumber).subscribe(
        refundList => {
          this.rejectedRefundList = refundList['data']['refund_list'];
        }
      ),
        (error: any) => {
          this.errorMessage = error;
        };
    }


    this.refundStatusForm = this.formBuilder.group({
      amount: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]+(\\.[0-9]{2})?$')
      ])),
      refundReason: new FormControl('', Validators.compose([Validators.required])),
      reason: new FormControl()
    });

    this.getRefundsStatusHistoryList();

    this.allowedRolesToAccessRefund.forEach((role) => {
      if (this.LOGGEDINUSERROLES.indexOf(role) !== -1) {
        this.refundButtonState = this.refundlist.refund_status.name;
      }
    });
  }

  getRefundsStatusHistoryList() {
    this.refundService.getRefundStatusHistory(this.refundlist.refund_reference).subscribe(
      statusHistoryList => {
        this.refundStatusHistories = statusHistoryList['data'].status_history_dto_list;
        this.isLastUpdatedByCurrentUser = statusHistoryList['data'].last_updated_by_current_user;
      }
    ),
      (error: any) => {
        this.errorMessage = error;
      };
  }

  goToRefundView(refundlist: IRefundList, navigationpage: string) {
    this.OrderslistService.setRefundView(refundlist);
    this.OrderslistService.setCCDCaseNumber(this.ccdCaseNumber);
    this.paymentLibComponent.viewName = 'refundstatuslist';
    this.paymentLibComponent.isRefundStatusView = true;
    this.refundlist = refundlist;
    this.OrderslistService.setnavigationPage(navigationpage);
  }

  loadCaseTransactionPage() {
    this.paymentLibComponent.isRefundStatusView = false;
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
    partUrl += this.bsPaymentDcnNumber ? `&dcn=${this.bsPaymentDcnNumber}` : '';
    partUrl += this.paymentLibComponent.ISBSENABLE ? '&isBulkScanning=Enable' : '&isBulkScanning=Disable';
    partUrl += this.paymentLibComponent.ISTURNOFF ? '&isTurnOff=Enable' : '&isTurnOff=Disable';
    partUrl += this.paymentLibComponent.ISSFENABLE ? '&isStFixEnable=Enable' : '&isStFixEnable=Disable';
    partUrl += `&caseType=${this.paymentLibComponent.CASETYPE}`;
    partUrl += this.isNewPcipalOff ? '&isNewPcipalOff=Enable' : '&isNewPcipalOff=Disable';
    partUrl += this.isOldPcipalOff ? '&isOldPcipalOff=Enable' : '&isOldPcipalOff=Disable';
    let url = `/payment-history/${this.ccdCaseNumber}?view=case-transactions&takePayment=true&${partUrl}`;
    this.router.navigateByUrl(url);
  }

  loadRefundListPage() {
    this.OrderslistService.getnavigationPageValue().subscribe((data) => this.navigationpage = data);
    if (this.navigationpage === 'casetransactions') {
      this.loadCaseTransactionPage();
    } else {
      this.paymentLibComponent.viewName = 'refund-list';
    }
  }

  gotoReviewDetailsPage() {
    event.preventDefault();
    this.errorMessage = false;
    this.paymentLibComponent.isRefundStatusView = true;
    this.ngOnInit();
    // this.viewName='refundview';
    // this.paymentLibComponent.CCD_CASE_NUMBER = this.ccdCaseNumber;
    // this.paymentLibComponent.isRefundStatusView = true;
    // this.paymentLibComponent.isCallFromRefundList = true;
  }

  gotoReviewAndReSubmitPage() {
    this.viewName = 'reviewandsubmitview';
    this.oldRefundReason = this.refundlist.reason;
    this.refundreason = this.refundStatusHistories.filter(data => data.status === 'sentback')[0].notes;
    this.refundService.getRefundReasons().subscribe(
      refundReasons => {
        this.refundReasons = refundReasons['data'];
      });
  }
  gotoRefundReasonPage() {
    this.isRefundBtnDisabled = false;
    this.paymentLibComponent.isFromRefundStatusPage = true;
    this.ccdCaseNumber = this.paymentLibComponent.CCD_CASE_NUMBER;
    this.errorMessage = false;
    this.viewName = 'issuerefund';
  }

  gotoAmountPage() {
    this.isRefundBtnDisabled = false;
    this.ccdCaseNumber = this.paymentLibComponent.CCD_CASE_NUMBER;
    this.paymentLibComponent.isFromRefundStatusPage = true;
    this.viewName = 'processretroremissonpage';
  }

  goToReviewAndSubmitView() {
    const remissionctrls = this.refundStatusForm.controls
    if (this.refundStatusForm.dirty) {
      if (remissionctrls['amount'].value == '') {
        this.resetRemissionForm([true, false, false, false], 'amount');
      }
      else if (remissionctrls['amount'].value != '' && remissionctrls['amount'].invalid) {
        this.resetRemissionForm([false, true, false, false], 'amount');
      }
      else if (remissionctrls['reason'].value == '') {
        this.resetRemissionForm([false, false, false, true], 'reason');
      } else {
        this.refundlist.reason = remissionctrls['reason'].value;
        this.viewName = 'reviewandsubmitview';
      }
    }

  }

  resetRemissionForm(val, field) {
    if (field === 'All') {
      this.isAmountEmpty = val[0];
      this.amountHasError = val[1];
      this.isRemissionLessThanFeeError = val[2];
      this.isReasonEmpty = val[3];
    } else if (field === 'amount' || field === 'All') {
      this.isAmountEmpty = val[0];
      this.amountHasError = val[1];
      this.isRemissionLessThanFeeError = val[2];
    } else if (field === 'reason' || field === 'All') {
      this.isReasonEmpty = val[3];
    }
  }

  selectRadioButton(key, value) {
    this.refundHasError = false;
    this.selectedRefundReason = key;
    if (key === 'Other') {
      this.refundHasError = false;
      this.refundReason = key;
    }
  }

  getRefundListReason(refundListReason: any) {
    if (this.paymentLibComponent.isFromRefundStatusPage && !this.paymentLibComponent.iscancelClicked) {
      this.refundlist.reason = refundListReason.reason;
      this.refundCode = refundListReason.code;
    } else {
      this.isRefundBtnDisabled = true;
    }
    this.viewName = 'reviewandsubmitview';
    this.paymentLibComponent.CCD_CASE_NUMBER = this.ccdCaseNumber;
  }

  getRefundAmount(amount: number) {
    if (this.paymentLibComponent.isFromRefundStatusPage && !this.paymentLibComponent.iscancelClicked) {
      if (amount > 0) {
        this.refundlist.amount = amount;
      }
    } else {
      this.isRefundBtnDisabled = true;
    }
    this.viewName = 'reviewandsubmitview';
    this.paymentLibComponent.CCD_CASE_NUMBER = this.ccdCaseNumber;
  }

  gotoReviewRefundConfirmationPage() {
    if (this.oldRefundReason === this.refundlist.reason) {
      this.refundCode = '';
    }
    const resubmitRequest = new IResubmitRefundRequest(this.refundCode, this.refundlist.amount);
    this.refundService.patchResubmitRefund(resubmitRequest, this.refundlist.refund_reference).subscribe(
      response => {
        if (JSON.parse(response)) {
          this.refundReference = JSON.parse(response).data.refund_reference;
          this.refundAmount = JSON.parse(response).data.refund_amount;
          this.viewName = 'reviewrefundconfirmationpage';
        }
      },
      (error: any) => {
        this.errorMessage = error;
      }
    );

  }

  goToRefundProcessComponent(refundReference: string, refundList: IRefundList) {
    this.paymentLibComponent.refundlistsource = refundList;
    this.paymentLibComponent.refundReference = refundReference;
    this.paymentLibComponent.viewName = 'process-refund';
  }

}

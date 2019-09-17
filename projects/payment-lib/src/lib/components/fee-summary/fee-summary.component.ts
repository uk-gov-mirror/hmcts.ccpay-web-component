import { Component, OnInit, Input } from '@angular/core';
import { IPaymentGroup } from '../../interfaces/IPaymentGroup';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import { BulkScaningPaymentService } from '../../services/bulk-scaning-payment/bulk-scaning-payment.service';
import { PaymentLibComponent } from '../../payment-lib.component';
import { IRemission } from '../../interfaces/IRemission';
import { IFee } from '../../interfaces/IFee';
import { PaymentToPayhubRequest } from '../../interfaces/PaymentToPayhubRequest';
import { SafeHtml } from '@angular/platform-browser';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import { debugOutputAstAsTypeScript } from '@angular/compiler';

@Component({
  selector: 'ccpay-fee-summary',
  templateUrl: './fee-summary.component.html',
  styleUrls: ['./fee-summary.component.scss']
})

export class FeeSummaryComponent implements OnInit {
  @Input() paymentGroupRef: string;
  @Input() ccdCaseNumber: string;

  bsPaymentDcnNumber: string;
  paymentGroup: IPaymentGroup;
  errorMessage: string;
  viewStatus = 'main';
  currentFee: IFee;
  totalFee: number;
  payhubHtml: SafeHtml;
  service: string = null;
  upPaymentErrorMessage: string;
  selectedOption:string;
  isBackButtonEnable: boolean = true;
  outStandingAmount: number;
  totalAfterRemission: number = 0;

  constructor(
    private router: Router,
    private bulkScaningPaymentService: BulkScaningPaymentService,
    private location: Location,
    private paymentViewService: PaymentViewService,
    private paymentLibComponent: PaymentLibComponent
  ) {}

  ngOnInit() {
    this.viewStatus = 'main';
    this.bsPaymentDcnNumber = this.paymentLibComponent.bspaymentdcn;
    this.selectedOption = this.paymentLibComponent.SELECTED_OPTION.toLocaleLowerCase();
    //this.paymentGroupRef = '2018-15310089885';
    //this.paymentGroupRef = '2019-15496299273';
    if (this.bsPaymentDcnNumber) {
      this.getUnassignedPaymentlist();
    }
    this.getPaymentGroup();
  }

    getUnassignedPaymentlist() {
     if (this.selectedOption === 'dcn') {
        this.bulkScaningPaymentService.getBSPaymentsByDCN(this.paymentLibComponent.DCN_NUMBER).subscribe(
        unassignedPayments => {
        this.service = unassignedPayments['data'].responsible_service_id;
        },
        (error: any) => this.upPaymentErrorMessage = error
      );
    } else {
        this.bulkScaningPaymentService.getBSPaymentsByCCD(this.ccdCaseNumber).subscribe(
        unassignedPayments => {
        this.service = unassignedPayments['data'].responsible_service_id;
        },
        (error: any) => this.upPaymentErrorMessage = error
      );
    }

  }

  getRemissionByFeeCode(feeCode: string): IRemission {
    if (this.paymentGroup && this.paymentGroup.remissions && this.paymentGroup.remissions.length > 0) {
      for (const remission of this.paymentGroup.remissions) {
        if (remission.fee_code === feeCode) {
          return remission;
        }
      }
    }
    return null;
  }

  addRemission(fee: IFee) {
    if (this.service) {
      this.currentFee = fee;
      this.viewStatus = 'add_remission';
    }
  }

  getPaymentGroup() {
    this.paymentViewService.getPaymentGroupDetails(this.paymentGroupRef,
      this.paymentLibComponent.paymentMethod).subscribe(
      paymentGroup => {
        this.paymentGroup = paymentGroup;
        if (paymentGroup.fees) {
          paymentGroup.fees.forEach(fee => {
              this.totalAfterRemission  = this.totalAfterRemission  + fee.net_amount;
          });
        }
        this.outStandingAmount = this.bulkScaningPaymentService.calculateOutStandingAmount(paymentGroup);
      },
      (error: any) => this.errorMessage = error
    );
  }

  confirmRemoveFee(fee: IFee){
    this.currentFee = fee;
    this.viewStatus = 'feeRemovalConfirmation';
  }

  removeFee(fee: any){
    this.paymentViewService.deleteFeeFromPaymentGroup(fee).subscribe(
      (success: any) => {
          if (this.paymentGroup.fees && this.paymentGroup.fees.length > 1){
          this.getPaymentGroup();
          this.viewStatus = 'main';
          return;
          }
          this.loadCaseTransactionPage();
      },
      (error: any) => {
          this.errorMessage = error;
      }
    );
  }

 loadCaseTransactionPage() {
    this.paymentLibComponent.TAKEPAYMENT = true;
    this.paymentLibComponent.viewName = 'case-transactions';
  }
  cancelRemission() {
    this.viewStatus = 'main';
  }
  redirectToFeeSearchPage(event: any, page?: string) {
    event.preventDefault();
    let dcn = this.bsPaymentDcnNumber ? `&dcn=${this.bsPaymentDcnNumber}` : '';
    if(this.viewStatus === 'feeRemovalConfirmation' || this.viewStatus === 'add_remission') {
      this.viewStatus = 'main';
      return;
    }
    let url = `/fee-search?ccdCaseNumber=${this.ccdCaseNumber}&selectedOption=${this.paymentLibComponent.SELECTED_OPTION}&paymentGroupRef=${this.paymentGroupRef}${dcn}`;
    this.router.navigateByUrl(url);
  }
  takePayment() {

    const seriveName = this.service ==='AA07' ? 'DIVORCE': this.service ==='AA08' ? 'PROBATE' : '';
    const requestBody = new PaymentToPayhubRequest(this.ccdCaseNumber, this.outStandingAmount, this.service, seriveName);
    this.paymentViewService.postPaymentToPayHub(requestBody, this.paymentGroupRef).subscribe(
      response => {
        this.location.go(`payment-history?view=fee-summary`);
        this.payhubHtml = response;
        this.viewStatus = 'payhub_view';
        this.isBackButtonEnable=false;
      },
      (error: any) => {
        this.errorMessage = error;
      }
    );
  }
  goToAllocatePage() {
    this.paymentLibComponent.paymentGroupReference = this.paymentGroupRef;
    this.paymentLibComponent.viewName = 'allocate-payments';
  }
}

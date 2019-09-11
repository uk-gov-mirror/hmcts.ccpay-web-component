import { Component, OnInit } from '@angular/core';
import { PaymentLibComponent } from '../../payment-lib.component';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import {BulkScaningPaymentService} from '../../services/bulk-scaning-payment/bulk-scaning-payment.service';
import {CaseTransactionsService} from '../../services/case-transactions/case-transactions.service';
import {IPayment} from '../../interfaces/IPayment';
import {IPaymentGroup} from '../../interfaces/IPaymentGroup';
import { IBSPayments } from '../../interfaces/IBSPayments';
import { AllocatePaymentRequest } from '../../interfaces/AllocatePaymentRequest';
import { IAllocationPaymentsRequest } from '../../interfaces/IAllocationPaymentsRequest';

@Component({
  selector: 'app-allocate-payments',
  templateUrl: './allocate-payments.component.html',
  styleUrls: ['./allocate-payments.component.scss']
})
export class AllocatePaymentsComponent implements OnInit {
  viewStatus: string;
  ccdCaseNumber: string;
  bspaymentdcn: string;
  unAllocatedPayment: IBSPayments = {
    amount: 0
  };
  siteID: string = null;
  errorMessage: string;
  paymentGroups: IPayment[] = [];
  selectedPayment: IPaymentGroup;
  remainingAmount: number;
  isRemainingAmountGtZero: boolean;
  afterFeeAllocateOutstanding: number;
  amountForAllocation: number;
  isConfirmButtondisabled: boolean = false;

  constructor(
  private caseTransactionsService: CaseTransactionsService,
  private paymentViewService: PaymentViewService,
  private paymentLibComponent: PaymentLibComponent,
  private bulkScaningPaymentService: BulkScaningPaymentService) { }

  ngOnInit() {
    this.viewStatus = 'mainForm';
    this.ccdCaseNumber = this.paymentLibComponent.CCD_CASE_NUMBER;
    this.bspaymentdcn = this.paymentLibComponent.bspaymentdcn;

    this.getUnassignedPayment();

    this.caseTransactionsService.getPaymentGroups(this.ccdCaseNumber).subscribe(
      paymentGroups => {
      this.paymentGroups = paymentGroups['payment_groups'].filter(paymentGroup => {
          return this.getGroupOutstandingAmount(<any>paymentGroup) > 0;
      });
      },
      (error: any) => this.errorMessage = error
    );
  }
  getGroupOutstandingAmount(paymentGroup: IPaymentGroup): number {
    let feesTotal = 0.00,
      paymentsTotal = 0.00,
      remissionsTotal = 0.00;

    if (paymentGroup.fees) {
      paymentGroup.fees.forEach(fee => {
        feesTotal = feesTotal + fee.calculated_amount;
      });
    }

    if (paymentGroup.payments) {
      paymentGroup.payments.forEach(payment => {
        if (payment.status.toUpperCase() === 'SUCCESS') {
          paymentsTotal = paymentsTotal + payment.amount;
        }
      });
    }

    if (paymentGroup.remissions) {
      paymentGroup.remissions.forEach(remission => {
        remissionsTotal = remissionsTotal + remission.hwf_amount;
      });
    }

    return (feesTotal - remissionsTotal) - paymentsTotal;
  }

  gotoCasetransationPage() {
    this.paymentLibComponent.viewName = 'case-transactions';
    this.paymentLibComponent.TAKEPAYMENT = true;
  }
  selectedPaymentGroup(paymentGroup: IPaymentGroup) {
    this.selectedPayment = paymentGroup;
  }
  cancelAllocatePayment(){
    this.viewStatus = 'mainForm';
  }
  confirmAllocatePayement(){
this.isConfirmButtondisabled = true;
   const requestBody = new AllocatePaymentRequest
    (this.ccdCaseNumber, this.unAllocatedPayment, this.siteID);
    this.bulkScaningPaymentService.postBSAllocatePayment(requestBody, this.selectedPayment.payment_group_reference)
    .subscribe(
      response => {
        const reqBody = new IAllocationPaymentsRequest
        (response['data'].payment_group_reference, response['data'].reference);
        this.paymentViewService.postBSAllocationPayments(reqBody).subscribe(
          res => {
            if (res.success) {
              this.bulkScaningPaymentService.patchBSChangeStatus(this.unAllocatedPayment.dcn_reference, 'PROCESSED').subscribe(
                res => {
                  if (res.success) {
                    this.paymentLibComponent.viewName = 'case-transactions';
                    this.paymentLibComponent.TAKEPAYMENT = true;
                  }
                },
                (error: any) => {
                  this.errorMessage = error;
                  this.isConfirmButtondisabled = false;
                }
              );
            }
          },
          (error: any) => {
            this.errorMessage = error;
            this.isConfirmButtondisabled = false;
          }
        );
      },
      (error: any) => {
        this.errorMessage = error;
        this.isConfirmButtondisabled = false;
      }
    );
  }
  saveAndContinue(){
    if(this.selectedPayment) {
      let GroupOutstandingAmount = this.getGroupOutstandingAmount(this.selectedPayment);
      const remainingToBeAssigned = this.unAllocatedPayment.amount - GroupOutstandingAmount;
      this.isRemainingAmountGtZero = remainingToBeAssigned > 0;
      this.remainingAmount =  this.isRemainingAmountGtZero ? remainingToBeAssigned : 0;
      this.afterFeeAllocateOutstanding = remainingToBeAssigned >= 0 ? 0 : (remainingToBeAssigned * -1);
      this.amountForAllocation = GroupOutstandingAmount >= this.unAllocatedPayment.amount ? this.unAllocatedPayment.amount : GroupOutstandingAmount;

      this.viewStatus = 'allocatePaymentConfirmation';
    }
  }
   getUnassignedPayment() {
    this.bulkScaningPaymentService.getBSPaymentsByDCN(this.bspaymentdcn).subscribe(
      unassignedPayments => {
        this.unAllocatedPayment = unassignedPayments['data'].payments[0];
        this.siteID = unassignedPayments['data'].responsible_service_id;
      },
      (error: any) => this.errorMessage = error
    );
  }


}

import { Component, OnInit, Input} from '@angular/core';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import { PaymentLibComponent } from '../../payment-lib.component';
import { IserviceRequestCardPayment } from '../../interfaces/IserviceRequestCardPayment';
import { IserviceRequestPbaPayment } from '../../interfaces/IserviceRequestPbaPayment';


const BS_ENABLE_FLAG = 'bulk-scan-enabling-fe';

@Component({
  selector: 'ccpay-pba-payment',
  templateUrl: './pba-payment.component.html',
  styleUrls: ['./pba-payment.component.scss']
})
export class PbaPaymentComponent implements OnInit {
  @Input() pbaPayOrderRef: any;
  viewStatus: string;
  pbaAccountList: string[];
  errorMsg: any;
  selectedPbaAccount: string = '';
  pbaAccountRef: string = '';
  isContinueButtondisabled: boolean = true;

  constructor(private  paymentLibComponent: PaymentLibComponent,
    private paymentViewService: PaymentViewService) {}

  ngOnInit() {
    this.pbaPayOrderRef = this.paymentLibComponent.pbaPayOrderRef;
    this.viewStatus = 'pba-payment';
    this.errorMsg = null;
    this.paymentViewService.getPBAaccountDetails()
    .subscribe(
      result => {
        this.pbaAccountList = result.organisationEntityResponse.paymentAccount;
      },
      error => {
        this.errorMsg = error;
      }
    );

  }
  selectpbaaccount(args) {
    if(args.currentTarget.id === 'pbaAccountNumber') {
      this.selectedPbaAccount = args.target.value; 
    }
    if(args.currentTarget.id === 'pbaAccountRef') {
      this.pbaAccountRef = args.target.value; 
    }
    if(this.selectedPbaAccount !== '' && this.pbaAccountRef !== "") {
      this.isContinueButtondisabled = false;
    } else {
      this.isContinueButtondisabled = true;
    }
  }
  saveAndContinue() {
    const requestBody = new IserviceRequestPbaPayment(
      this.selectedPbaAccount, this.pbaPayOrderRef.orderTotalFees, this.pbaAccountRef);
    this.paymentViewService.postPBAaccountPayment(this.pbaPayOrderRef.orderRefId, requestBody)
    .subscribe(
      result => {
      },
      error => {
        this.errorMsg = error;
      }
    );

  }
  cardPayment() {
    const requestBody = new IserviceRequestCardPayment (
      this.pbaPayOrderRef.orderTotalFees);
    this.paymentViewService.postWays2PayCardPayment(this.pbaPayOrderRef.orderRefId, requestBody)
    .subscribe(
      result => {
      },
      error => {
        this.errorMsg = error;
      }
    );

  }
  gotoCasetransationPage() {
    this.paymentLibComponent.viewName = 'case-transactions';
    this.paymentLibComponent.TAKEPAYMENT = false;
    this.paymentLibComponent.ISBSENABLE = true;
    this.paymentLibComponent.isFromServiceRequestPage = true;
  }
}

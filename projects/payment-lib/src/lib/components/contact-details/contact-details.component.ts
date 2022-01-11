import { Component, OnInit, Input } from '@angular/core';
import { PaymentLibComponent } from '../../payment-lib.component';

@Component({
  selector: 'ccpay-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  pageTitle: string = 'Payment status history';
  errorMessage: string;
  isEmailSAddressClicked: boolean = true;
  isPostcodeClicked: boolean = false;
  isManualAddressClicked: boolean = false;


  constructor(
              private paymentLibComponent: PaymentLibComponent) { }

  ngOnInit() {
    
  }

  selectContactOption(type, isLinkedClied) {
    if( type === 'Email' && isLinkedClied === 'false'){
      this.isEmailSAddressClicked = true;
      this.isPostcodeClicked = false;
      this.isManualAddressClicked = false;
    } else if(type === 'Postcode' && isLinkedClied === 'false') {
      this.isEmailSAddressClicked = false;
      this.isPostcodeClicked = true;
      this.isManualAddressClicked = false;
    } else if(type === 'Postcode' && isLinkedClied === 'true') {
      this.isEmailSAddressClicked = false;
      this.isPostcodeClicked = true;
      this.isManualAddressClicked = true;

    }
  }

  finalFormSubmit() {
    if( this.isEmailSAddressClicked ){

    } else if( this.isPostcodeClicked && !this.isManualAddressClicked ) {

    } else if(this.isPostcodeClicked && this.isManualAddressClicked) {

    }

  }

}

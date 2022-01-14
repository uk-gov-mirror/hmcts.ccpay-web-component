import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PaymentLibComponent } from '../../payment-lib.component';

@Component({
  selector: 'ccpay-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  @Output() assignContactDetails: EventEmitter<any> = new EventEmitter();
  @Output() redirectToIssueRefund: EventEmitter<any> = new EventEmitter();
  pageTitle: string = 'Payment status history';
  errorMessage: string;
  isEmailSAddressClicked: boolean = true;
  isPostcodeClicked: boolean = false;
  isManualAddressClicked: boolean = false;
  emailAddressForm: FormGroup;
  postCodeForm: FormGroup;
  manualAddressForm: FormGroup;

  isEmailEmpty: boolean = false;
  emailHasError: boolean = false;
  isPostcodeEmpty: boolean = false;
  postcodeHasError: boolean = false;
  isaddressLine1Empty: boolean = false;
  addressLine1HasError: boolean = false;
  addressLine2HasError: boolean = false;
  isTownOrCityEmpty: boolean = false;
  townOrCityHasError: boolean = false;
  isCountyEmpty: boolean = false;
  countyHasError: boolean = false;
  isMPostcodeEmpty: boolean = false;
  mpostcodeHasError: boolean = false;
  isCountryEmpty: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private paymentLibComponent: PaymentLibComponent) { }

  ngOnInit() {
    this.resetForm([false,false,false,false,false,false,false,false,false,false,false,false,false,false], 'all');

    this.emailAddressForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$')
      ]))
    });
    this.postCodeForm = this.formBuilder.group({
      postcode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^([A-Z]{1,2}[0-9]{1,2}[A-Z]{0,1} ?[0-9][A-Z]{2})')
      ]))
    });
    this.manualAddressForm = this.formBuilder.group({
      addressl1: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9\\s,\'-]*$')
      ])),
      addressl2: new FormControl('', Validators.compose([
        Validators.pattern('^[a-zA-Z0-9\\s,\'-]*$')
      ])),
      townorcity: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9\\s,\'-]*$')
      ])),
      county: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9\\s,\'-]*$')
      ])),
      mpostcode: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^([A-Z]{1,2}[0-9]{1,2}[A-Z]{0,1} ?[0-9][A-Z]{2})')
      ])),
      country: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  selectContactOption(type, isLinkedClied) {
    this.resetForm([false,false,false,false,false,false,false,false,false,false,false,false,false,false,false], 'all');
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
    this.resetForm([false,false,false,false,false,false,false,false,false,false,false,false,false,false,false], 'all');
    if( this.isEmailSAddressClicked ){
      const emailField = this.emailAddressForm.controls.email;
      if (this.emailAddressForm.dirty && this.emailAddressForm.valid) {
        this.assignContactDetails.emit( {
          email: emailField.value,
          notification_type: 'EMAIL'
        } );
      } else {
        if( emailField.value == '' ) {
          this.resetForm([true,false,false,false,false,false,false,false,false,false,false,false,false,false], 'email');
        }
        if(emailField.value != '' && emailField.invalid ) {
          this.resetForm([false,true,false,false,false,false,false,false,false,false,false,false,false,false], 'email');
        }
      }
    } else if( this.isPostcodeClicked && !this.isManualAddressClicked ) {
      this.postcodeValidation();
    } else if(this.isPostcodeClicked && this.isManualAddressClicked) {
      const fieldCtrls = this.manualAddressForm.controls;
      if (this.manualAddressForm.dirty && this.manualAddressForm.valid) {
        this.assignContactDetails.emit({
          address_line: fieldCtrls.addressl1.value+''+fieldCtrls.addressl2.value,
          city: fieldCtrls.townorcity.value,
          county: fieldCtrls.county.value,
          postal_code: fieldCtrls.mpostcode.value,
          country: fieldCtrls.country.value,
          notification_type: 'LETTER'
        });
      } else {
        if( fieldCtrls.addressl1.value == '' ) {
          this.resetForm([false,false,false,false,true,false,false,false,false,false,false,false,false,false], 'address1');
        }
        if(fieldCtrls.addressl1.value != '' && fieldCtrls.addressl1.invalid ) {
          this.resetForm([false,false,false,false,false,true,false,false,false,false,false,false,false,false], 'address1');
        }
        if(fieldCtrls.addressl2.value != '' && fieldCtrls.addressl2.invalid ) {
          this.resetForm([false,false,false,false,false,false,true,false,false,false,false,false,false,false], 'address2');
        }
        if( fieldCtrls.townorcity.value == '' ) {
          this.resetForm([false,false,false,false,false,false,false,true,false,false,false,false,false,false], 'town');
        }
        if(fieldCtrls.townorcity.value != '' && fieldCtrls.townorcity.invalid ) {
          this.resetForm([false,false,false,false,false,false,false,false,true,false,false,false,false,false], 'town');
        }
        if( fieldCtrls.county.value == '' ) {
          this.resetForm([false,false,false,false,false,false,false,false,false,true,false,false,false,false], 'county');
        }
        if(fieldCtrls.county.value != '' && fieldCtrls.county.invalid ) {
          this.resetForm([false,false,false,false,false,false,false,false,false,false,true,false,false,false], 'county');
        }
        if( fieldCtrls.mpostcode.value == '' ) {
          this.resetForm([false,false,false,false,false,false,false,false,false,false,false,true,false,false], 'mpostcode');
        }
        if(fieldCtrls.mpostcode.value != '' && fieldCtrls.mpostcode.invalid ) {
          this.resetForm([false,false,false,false,false,false,false,false,false,false,false,false,true,false], 'mpostcode');
        }
        if( fieldCtrls.country.value == '' ) {
          this.resetForm([false,false,false,false,false,false,false,false,false,false,false,false,false,true], 'country');
        }
      }

    }

  }
  postcodeValidation() {
    const postcodeField = this.postCodeForm.controls.postcode;
    if (this.postCodeForm.dirty && this.postCodeForm.valid) {
      this.assignContactDetails.emit({});
    } else {
      if( postcodeField.value == '' ) {
        this.resetForm([false,false,true,false,false,false,false,false,false,false,false,false,false], 'postcode');
      }
      if(postcodeField.value != '' && postcodeField.invalid ) {
        this.resetForm([false,false,false,true,false,false,false,false,false,false,false,false,false], 'postcode');
      }
    }
  }
  redirection() {
    this.redirectToIssueRefund.emit();
  }
  resetForm(val, field) {
    if(field==='email' || field==='all') {
      this.isEmailEmpty = val[0];
      this.emailHasError = val[1];
    }
    if(field==='postcode' || field==='all') {
      this.isPostcodeEmpty = val[2];
      this.postcodeHasError = val[3];
    }
    if(field==='address1' || field==='all') {
      this.isaddressLine1Empty = val[4];
      this.addressLine1HasError = val[5];
    }
    if(field==='address2' || field==='all') {
      this.addressLine2HasError = val[6];
    }
    if(field==='town' || field==='all') {
      this.isTownOrCityEmpty = val[7];
      this.townOrCityHasError = val[8];
    }
    if(field==='county' || field==='all') {
      this.isCountyEmpty = val[9];
      this.countyHasError = val[10];
    }
    if(field==='mpostcode' || field==='all') {
      this.isMPostcodeEmpty = val[11];
      this.mpostcodeHasError = val[12];
    }
    if(field==='country' || field==='all') {
      this.isCountryEmpty = val[13];
    }
  
  }
}

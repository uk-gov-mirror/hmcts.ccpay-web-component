import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.css']
})
export class PaymentViewComponent implements OnInit {

  payment = {
    'amount': '',
    'date_created': '',
    'date_updated': '',
    'currency': '',
    'ccd_case_number': '',
    'case_reference': '',
    'payment_reference': '',
    'channel': '',
    'method': '',
    'status': '',
    'site_id': '',
    'service_name': '',
    'payment_group_reference': '',
    'fees': []
  };
  constructor(private _httpClient: HttpClient) {
    // this.payment = {};
  }

  ngOnInit() {
    this.getUsersFromApi();
  }

  getUsersFromApi() {
    // this._httpClient.get('https://jsonplaceholder.typicode.com/users')
    //   .toPromise()
    //   .then(console.log);
    this.payment = {
      'amount': 400,
      'date_created': '2018-02-21T11:26:30.187+0000',
      'date_updated': '2018-02-21T11:26:30.187+0000',
      'currency': 'GBP',
      'ccd_case_number': 'case_no',
      'case_reference': 'case_reference',
      'payment_reference': 'ref1',
      'channel': 'online',
      'method': 'card',
      'status': 'Initiated',
      'site_id': 'site01',
      'service_name': 'cmc',
      'payment_group_reference': '4reference_21022018',
      'fees': [
        {
          'code': 'X004',
          'version': '1',
          'volume': 1
        },
        {
          'code': 'X006',
          'version': '2',
          'volume': 1
        },
        {
          'code': 'X0041',
          'version': '2',
          'volume': 1
        }
      ]
    };

    console.log(JSON.stringify(this.payment));
  }

}

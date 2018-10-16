import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';

import {PaymentListComponent} from './components/payment-list/payment-list.component';
import {PaymentViewComponent} from './components/payment-view/payment-view.component';
import {CardDetailsComponent} from './components/card-details/card-details.component';
import {PageNotFoundComponent} from './components/page-not-found.component';
import {PaymentLibComponent} from './payment-lib.component';
import { StatusHistoryComponent } from './components/status-history/status-history.component';
import { PbaDetailsComponent } from './components/pba-details/pba-details.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  declarations: [
    PaymentLibComponent,
    PaymentListComponent,
    PaymentViewComponent,
    CardDetailsComponent,
    PageNotFoundComponent,
    StatusHistoryComponent,
    PbaDetailsComponent
  ],
  exports: [ PaymentLibComponent ]
})

export class PaymentLibModule { }

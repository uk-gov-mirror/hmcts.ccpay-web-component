import { NgModule } from '@angular/core';
import { CaseListComponent } from './components/case-list/case-list.component';
import {BrowserModule} from '@angular/platform-browser';
import {PaymentListComponent} from './components/payment-list/payment-list.component';
import {PaymentViewComponent} from './components/payment-view/payment-view.component';
import {CardDetailsComponent} from './components/card-details/card-details.component';
import {PageNotFoundComponent} from './components/page-not-found.component';
import {HttpClientModule} from '@angular/common/http';
import {PaymentLibComponent} from './payment-lib.component';
import {PaymentLibRoutingModule} from './payment-lib-routing.module';
import { StatusHistoryComponent } from './components/status-history/status-history.component'

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    PaymentLibRoutingModule
  ],
  declarations: [
    PaymentLibComponent,
    CaseListComponent,
    PaymentListComponent,
    PaymentViewComponent,
    CardDetailsComponent,
    PageNotFoundComponent,
    StatusHistoryComponent
  ],
  exports: [ PaymentLibComponent ]
})

export class PaymentLibModule { }

import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';

import {PaymentListComponent} from './components/payment-list/payment-list.component';
import {PaymentViewComponent} from './components/payment-view/payment-view.component';
import {CardDetailsComponent} from './components/card-details/card-details.component';
import {PageNotFoundComponent} from './components/page-not-found.component';
import {PaymentLibComponent} from './payment-lib.component';
import { StatusHistoryComponent } from './components/status-history/status-history.component';
import { PbaDetailsComponent } from './components/pba-details/pba-details.component';
import { LoggerService } from './services/shared/logger/logger.service';
import { ConsoleLoggerService } from './services/shared/logger/console-logger.service';
import { CaseTransactionsComponent } from './components/case-transactions/case-transactions.component';
import { FeeSummaryComponent } from './components/fee-summary/fee-summary.component';
import { MarkUnidentifiedPaymentComponent } from './components/mark-unidentified-payment/mark-unidentified-payment.component';
import { MarkUnsolicitedPaymentComponent } from './components/mark-unsolicited-payment/mark-unsolicited-payment.component';
import { UnprocessedPaymentsComponent } from './components/unprocessed-payments/unprocessed-payments.component';
import { AddRemissionComponent } from './components/add-remission/add-remission.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CcdHyphensPipe } from './pipes/ccd-hyphens.pipe';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PaymentLibComponent,
    PaymentListComponent,
    PaymentViewComponent,
    CardDetailsComponent,
    PageNotFoundComponent,
    StatusHistoryComponent,
    MarkUnidentifiedPaymentComponent,
    MarkUnsolicitedPaymentComponent,
    UnprocessedPaymentsComponent,
    PbaDetailsComponent,
    CaseTransactionsComponent,
    FeeSummaryComponent,
    AddRemissionComponent,
    CcdHyphensPipe,
    SanitizeHtmlPipe
  ],
  exports: [ PaymentLibComponent ],
  providers: [ { provide: LoggerService, useClass: ConsoleLoggerService }]
})

export class PaymentLibModule { }

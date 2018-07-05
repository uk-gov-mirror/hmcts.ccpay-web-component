import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentViewComponent } from './payment-view/payment-view.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentListComponent,
    PaymentViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

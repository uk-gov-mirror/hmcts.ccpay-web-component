import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PaymentLibModule} from 'payment-lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PaymentLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

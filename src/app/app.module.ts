import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PaymentLibModule} from 'payment-lib';
import {PhaseBannerComponent} from './components/phase-banner/phase-banner.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CaseListComponent } from './components/case-list/case-list.component';
import { PaymentLibIntComponent } from './components/payment-lib-int/payment-lib-int.component';
import { AppRoutingModule } from './app-routing.module'

@NgModule({
  declarations: [
    AppComponent,
    PhaseBannerComponent,
    NavigationComponent,
    CaseListComponent,
    PaymentLibIntComponent
  ],
  imports: [
    BrowserModule,
    PaymentLibModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

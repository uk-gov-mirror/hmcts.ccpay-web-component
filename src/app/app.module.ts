import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PaymentLibModule} from 'payment-lib';
import {PhaseBannerComponent} from './components/phase-banner/phase-banner.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    PhaseBannerComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    PaymentLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

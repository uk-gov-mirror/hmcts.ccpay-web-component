import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {PaymentLibModule} from 'payment-lib';
import {PhaseBannerComponent} from './components/shared/phase-banner/phase-banner.component';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { CaseListComponent } from './components/case-list/case-list.component';
import { PaymentLibIntComponent } from './components/payment-lib-int/payment-lib-int.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { CcdSearchComponent } from './components/ccd-search/ccd-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PhaseBannerComponent,
    NavigationComponent,
    CaseListComponent,
    PaymentLibIntComponent,
    HeaderComponent,
    FooterComponent,
    CcdSearchComponent
  ],
  imports: [
    BrowserModule,
    PaymentLibModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

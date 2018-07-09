import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ShellComponent } from './components/home/shell.component';
import { MenuComponent } from './components/home/menu.component';
import { WelcomeComponent } from './components/home/welcome.component';
import { PageNotFoundComponent } from './components/home/page-not-found.component';
import { CaseListComponent } from './components/case-list/case-list.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { PaymentViewComponent } from './components/payment-view/payment-view.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    ShellComponent,
    MenuComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    CaseListComponent,
    PaymentListComponent,
    PaymentViewComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

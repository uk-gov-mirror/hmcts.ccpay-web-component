import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './components/page-not-found.component';
import { CaseListComponent } from './components/case-list/case-list.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import {PaymentViewComponent} from './components/payment-view/payment-view.component';
import {CardDetailsComponent} from './components/card-details/card-details.component';

const appRoutes: Routes = [
    { path: 'cases', component: CaseListComponent },
    { path: 'payments/:ccdCaseNumber', component: PaymentListComponent },
    { path: 'payment-view/:paymentReference', component: PaymentViewComponent },
    { path: 'card-details/:paymentReference', component: CardDetailsComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [RouterModule]
})
export class PaymentLibRoutingModule { }

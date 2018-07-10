import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShellComponent } from './components/home/shell.component';
import { PageNotFoundComponent } from './components/home/page-not-found.component';
import { CaseListComponent } from './components/case-list/case-list.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { PaymentListService } from './services/payment-list/payment-list.service';

import {PaymentListResolveGuard} from './guards/payment-list/payment-list-resolve.guard';
import {PaymentViewComponent} from './components/payment-view/payment-view.component';
import {CardDetailsComponent} from './components/card-details/card-details.component';

const appRoutes: Routes = [
    { path: '', component: ShellComponent },
    { path: 'cases', component: CaseListComponent },
    { path: 'payments/:paymentReference', component: PaymentListComponent },
    { path: 'payment-view/:paymentReference', component: PaymentViewComponent },
    { path: 'card-details/:paymentReference', component: CardDetailsComponent },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    providers: [ PaymentListService, PaymentListResolveGuard ],
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShellComponent } from './components/home/shell.component';
import { PageNotFoundComponent } from './components/home/page-not-found.component';
import { CaseListComponent } from './components/case-list/case-list.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { PaymentViewComponent } from './components/payment-view/payment-view.component';

import { PaymentListService } from './services/payment-list/payment-list.service';

import {PaymentListResolveGuard} from './guards/payment-list/payment-list-resolve.guard';

const appRoutes: Routes = [
    { path: '', component: ShellComponent },
    { path: 'cases', component: CaseListComponent },
    { path: 'cases/:caseNumber', component: PaymentListComponent },
    { path: 'payments/:paymentReference', component: PaymentViewComponent },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    providers: [ PaymentListService, PaymentListResolveGuard ],
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [RouterModule]
})
export class AppRoutingModule { }

import { Routes } from '@angular/router';
import { CaseListComponent } from './components/case-list/case-list.component';
import { PaymentLibIntComponent } from './components/payment-lib-int/payment-lib-int.component';
import { CcdSearchComponent } from './components/ccd-search/ccd-search.component';

export const appRoutes: Routes = [
  { path: 'cases', component: CaseListComponent },
  { path: 'ccd-search', component: CcdSearchComponent },
  { path: 'payment-lib-int/:ccdCaseNumber', component: PaymentLibIntComponent },
  { path: '', redirectTo: '/cases', pathMatch: 'full' }
];

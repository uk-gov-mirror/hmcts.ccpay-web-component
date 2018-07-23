import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseListComponent } from './components/case-list/case-list.component';
import { PaymentLibIntComponent } from './components/payment-lib-int/payment-lib-int.component';

const appRoutes: Routes = [
  { path: 'cases', component: CaseListComponent },
  { path: 'payment-lib-int/:ccdCaseNumber', component: PaymentLibIntComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

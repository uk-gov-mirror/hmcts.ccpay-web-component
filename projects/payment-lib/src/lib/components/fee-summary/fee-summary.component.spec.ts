import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FeeSummaryComponent } from './fee-summary.component';
import { HttpClientModule } from '@angular/common/http';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import { PaymentLibComponent } from '../../payment-lib.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('Fee Summary component', () => {
  let component: FeeSummaryComponent,
  fixture: ComponentFixture<FeeSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeeSummaryComponent],
      providers: [PaymentViewService, PaymentLibComponent,
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } }],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(FeeSummaryComponent);
    component = fixture.componentInstance;
  });

  // it('Should create', () => {
  //   expect(component).toBeTruthy();
  // });

});

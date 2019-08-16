import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BulkScaningPaymentService } from '../../services/bulk-scaning-payment/bulk-scaning-payment.service';
import { PaymentLibComponent } from '../../payment-lib.component';
import { UnprocessedPaymentsComponent } from './unprocessed-payments.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Unprocessed Payments Component', () => {
  let component: UnprocessedPaymentsComponent,
  fixture: ComponentFixture<UnprocessedPaymentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnprocessedPaymentsComponent],
      providers: [BulkScaningPaymentService, PaymentLibComponent,
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } }],
      imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(UnprocessedPaymentsComponent);
    component = fixture.componentInstance;
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });
});

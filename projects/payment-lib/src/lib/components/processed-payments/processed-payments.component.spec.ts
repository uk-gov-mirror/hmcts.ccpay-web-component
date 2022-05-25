import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BulkScaningPaymentService } from '../../services/bulk-scaning-payment/bulk-scaning-payment.service';
import { Router } from '@angular/router';
import { ProcessedPaymentsComponent } from './processed-payments.component';

describe('ProcessedPaymentsComponent', () => {
  let component: ProcessedPaymentsComponent;
  let fixture: ComponentFixture<ProcessedPaymentsComponent>;

  beforeEach(() => {
    const bulkScaningPaymentServiceStub = () => ({
      removeUnwantedString: (method, string) => ({})
    });
    const routerStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ProcessedPaymentsComponent],
      providers: [
        {
          provide: BulkScaningPaymentService,
          useFactory: bulkScaningPaymentServiceStub
        },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(ProcessedPaymentsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PaymentLibComponent } from '../../payment-lib.component';
import { BulkScaningPaymentService } from '../../services/bulk-scaning-payment/bulk-scaning-payment.service';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import { MarkUnsolicitedPaymentComponent } from './mark-unsolicited-payment.component';

describe('MarkUnsolicitedPaymentComponent', () => {
  let component: MarkUnsolicitedPaymentComponent;
  let fixture: ComponentFixture<MarkUnsolicitedPaymentComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({ group: object => ({}) });
    const paymentLibComponentStub = () => ({
      CCD_CASE_NUMBER: {},
      bspaymentdcn: {},
      ISSFENABLE: {},
      viewName: {},
      TAKEPAYMENT: {},
      ISBSENABLE: {}
    });
    const bulkScaningPaymentServiceStub = () => ({
      removeUnwantedString: (method, string) => ({}),
      postBSWoPGStrategic: postStrategicBody => ({ subscribe: f => f({}) }),
      patchBSChangeStatus: (dcn_reference, string) => ({
        subscribe: f => f({})
      }),
      getBSPaymentsByDCN: bspaymentdcn => ({ subscribe: f => f({}) })
    });
    const paymentViewServiceStub = () => ({
      getSiteID: () => ({ subscribe: f => f({}) }),
      postBSPayments: requestBody => ({ subscribe: f => f({}) }),
      postBSUnsolicitedPayments: reqBody => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MarkUnsolicitedPaymentComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: PaymentLibComponent, useFactory: paymentLibComponentStub },
        {
          provide: BulkScaningPaymentService,
          useFactory: bulkScaningPaymentServiceStub
        },
        { provide: PaymentViewService, useFactory: paymentViewServiceStub }
      ]
    });
    fixture = TestBed.createComponent(MarkUnsolicitedPaymentComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('reasonHasError has default value', () => {
    expect(component.reasonHasError).toEqual(false);
  });

  it('isReasonEmpty has default value', () => {
    expect(component.isReasonEmpty).toEqual(false);
  });

  it('reasonMinHasError has default value', () => {
    expect(component.reasonMinHasError).toEqual(false);
  });

  it('reasonMaxHasError has default value', () => {
    expect(component.reasonMaxHasError).toEqual(false);
  });

  it('responsibleOfficeHasError has default value', () => {
    expect(component.responsibleOfficeHasError).toEqual(false);
  });

  it('isResponsibleOfficeEmpty has default value', () => {
    expect(component.isResponsibleOfficeEmpty).toEqual(false);
  });

  it('isConfirmButtondisabled has default value', () => {
    expect(component.isConfirmButtondisabled).toEqual(false);
  });

  it('isContinueButtondisabled has default value', () => {
    expect(component.isContinueButtondisabled).toEqual(false);
  });

  it('isStrategicFixEnable has default value', () => {
    expect(component.isStrategicFixEnable).toEqual(true);
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     const formBuilderStub: FormBuilder = fixture.debugElement.injector.get(
  //       FormBuilder
  //     );
  //     const paymentViewServiceStub: PaymentViewService = fixture.debugElement.injector.get(
  //       PaymentViewService
  //     );
  //     spyOn(component, 'resetForm').and.callThrough();
  //     spyOn(component, 'getUnassignedPayment').and.callThrough();
  //     spyOn(component, 'getErrorMessage').and.callThrough();
  //     spyOn(formBuilderStub, 'group').and.callThrough();
  //     spyOn(paymentViewServiceStub, 'getSiteID').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.resetForm).toHaveBeenCalled();
  //     expect(component.getUnassignedPayment).toHaveBeenCalled();
  //     expect(component.getErrorMessage).toHaveBeenCalled();
  //     expect(formBuilderStub.group).toHaveBeenCalled();
  //     expect(paymentViewServiceStub.getSiteID).toHaveBeenCalled();
  //   });
  // });

  // describe('confirmPayments', () => {
  //   it('makes expected calls', () => {
  //     const bulkScaningPaymentServiceStub: BulkScaningPaymentService = fixture.debugElement.injector.get(
  //       BulkScaningPaymentService
  //     );
  //     const paymentViewServiceStub: PaymentViewService = fixture.debugElement.injector.get(
  //       PaymentViewService
  //     );
  //     spyOn(component, 'getErrorMessage').and.callThrough();
  //     spyOn(component, 'gotoCasetransationPage').and.callThrough();
  //     spyOn(
  //       bulkScaningPaymentServiceStub,
  //       'postBSWoPGStrategic'
  //     ).and.callThrough();
  //     spyOn(
  //       bulkScaningPaymentServiceStub,
  //       'patchBSChangeStatus'
  //     ).and.callThrough();
  //     spyOn(paymentViewServiceStub, 'postBSPayments').and.callThrough();
  //     spyOn(
  //       paymentViewServiceStub,
  //       'postBSUnsolicitedPayments'
  //     ).and.callThrough();
  //     component.confirmPayments();
  //     expect(component.getErrorMessage).toHaveBeenCalled();
  //     expect(component.gotoCasetransationPage).toHaveBeenCalled();
  //     expect(
  //       bulkScaningPaymentServiceStub.postBSWoPGStrategic
  //     ).toHaveBeenCalled();
  //     expect(
  //       bulkScaningPaymentServiceStub.patchBSChangeStatus
  //     ).toHaveBeenCalled();
  //     expect(paymentViewServiceStub.postBSPayments).toHaveBeenCalled();
  //     expect(
  //       paymentViewServiceStub.postBSUnsolicitedPayments
  //     ).toHaveBeenCalled();
  //   });
  // });

  // describe('saveAndContinue', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'resetForm').and.callThrough();
  //     component.saveAndContinue();
  //     expect(component.resetForm).toHaveBeenCalled();
  //   });
  // });

  // describe('getUnassignedPayment', () => {
  //   it('makes expected calls', () => {
  //     const bulkScaningPaymentServiceStub: BulkScaningPaymentService = fixture.debugElement.injector.get(
  //       BulkScaningPaymentService
  //     );
  //     spyOn(component, 'getErrorMessage').and.callThrough();
  //     spyOn(
  //       bulkScaningPaymentServiceStub,
  //       'getBSPaymentsByDCN'
  //     ).and.callThrough();
  //     component.getUnassignedPayment();
  //     expect(component.getErrorMessage).toHaveBeenCalled();
  //     expect(
  //       bulkScaningPaymentServiceStub.getBSPaymentsByDCN
  //     ).toHaveBeenCalled();
  //   });
  // });
});

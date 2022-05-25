import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PaymentLibService } from './payment-lib.service';
import { PaymentLibComponent } from './payment-lib.component';

describe('PaymentLibComponent', () => {
  let component: PaymentLibComponent;
  let fixture: ComponentFixture<PaymentLibComponent>;

  beforeEach(() => {
    const paymentLibServiceStub = () => ({
      setApiRootUrl: API_ROOT => ({}),
      setBulkScanApiRootUrl: bULKSCAN_API_ROOT => ({}),
      setRefundndsApiRootUrl: rEFUNDS_API_ROOT => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PaymentLibComponent],
      providers: [
        { provide: PaymentLibService, useFactory: paymentLibServiceStub }
      ]
    });
    fixture = TestBed.createComponent(PaymentLibComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     const paymentLibServiceStub: PaymentLibService = fixture.debugElement.injector.get(
  //       PaymentLibService
  //     );
  //     spyOn(paymentLibServiceStub, 'setApiRootUrl').and.callThrough();
  //     spyOn(paymentLibServiceStub, 'setBulkScanApiRootUrl').and.callThrough();
  //     spyOn(paymentLibServiceStub, 'setRefundndsApiRootUrl').and.callThrough();
  //     component.ngOnInit();
  //     expect(paymentLibServiceStub.setApiRootUrl).toHaveBeenCalled();
  //     expect(paymentLibServiceStub.setBulkScanApiRootUrl).toHaveBeenCalled();
  //     expect(paymentLibServiceStub.setRefundndsApiRootUrl).toHaveBeenCalled();
  //   });
  // });
});

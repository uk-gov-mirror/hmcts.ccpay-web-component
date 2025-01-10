import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StatusHistoryService } from '../../services/status-history/status-history.service';
import { StatusHistoryComponent } from './status-history.component';

describe('StatusHistoryComponent', () => {
  let component: StatusHistoryComponent;
  let fixture: ComponentFixture<StatusHistoryComponent>;

  beforeEach(() => {
    const statusHistoryServiceStub = () => ({
      getPaymentStatusesByReference: (paymentReference, paymentMethod) => ({
        subscribe: f => f({})
      })
    });
    const paymentLibComponentStub = () => ({
      paymentReference: {},
      paymentMethod: {}
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [],
      providers: [
        { provide: StatusHistoryService, useFactory: statusHistoryServiceStub },
        { provide: 'PAYMENT_LIB', useFactory: paymentLibComponentStub }
      ]
    });
    fixture = TestBed.createComponent(StatusHistoryComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`pageTitle has default value`, () => {
    expect(component.pageTitle).toEqual(`Payment status history`);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const statusHistoryServiceStub: StatusHistoryService = fixture.debugElement.injector.get(
        StatusHistoryService
      );
      spyOn(
        statusHistoryServiceStub,
        'getPaymentStatusesByReference'
      ).and.callThrough();
      component.ngOnInit();
      expect(
        statusHistoryServiceStub.getPaymentStatusesByReference
      ).toHaveBeenCalled();
    });
  });
});

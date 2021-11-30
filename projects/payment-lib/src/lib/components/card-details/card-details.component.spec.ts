import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CardDetailsService } from '../../services/card-details/card-details.service';
import { PaymentLibComponent } from '../../payment-lib.component';
import { CardDetailsComponent } from './card-details.component';

describe('CardDetailsComponent', () => {
  let component: CardDetailsComponent;
  let fixture: ComponentFixture<CardDetailsComponent>;

  beforeEach(() => {
    const cardDetailsServiceStub = () => ({
      getCardDetails: paymentReference => ({ subscribe: f => f({}) })
    });
    const paymentLibComponentStub = () => ({ paymentReference: {} });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CardDetailsComponent],
      providers: [
        { provide: CardDetailsService, useFactory: cardDetailsServiceStub },
        { provide: PaymentLibComponent, useFactory: paymentLibComponentStub }
      ]
    });
    fixture = TestBed.createComponent(CardDetailsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`pageTitle has default value`, () => {
    expect(component.pageTitle).toEqual(`Card details`);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const cardDetailsServiceStub: CardDetailsService = fixture.debugElement.injector.get(
        CardDetailsService
      );
      spyOn(cardDetailsServiceStub, 'getCardDetails').and.callThrough();
      component.ngOnInit();
      expect(cardDetailsServiceStub.getCardDetails).toHaveBeenCalled();
    });
  });
});

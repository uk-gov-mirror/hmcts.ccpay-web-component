import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkUnsolicitedPaymentComponent } from './mark-unsolicited-payment.component';

describe('MarkUnsolicitedPaymentComponent', () => {
  let component: MarkUnsolicitedPaymentComponent;
  let fixture: ComponentFixture<MarkUnsolicitedPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkUnsolicitedPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkUnsolicitedPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

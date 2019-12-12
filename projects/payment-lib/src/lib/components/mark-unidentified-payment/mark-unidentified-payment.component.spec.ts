import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkUnidentifiedPaymentComponent } from './mark-unidentified-payment.component';

describe('MarkUnidentifiedPaymentComponent', () => {
  let component: MarkUnidentifiedPaymentComponent;
  let fixture: ComponentFixture<MarkUnidentifiedPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkUnidentifiedPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkUnidentifiedPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentLibIntComponent } from './payment-lib-int.component';

describe('PaymentLibIntComponent', () => {
  let component: PaymentLibIntComponent;
  let fixture: ComponentFixture<PaymentLibIntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentLibIntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentLibIntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

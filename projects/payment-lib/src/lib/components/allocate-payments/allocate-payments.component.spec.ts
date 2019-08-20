import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocatePaymentsComponent } from './allocate-payments.component';

describe('MarkUnidentifiedPaymentComponent', () => {
  let component: AllocatePaymentsComponent;
  let fixture: ComponentFixture<AllocatePaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocatePaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocatePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

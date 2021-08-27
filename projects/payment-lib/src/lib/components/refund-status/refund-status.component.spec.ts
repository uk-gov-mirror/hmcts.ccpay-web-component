import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundStatusComponent } from './refund-status.component';

describe('RefundStatusComponent', () => {
  let component: RefundStatusComponent;
  let fixture: ComponentFixture<RefundStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

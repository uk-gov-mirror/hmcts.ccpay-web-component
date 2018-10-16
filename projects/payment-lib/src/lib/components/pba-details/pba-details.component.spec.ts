import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PbaDetailsComponent } from './pba-details.component';

describe('PbaDetailsComponent', () => {
  let component: PbaDetailsComponent;
  let fixture: ComponentFixture<PbaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PbaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PbaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcdSearchComponent } from './ccd-search.component';

describe('CcdSearchComponent', () => {
  let component: CcdSearchComponent;
  let fixture: ComponentFixture<CcdSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcdSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcdSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

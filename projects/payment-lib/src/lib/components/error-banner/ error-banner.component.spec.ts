import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ErrorBannerComponent } from './error-banner.component';
import { HttpClientModule } from '@angular/common/http';
import { PaymentViewService } from '../../services/payment-view/payment-view.service';
import { PaymentLibComponent } from '../../payment-lib.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('Error Banner component', () => {
  let component: ErrorBannerComponent,
  fixture: ComponentFixture<ErrorBannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorBannerComponent],
      providers: [PaymentViewService, PaymentLibComponent,
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } }],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(ErrorBannerComponent);
    component = fixture.componentInstance;
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

});

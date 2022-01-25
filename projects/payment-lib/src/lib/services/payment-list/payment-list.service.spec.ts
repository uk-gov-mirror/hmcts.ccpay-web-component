import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { PaymentLibService } from '../../payment-lib.service';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { LoggerService } from '../shared/logger/logger.service';
import { PaymentListService } from './payment-list.service';

describe('PaymentListService', () => {
  let service: PaymentListService;

  beforeEach(() => {
    const paymentLibServiceStub = () => ({ API_ROOT: {} });
    const errorHandlerServiceStub = () => ({ handleError: {} });
    const loggerServiceStub = () => ({ info: (string, ccdCaseNumber) => ({}) });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PaymentListService,
        { provide: PaymentLibService, useFactory: paymentLibServiceStub },
        { provide: ErrorHandlerService, useFactory: errorHandlerServiceStub },
        { provide: LoggerService, useFactory: loggerServiceStub }
      ]
    });
    service = TestBed.get(PaymentListService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});

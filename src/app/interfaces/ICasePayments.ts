import { IPayment } from './IPayment';

export interface  ICasePayments {
    'caseNumber': string;
    'payments': IPayment[];
}

import { IPayment } from './IPayment';
import { IFee } from './IFee';
import { IPaymentHistory } from './IPaymentHistory';
import { ICardDetails } from './ICardDetails';

export interface IPaymentDetails {
    'payment': IPayment;
    'fees': IFee;
    'cardDetails': ICardDetails;
    'paymentHistories': IPaymentHistory[];
    'caseNumber': string;
}

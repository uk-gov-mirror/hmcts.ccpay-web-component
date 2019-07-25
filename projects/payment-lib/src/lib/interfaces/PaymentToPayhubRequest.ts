import { IFee } from './IFee';

export class PaymentToPayhubRequest {
  currency = 'GBP';
  site_id = 'AA02';
  description = 'PayBubble payment';
  channel = 'telephony';
  provider = 'pci pal';
  service = 'DIVORCE';

  ccd_case_number: string;
  amount: number;

  constructor(ccd_case_number: string, amount: number) {
    this.ccd_case_number = ccd_case_number;
    this.amount = amount;
  }
}

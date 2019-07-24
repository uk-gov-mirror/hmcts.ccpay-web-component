import { IFee } from './IFee';

export class PaymentToPayhubRequest {
  currency = 'GBP';
  site_id = 'AA02';
  description = 'PayBubble payment';
  channel = 'telephony';
  provider = 'pci_pal';
  service = 'DIVORCE';

  ccd_case_number: string;
  fees: IFee[];
  amount: number;

  constructor(ccd_case_number: string, fee: IFee[], amount: number) {
    this.ccd_case_number = ccd_case_number;
    this.fees = fee;
    this.amount = amount;
  }
}

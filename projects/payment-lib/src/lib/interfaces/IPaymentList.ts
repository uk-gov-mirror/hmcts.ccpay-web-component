import {IFee} from './IFee';

export class IPaymentList {
  amount: number;
  case_reference: string;
  ccd_case_number: string;
  channel = 'telephony';
  currency = 'GBP';
  description = 'PayBubble payment';
  fees: IFee[];
  Language = 'EN';
  provider = 'pci pal';
  service: string;
  site_id: string;

  constructor(res: any) {
  this.amount = <any>res[0].toFixed(2);;
  this.case_reference= res[1];
  this.ccd_case_number= res[2];
  this.fees= res[3];
  this.service= res[4];
  this.site_id= res[5];
  }
}

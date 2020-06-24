import {IFee} from './IFee';

export class IPaymentList {
  amount: number;
  case_reference: string;
  ccd_case_number: string;
  channel: string;
  currency: string;
  description: string;
  fees: IFee[];
  Language: string;
  provider: string;
  service: string;
  site_id: string;

  constructor(res: any) {
  this.amount = res[0];
  this.case_reference= res[1];
  this.ccd_case_number= res[2];
  this.channel= res[3];
  this.currency= res[4];
  this.description= res[5];
  this.fees= res[6];
  this.Language= res[7];
  this.provider= res[8];
  this.service= res[9];
  this.site_id= res[10];
  }
}

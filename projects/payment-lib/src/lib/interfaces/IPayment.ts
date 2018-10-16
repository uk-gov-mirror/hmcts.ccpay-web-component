import {IFee} from './IFee';

export interface IPayment {
  amount: number;
  description: string;
  reference: string;
  currency: string;
  date_created: string;
  date_updated: string;
  ccd_case_number: string;
  case_reference: string;
  channel: string;
  method: string;
  external_provider: string;
  status: string;
  external_reference: string;
  site_id: string;
  service_name: string;
  account_number: string;
  customer_reference: string;
  organisation_name: string;
  fees: IFee[];
}

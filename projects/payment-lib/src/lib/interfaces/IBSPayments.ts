import { IBSDate } from './IBSDate';

export interface IBSPayments {
  id?:string;
  dcn_reference?: string,
  bgc_reference?: string,
  amount?: number,
  currency?: string,
  payment_method?: string,
  outbound_batch_number?: string,
  dcn_case?: string,
  case_reference?: string,
  po_box?: string,
  first_cheque_dcn_in_batch?: string,
  payer_name?: string,
  date_banked?: IBSDate,
  date_created?: IBSDate,
  date_updated?: IBSDate,
  length?: number
}

import { IFee } from './IFee';

export class AddRemissionRequest {
  beneficiary_name: string;
  ccd_case_number: string;
  fee: IFee;
  hwf_amount: number;
  hwf_reference: string;
  payment_group_reference: string;
  case_type: string;
  retro_remission: boolean;

  constructor(ccd_case_number: string, fee: IFee, hwf_amount: number, hwf_reference: string, caseType: string, retro_remission: boolean) {
    this.ccd_case_number = ccd_case_number;
    this.fee = fee;
    this.hwf_amount = hwf_amount;
    this.hwf_reference = hwf_reference;
    this.case_type = caseType;
    this.retro_remission = retro_remission;
  }
}

import { IFee } from "./IFee";

export class PostRefundRetroRemission {
  ccd_case_number: string;
  payment_reference: string;
  refund_reason: string;
  payment_method: string;
  payment_status: string;
  refund_amount: any;
  fees: any[];
  
    constructor(ccd_case_number: string, payment_reference : string, refund_reason : string, payment_method: string, 
		payment_status: string, refund_amount: any, fees: any[]) {
	  this.ccd_case_number = ccd_case_number;
      this.payment_reference= payment_reference;
      this.refund_reason = refund_reason;
	  this.payment_method = payment_method;
	  this.payment_status = payment_status;
	  this.refund_amount = refund_amount;
	  this.fees = fees;
    } 
}
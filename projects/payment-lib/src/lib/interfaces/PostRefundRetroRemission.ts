import { IFee } from "./IFee";
import { IRefundContactDetails } from "./IRefundContactDetails";

export class PostRefundRetroRemission {
  ccd_case_number: string;
  payment_reference: string;
  refund_reason: string;
  refund_amount: any;
  fees: IFee;
  contact_details: IRefundContactDetails
  
    constructor(ccd_case_number: string, payment_reference : string, refund_reason : string, refund_amount: any, fees: IFee,contact_details:any) {
	  this.ccd_case_number = ccd_case_number;
    this.payment_reference= payment_reference;
    this.refund_reason = refund_reason;
	  this.refund_amount = refund_amount;
	  this.fees = fees;
    this.contact_details = contact_details;
    } 
}
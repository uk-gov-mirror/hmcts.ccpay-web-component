import { IFee } from "./IFee";
import { IRefundContactDetails } from "./IRefundContactDetails";

export class PostRefundRetroRemission {
  ccd_case_number: string;
  payment_reference: string;
  refund_reason: string;
  total_refund_amount: any;
  fees: any[];
  contact_details: IRefundContactDetails
  
    constructor(ccd_case_number: string, payment_reference : string, total_refund_amount : string, refund_amount: any, fees: any[],contact_details:any) {
	  this.ccd_case_number = ccd_case_number;
    this.payment_reference= payment_reference;
    this.refund_reason = total_refund_amount;
	  this.total_refund_amount = refund_amount;
	  this.fees = fees;
    this.contact_details = contact_details;
    } 
}
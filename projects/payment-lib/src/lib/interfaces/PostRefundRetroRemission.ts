import { IFee } from "./IFee";
import { IRefundContactDetails } from "./IRefundContactDetails";

export class PostRefundRetroRemission {
  ccd_case_number: string;
  payment_reference: string;
  refund_reason: string;
  total_refund_amount: any;
  fees: any[];
  contact_details: IRefundContactDetails
  
    constructor(contact_details:any,fees: any[], payment_reference : string,refund_reason:string, total_refund_amount :  any ) {
      this.contact_details = contact_details;
      this.fees = fees;
      this.payment_reference= payment_reference;
      this.refund_reason = refund_reason;
	    this.total_refund_amount = total_refund_amount;
    } 
}
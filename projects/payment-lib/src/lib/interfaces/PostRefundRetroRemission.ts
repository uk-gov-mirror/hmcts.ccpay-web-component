import { IFee } from "./IFee";
import { IRefundContactDetails } from "./IRefundContactDetails";

export class PostRefundRetroRemission {
  payment_reference: string;
  refund_reason: string;
  contact_details: IRefundContactDetails
  
    constructor(payment_reference : string, refund_reason : string, contactDeatils: any) {
      this.payment_reference= payment_reference;
      this.refund_reason = refund_reason;
      this.contact_details = contactDeatils;

    } 
}
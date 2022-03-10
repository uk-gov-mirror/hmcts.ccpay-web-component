import { IRefundContactDetails } from "./IRefundContactDetails";
export class IResubmitRefundRequest {
  refund_reason: string;
  amount: number;
  contact_details: IRefundContactDetails
  
    constructor(refund_reason : string, amount: number,contact_details:any) {
      this.refund_reason= refund_reason;
      this.amount = amount;
      this.contact_details = contact_details;
    } 
  }
  
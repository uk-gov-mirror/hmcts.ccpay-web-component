export class IssueRefundRequest {
  payment_reference: string;
  refund_reason: string
    refund_amount: number
  
    constructor(payment_reference : string,  refund_reason : string, refund_amount: number) {
      this.payment_reference= payment_reference;
      this.refund_reason= refund_reason;
      this.refund_amount = refund_amount;
  
    } 
  }
  
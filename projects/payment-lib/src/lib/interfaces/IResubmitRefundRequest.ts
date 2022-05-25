export class IResubmitRefundRequest {
  refund_reason: string;
  amount: number;
  
  
    constructor(refund_reason : string, amount: number) {
      this.refund_reason= refund_reason;
      this.amount = amount;
  
    } 
  }
  
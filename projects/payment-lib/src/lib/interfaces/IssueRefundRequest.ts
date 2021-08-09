export class IssueRefundRequest {
    paymentReference: string;
    refundReason: string
    refundAmount: number
  
    constructor(paymentReference : string,  refundReason : string, refundAmount: number) {
      this.paymentReference= paymentReference;
      this.refundReason= refundReason;
      this.refundAmount = refundAmount;
  
    } 
  }
  
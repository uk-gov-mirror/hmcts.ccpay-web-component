export class PostRefundRetroRemission {
    paymentReference: string;
    refundReason: string;
  
    constructor(paymentReference : string, refundReason : string) {
      this.paymentReference= paymentReference;
      this.refundReason = refundReason;
    } 
}
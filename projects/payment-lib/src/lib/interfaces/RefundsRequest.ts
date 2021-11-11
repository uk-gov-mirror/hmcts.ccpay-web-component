
export class RefundsRequest {
    payment_reference: string;
    refund_reason: string
  
    constructor(payment_reference : string,  refund_reason : string) {
      this.payment_reference= payment_reference;
      this.refund_reason= refund_reason;
  
    } 
  }
  
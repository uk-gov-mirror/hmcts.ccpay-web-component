export class PostRefundRetroRemission {
  payment_reference: string;
  refund_reason: string;
  contact_details: {
    address_line?: string;
    city?: string;
    country?: string;
    county?: string;
    email?: string;
    notification_type: string;
    postal_code?: string;
    template_id: string;
  }
  
    constructor(payment_reference : string, refund_reason : string, contactDeatils: any) {
      this.payment_reference= payment_reference;
      this.refund_reason = refund_reason;
      this.contact_details = contactDeatils;

    } 
}
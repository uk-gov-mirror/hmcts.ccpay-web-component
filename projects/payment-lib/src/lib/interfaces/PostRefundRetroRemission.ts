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
      if(contactDeatils.notificationType === 'EMAIL') {
        this.contact_details.email = contactDeatils.email;
      } else if(contactDeatils.notificationType === 'LETTER') {
        this.contact_details.address_line = contactDeatils.address.address1;
        this.contact_details.city = contactDeatils.address.town;
        this.contact_details.country = contactDeatils.address.country;
        this.contact_details.county = contactDeatils.address.county;
        this.contact_details.postal_code = contactDeatils.address.mpostcode;
      }
      this.contact_details.notification_type = contactDeatils.notificationType;

    } 
}
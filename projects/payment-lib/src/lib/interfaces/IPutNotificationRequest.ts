import { IRefundContactDetails } from './IRefundContactDetails';

export class IPutNotificationRequest {
  recipient_email_address: string;
  recipient_postal_address: IRefundContactDetails
  
    constructor(email_address : string, contactDeatils: any) {
      this.recipient_email_address = email_address;
      this.recipient_postal_address = contactDeatils;

    } 
}
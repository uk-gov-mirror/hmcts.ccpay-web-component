
export class UnsolicitedPaymentsRequest {
  payment_allocation_status: any;
  payment_group_reference: string;
  payment_reference: string;
  receiving_office: string;
  receiving_email_address: string;
  sending_email_address: string;
  unidentified_reason: string;
  constructor(payment_group_reference: string, payment_reference : string, reason: string,responsible_office: string, responsible_person:string,email_id: string) {
    this.payment_allocation_status = {
    description: '',
    name: "Transferred"
    };
    this.payment_group_reference = payment_group_reference;
    this.payment_reference= payment_reference;
    this.unidentified_reason= reason;
    this.receiving_office= responsible_office;
    this.receiving_email_address= email_id;
    this.sending_email_address= responsible_person;
  }
}

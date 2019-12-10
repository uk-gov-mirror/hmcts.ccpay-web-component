
export class UnidentifiedPaymentsRequest {
  payment_allocation_status: any;
  payment_group_reference: string;
  payment_reference: string;
  unidentified_reason: string;

  constructor(payment_group_reference: string, payment_reference : string, unidentified_reason: any) {
    this.payment_allocation_status = {
      description: '',
      name: "Unidentified"
    };
    this.payment_group_reference = payment_group_reference ;
    this.payment_reference= payment_reference;
    this.unidentified_reason= unidentified_reason;

  }



}

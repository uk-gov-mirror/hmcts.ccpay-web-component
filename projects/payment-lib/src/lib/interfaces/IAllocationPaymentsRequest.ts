
export class IAllocationPaymentsRequest {
  payment_allocation_status: any;
  payment_group_reference: string;
  payment_reference: string;

  constructor(payment_group_reference: string, payment_reference : string) {
    this.payment_allocation_status = {
      description: '',
      name: "Allocated"
    };
    this.payment_group_reference = payment_group_reference;
    this.payment_reference= payment_reference;

  }



}

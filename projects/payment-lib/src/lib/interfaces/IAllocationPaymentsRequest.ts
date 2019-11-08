
export class IAllocationPaymentsRequest {
  payment_allocation_status: any;
  payment_group_reference: string;
  payment_reference: string;
  reason: string;
  explanation: string;
  user_name: string;
  constructor(payment_group_reference: string, payment_reference : string, reason? : string, explanation? : string, userName? : string) {
    this.payment_allocation_status = {
      description: '',
      name: "Allocated"
    };
    this.payment_group_reference = payment_group_reference;
    this.payment_reference= payment_reference;
    this.reason = reason ? reason : null;
    this.explanation = explanation ? explanation : null;
    this.user_name = userName ? userName : null;
  }
}

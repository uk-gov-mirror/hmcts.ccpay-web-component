export class AddRetroRemissionRequest {
  hwf_amount: number;
  hwf_reference: string;

  constructor(hwf_amount: number, hwf_reference: string) {
    this.hwf_amount = hwf_amount;
    this.hwf_reference = hwf_reference;
  }
}

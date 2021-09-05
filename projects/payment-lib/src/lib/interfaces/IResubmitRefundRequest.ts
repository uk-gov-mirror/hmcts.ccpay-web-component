export class IResubmitRefundRequest {
  reason: string;
  status: string;
  
  
    constructor(reason : string, status: string) {
      this.reason= reason;
      this.status = status;
  
    } 
  }
  
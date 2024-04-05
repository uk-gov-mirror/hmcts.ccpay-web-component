export class IserviceRequestCardPayment {
    amount: string
    currency: string
    language: string
    
    constructor(amount : string, language : string) {
        this.amount = amount;
        this.currency = 'GBP';
        this.language = language;
    } 
}
    
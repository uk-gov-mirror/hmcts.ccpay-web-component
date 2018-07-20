import { Component, OnInit } from '@angular/core';
import { CardDetailsService } from '../../services/card-details/card-details.service';
import {ActivatedRoute} from '@angular/router';
import {ICardDetails} from '../../interfaces/ICardDetails';

@Component({
  selector: 'ccpay-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {
  pageTitle: string = 'Card details';
  cardDetails: ICardDetails;
  paymentReference: string;
  errorMessage: string;

  constructor(private cardDetailsService: CardDetailsService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.paymentReference = params.paymentReference;
      this.cardDetailsService.getCardDetails(params.paymentReference).subscribe(
        cardDetails => this.cardDetails = cardDetails,
        (error: any) => this.errorMessage = <any>error
      );
    });
  }

  get getPaymentReference(): string {
    return this.paymentReference;
  }

}

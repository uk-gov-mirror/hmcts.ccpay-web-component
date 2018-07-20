import { Component, OnInit } from '@angular/core';
import { IStatusHistories } from '../../interfaces/IStatusHistories'
import { ActivatedRoute } from '@angular/router'
import { StatusHistoryService } from '../../services/status-history/status-history.service'

@Component({
  selector: 'ccpay-payment-statuses',
  templateUrl: './status-history.component.html',
  styleUrls: ['./status-history.component.css']
})
export class StatusHistoryComponent implements OnInit {
  pageTitle: string = 'Status histories';
  statuses: IStatusHistories;
  errorMessage: string;

  constructor(private statusHistoryService: StatusHistoryService,
              private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.params.subscribe((params) => {
      console.log('Status histories component: ', params.paymentReference);
      this.statusHistoryService.getPaymentStatusesByReference(params.paymentReference).subscribe(
        statuses => this.statuses = statuses,
        (error: any) => this.errorMessage = <any>error
      );
    });
  }

}

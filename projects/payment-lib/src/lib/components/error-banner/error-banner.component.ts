import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ccpay-error-banner',
    templateUrl: './error-banner.component.html',
    styleUrls: ['./error-banner.component.scss'],
    standalone: true,
    imports: [CommonModule]
})

export class ErrorBannerComponent implements OnInit {
  @Input('errorMessage') errorMessage;

  constructor(
  ) {}

  ngOnInit() {

  }
}

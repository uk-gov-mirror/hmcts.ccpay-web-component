import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pageTitle = 'Payment-web-component';
  API_ROOT = 'http://localhost:9999';
  type = 'BETA';
}

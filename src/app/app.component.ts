import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { PhaseBannerComponent } from './components/shared/phase-banner/phase-banner.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
        RouterOutlet,
        PhaseBannerComponent,
        HeaderComponent,
        FooterComponent
    ]
})
export class AppComponent {
  pageTitle = 'Payment-web-component';
  type = 'BETA';

  constructor(private router: Router) {
    this.router.navigate(['/cases']);
  }
}

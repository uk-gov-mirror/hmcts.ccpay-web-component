import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RpxTranslationModule } from 'rpx-xui-translation';

import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { appRoutes } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      RpxTranslationModule.forRoot({
        baseUrl: '/api/translation',
        debounceTimeMs: 300,
        validity: {
          days: 1
        },
        testMode: false
      })
    )
  ]
}).catch(err => console.log(err));

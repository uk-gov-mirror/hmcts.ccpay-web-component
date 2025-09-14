import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Meta } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebComponentHttpClient {
  constructor(
    private http: HttpClient,
    private meta: Meta
  ) { }

  post(url: string, body: any | null, options?: any): Observable<any> {
    const opts = this.addHeaders(options || {});
    return this.http.post(url, body, opts);
  }

  put(url: string, body: any | null, options?: any): Observable<any> {
    const opts = this.addHeaders(options || {});
    return this.http.put(url, body, opts);
  }

  get(url: string, options?: any): Observable<any> {
    const opts = this.addHeaders(options || {});
    return this.http.get(url, opts);
  }

  delete(url: string, options?: any): Observable<any> {
    const opts = this.addHeaders(options || {});
    return this.http.delete(url, opts);
  }
  
  patch(url: string, body: any | null, options?: any): Observable<any> {
    const opts = this.addHeaders(options || {});
    return this.http.patch(url, body, opts);
  }

  addHeaders(options: any): any {
    const csrfToken = this.meta.getTag('name=csrf-token');
    const headers = {};
    
    if (options.headers) {
      options.headers.forEach(element => {
        headers[element] = options.headers.get(element);
      });
    }
    headers['X-Requested-With'] = 'XMLHttpRequest';
    
    // CSRF Token handling with proper error checking
    let csrfTokenValue = null;
    
    if (csrfToken && csrfToken.content) {
      // Primary: Get CSRF token from meta tag
      csrfTokenValue = csrfToken.content;
      console.log('WebComponentHttpClient: Using CSRF token from meta tag:', csrfTokenValue);
    } else {
      // Fallback: Get CSRF token from cookie
      try {
        const xsrfCookie = document.cookie.split(';').find(row => row.trim().startsWith('XSRF-TOKEN'));
        if (xsrfCookie) {
          csrfTokenValue = xsrfCookie.split('=')[1];
          console.log('WebComponentHttpClient: Using CSRF token from XSRF-TOKEN cookie:', csrfTokenValue);
        } else {
          console.warn('WebComponentHttpClient: No CSRF token found in meta tag or XSRF-TOKEN cookie');
        }
      } catch (error) {
        console.error('WebComponentHttpClient: Error parsing XSRF-TOKEN cookie:', error);
      }
    }
    
    if (csrfTokenValue) {
      headers['CSRF-Token'] = csrfTokenValue;
    } else {
      console.warn('WebComponentHttpClient: No CSRF token available for request');
    }
    
    options.headers = new HttpHeaders(headers);
    options.responseType = 'text';
    return options;
  }
}

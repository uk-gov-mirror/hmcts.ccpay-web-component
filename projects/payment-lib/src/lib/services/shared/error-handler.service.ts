import { Injectable } from '@angular/core';
import { _throw } from 'rxjs/observable/throw';
import { Observable } from 'rxjs/internal/Observable';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class ErrorHandlerService {

  constructor() { }


  handleError(err: HttpErrorResponse): Observable<any> {
    let errorMessage: string;
    if (err.error instanceof Error) {
      // A client-side or network error occurred.
      console.log('An error occurred: ', JSON.stringify(err));
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      console.log('Backend status error: ', err.status);
      console.error('Backend error: ', err.error);
      errorMessage = `${err.error}`;
    }
    return _throw(errorMessage);
  }
}

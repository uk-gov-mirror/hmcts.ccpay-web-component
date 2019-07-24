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
    console.log('handle Error:');
    console.log(err);
    let errorMessage: string;
    if (err.error instanceof Error) {
      // A client-side or network error occurred.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      if (err.status === 404) {
        if (!err.error) {
          errorMessage = 'Not found';
        } else {
          errorMessage = err.error;
        }
      } else if (err.error.messsage === undefined) {
        errorMessage = 'Server error';
      } else {
        errorMessage = `${err.error.message}`;
      }
    }
    return _throw(errorMessage);
  }
}

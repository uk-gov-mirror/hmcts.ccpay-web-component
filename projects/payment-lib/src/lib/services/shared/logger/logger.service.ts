import { Injectable } from '@angular/core';

const noop = (): any => undefined;

export abstract class Logger {

  info: any;
  warn: any;
  error: any;
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService implements Logger {

  info = (message?: any, ...optionalParams: any[]): void => {
    console.log(message, ...optionalParams);
  };
  warn = (message?: any, ...optionalParams: any[]): void => {
    console.warn(message, ...optionalParams);
  };
  error = (message?: any, ...optionalParams: any[]): void => {
    console.error(message, ...optionalParams);
  };

  invokeConsoleMethod(type: string, args?: any): void {}
}

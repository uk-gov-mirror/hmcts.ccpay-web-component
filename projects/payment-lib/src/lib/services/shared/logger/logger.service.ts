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

  info: any;
  warn: any;
  error: any;

  invokeConsoleMethod(type: string, args?: any): void {}
}

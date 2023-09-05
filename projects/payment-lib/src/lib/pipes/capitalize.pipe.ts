import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'capitalize',
  standalone: true
})
export class CapitalizePipe implements PipeTransform {
  constructor() { }
  transform(s: any, args?: any): any {
    return s && s[0].toUpperCase() + s.slice(1) || "";
  }
}

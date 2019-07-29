import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'addHyphens'
})
export class AddHyphensPipe implements PipeTransform {
  constructor() {}
  transform(value: any, args?: any): any {
    const pattern = /^([0-9]{4})+([0-9]{4})+([0-9]{4})+([0-9]{4})$/;
    if ( value.match(pattern)) {
      return value.replace(pattern,'$1-$2-$3-$4')  
    }
    return value;
  }
}

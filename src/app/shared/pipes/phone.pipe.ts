import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneDecor'
})
export class PhonePipe implements PipeTransform {

  transform(value: string): string {

    return value.slice(0, 2) + ' (' + value.slice(2, 5) + ') ' + value.slice(5, 8) + '-' + value.slice(8, 10) + '-' + value.slice(10, 12);
  }

}

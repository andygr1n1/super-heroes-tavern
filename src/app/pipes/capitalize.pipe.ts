import { capitalize } from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string, args?: any): string {
    return capitalize(value.toString());
  }
}

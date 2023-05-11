import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'decryptPassword'
})
export class DecryptPasswordPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  transform(value: string): string {
    const length = value.length;
    let display = '';
    for (let i = 0; i < length; i++) {
      display += '\u25CF'; // Add a circle character
    }
    return display;
  }
}

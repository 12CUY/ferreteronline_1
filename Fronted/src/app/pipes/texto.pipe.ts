import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'texto'
})
export class TextoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

//pipe para mayuscular 

@Pipe({
  name: 'mayusculas'
})
export class MayusculasH3Pipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      return `<h3>${value.toUpperCase()}</h3>`;
    }
    return value;
  }
}

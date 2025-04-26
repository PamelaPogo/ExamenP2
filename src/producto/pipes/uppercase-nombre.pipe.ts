import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class UppercaseNombrePipe implements PipeTransform {
  transform(value: any) {
    if (value.nombre) {
      value.nombre = value.nombre.toUpperCase();
    }
    return value;
  }
}

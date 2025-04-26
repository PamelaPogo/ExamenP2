import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ProductoService } from '../../producto/producto.service';

@Injectable()
export class ValidateProductIdsPipe implements PipeTransform {
  constructor(private readonly productoService: ProductoService) {}

  async transform(value: any) {
    const ids = value.productos.map(p => p.id);
    const productos = await this.productoService.findByIds(ids);

    if (productos.length !== ids.length) {
      throw new BadRequestException('Uno o más productos no existen.');
    }

    return value;
  }
}

import { Module, forwardRef } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { ProductoModule } from '../producto/producto.module';
import { ValidateProductIdsPipe } from './pipes/validate-product-ids.pipe';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido]),
    forwardRef(() => ProductoModule),
  ],
  controllers: [PedidoController],
  providers: [PedidoService, ValidateProductIdsPipe],
})
export class PedidoModule {}

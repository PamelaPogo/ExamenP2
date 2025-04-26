import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoModule } from './pedido/pedido.module';
import { ProductoModule } from './producto/producto.module';
import { Pedido } from './pedido/entities/pedido.entity';
import { Producto } from './producto/entities/producto.entity';
import { PedidoProducto } from './pedido-producto.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '12345',
      retryDelay: 3000,
      autoLoadEntities: true,
      database: 'gestion_pedidos',
      synchronize: true,
      entities: [Pedido, Producto, PedidoProducto],
    }),
    PedidoModule,
    ProductoModule,
  ],
})
export class AppModule {}

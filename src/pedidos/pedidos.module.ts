// src/pedidos/pedidos.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Producto } from './entities/producto.entity'; // <-- ¡Ojo aquí!
import { PedidoProducto } from './entities/pedido-producto.entity';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';
import { ProductosService } from '../productos/productos.service'; // Importa el servicio
import { ProductosModule } from '../productos/productos.module'; // Importa el módulo
import { ValidarProductosPipe } from './pipes/validar-productos.pipe';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, /* Aquí NO necesitas Producto */ PedidoProducto]), ProductosModule], // Importa ProductosModule
  controllers: [PedidosController],
  providers: [
    PedidosService,
    ProductosService, // El servicio estará disponible
    ValidarProductosPipe,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class PedidosModule {}
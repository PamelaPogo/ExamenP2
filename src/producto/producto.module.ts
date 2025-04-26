import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { UppercaseNombrePipe } from './pipes/uppercase-nombre.pipe';

@Module({
  imports: [TypeOrmModule.forFeature([Producto])],
  controllers: [ProductoController],
  providers: [ProductoService, UppercaseNombrePipe],
  exports: [ProductoService], // ⚠️ Importante para usar en pedido
})
export class ProductoModule {}

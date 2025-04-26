import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidosModule } from './pedidos/pedidos.module';
import { ProductoService } from './producto/producto.service';
import { ProductoController } from './producto/producto.controller';
import { ProductoModule } from './producto/producto.module';

@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: '12345',
    database: 'gestion_pedidos',
    entities:[],
    retryDelay:3000,
    autoLoadEntities:true,
    synchronize: true,
    }),
    PedidosModule,
    ProductoModule
  ],
  controllers: [AppController, ProductoController],
  providers: [AppService, ProductoService],
})
export class AppModule {}

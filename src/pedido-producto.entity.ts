import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pedido } from './pedido/entities/pedido.entity';
import { Producto } from './producto/entities/producto.entity';

@Entity()
export class PedidoProducto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidad: number;

  @ManyToOne(() => Pedido, pedido => pedido.pedidoProductos)
  pedido: Pedido;

  @ManyToOne(() => Producto, producto => producto.pedidoProductos)
  producto: Producto;
}

import { PedidoProducto } from 'src/pedido-producto.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('decimal')
  precio: number;

  @OneToMany(() => PedidoProducto, pedidoProducto => pedidoProducto.producto)
pedidoProductos: PedidoProducto[];

}

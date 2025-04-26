import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Producto } from '../../producto/entities/producto.entity';
import { PedidoProducto } from 'src/pedido-producto.entity';



@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cliente: string;

  @ManyToMany(() => Producto, { eager: true })
  @JoinTable()
  productos: Producto[];

  @OneToMany(() => PedidoProducto, pedidoProducto => pedidoProducto.pedido)
  pedidoProductos: PedidoProducto[];

}

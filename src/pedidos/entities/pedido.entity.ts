import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Producto } from './producto.entity';
import { PedidoProducto } from './pedido-producto.entity';

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cliente: string;

  @OneToMany(() => PedidoProducto, pedidoProducto => pedidoProducto.pedido)
  pedidoProductos: PedidoProducto[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
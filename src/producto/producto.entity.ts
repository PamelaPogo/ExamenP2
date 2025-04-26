// src/pedidos/entities/producto.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { Pedido } from './pedido.entity';
import { PedidoProducto } from './pedido-producto.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @OneToMany(() => PedidoProducto, pedidoProducto => pedidoProducto.producto)
  pedidoProductos: PedidoProducto[];
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { ProductoService } from '../producto/producto.service';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepo: Repository<Pedido>,
    private productoService: ProductoService,
    private dataSource: DataSource,
  ) {}

  async create(createPedidoDto: CreatePedidoDto) {
    return await this.dataSource.transaction(async manager => {
      const productos = await Promise.all(
        createPedidoDto.productos.map(async p => {
          const producto = await this.productoService.findOne(p.id);
          return producto;
        })
      );

      const pedido = manager.create(Pedido, {
        cliente: createPedidoDto.cliente,
        productos,
      });

      return await manager.save(pedido);
    });
  }

  findAll() {
    return this.pedidoRepo.find();
  }

  async findOne(id: number) {
    const pedido = await this.pedidoRepo.findOne({ where: { id } });
    if (!pedido) throw new NotFoundException('Pedido no encontrado');
    return pedido;
  }

  async update(id: number, dto: UpdatePedidoDto) {
    const pedido = await this.findOne(id);
    if (dto.cliente) pedido.cliente = dto.cliente;

    if (dto.productos) {
      const productos = await Promise.all(
        dto.productos.map(p => this.productoService.findOne(p.id)),
      );
      pedido.productos = productos;
    }

    return this.pedidoRepo.save(pedido);
  }

  async remove(id: number) {
    const pedido = await this.findOne(id);
    return this.pedidoRepo.remove(pedido);
  }
}

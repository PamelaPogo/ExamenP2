import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,
  ) {}

  create(dto: CreateProductoDto) {
    const producto = this.productoRepo.create(dto);
    return this.productoRepo.save(producto);
  }

  findAll() {
    return this.productoRepo.find();
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepo.findOne({ where: { id } });
    if (!producto) throw new NotFoundException('Producto no encontrado');
    return producto;
  }

  async findByIds(ids: number[]): Promise<Producto[]> {
    return this.productoRepo.findBy({ id: In(ids) });
  }

  async update(id: number, dto: UpdateProductoDto) {
    const producto = await this.findOne(id);
    const updated = this.productoRepo.merge(producto, dto);
    return this.productoRepo.save(updated);
  }

  async remove(id: number) {
    const producto = await this.findOne(id);
    return this.productoRepo.remove(producto);
  }
}

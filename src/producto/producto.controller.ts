import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    UseFilters,
    UsePipes,
    ParseIntPipe,
  } from '@nestjs/common';
  import { ProductoService } from './producto.service';
  import { CreateProductoDto } from './dto/create-producto.dto';
  import { UpdateProductoDto } from './dto/update-producto.dto';
  import { HttpExceptionFilter } from './filters/http-exception.filter';
  import { UppercaseNombrePipe } from './pipes/uppercase-nombre.pipe';
  
  @Controller('productos')
  @UseFilters(HttpExceptionFilter)
  export class ProductoController {
    constructor(private readonly productoService: ProductoService) {}
  
    @Post()
    @UsePipes(UppercaseNombrePipe)
    create(@Body() dto: CreateProductoDto) {
      return this.productoService.create(dto);
    }
  
    @Get()
    findAll() {
      return this.productoService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.productoService.findOne(id);
    }
  
    @Put(':id')
    @UsePipes(UppercaseNombrePipe)
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductoDto) {
      return this.productoService.update(id, dto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.productoService.remove(id);
    }
  }
  
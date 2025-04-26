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
  import { PedidoService } from './pedido.service';
  import { CreatePedidoDto } from './dto/create-pedido.dto';
  import { UpdatePedidoDto } from './dto/update-pedido.dto';
  import { ValidateProductIdsPipe } from './pipes/validate-product-ids.pipe';
  import { HttpExceptionFilter } from './filters/http-exception.filter';
  
  @Controller('pedidos')
  @UseFilters(HttpExceptionFilter)
  export class PedidoController {
    constructor(private readonly pedidoService: PedidoService) {}
  
    @Post()
    @UsePipes(ValidateProductIdsPipe)
    create(@Body() dto: CreatePedidoDto) {
      return this.pedidoService.create(dto);
    }
  
    @Get()
    findAll() {
      return this.pedidoService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.pedidoService.findOne(id);
    }
  
    @Put(':id')
    @UsePipes(ValidateProductIdsPipe)
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePedidoDto) {
      return this.pedidoService.update(id, dto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.pedidoService.remove(id);
    }
  }
  
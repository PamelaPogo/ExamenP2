import { IsString, IsArray, ArrayNotEmpty, IsInt, Min } from 'class-validator';

export class CreatePedidoDto {
  @IsString()
  cliente: string;

  @IsArray()
  @ArrayNotEmpty()
  productos: { id: number; cantidad: number }[];
}

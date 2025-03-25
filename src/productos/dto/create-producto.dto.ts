import { IsInt, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateProductoDto {

    @IsString()
    @MinLength(1, { message: 'El Serial no puede estar vacío' })
    @MaxLength(20, { message: 'El Serial no puede exceder los 20 caracteres' })
    serial: string;

    @IsString()
    @MinLength(1, { message: 'El Serial no puede estar vacío' })
    @MaxLength(100, { message: 'La referencia no puede exceder los 100 caracteres' })
    referencia: string;

    @IsInt()
    valor_compra: number;
}
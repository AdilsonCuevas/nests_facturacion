import { IsInt, IsString, IsEmail, MinLength, MaxLength, IsNumberString, IsArray, IsISO8601, ValidateNested } from 'class-validator';
import { Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductoDto {

    @IsString()
    @MinLength(1, { message: 'El Serial no puede estar vacío' })
    @MaxLength(20, { message: 'El Serial no puede exceder los 20 caracteres' })
    serial: string;

    @IsInt()
    valor_compa: number;

    //@IsISO8601() 
    @Type(() => Date) 
    fecha: Date;

    @IsString()
    @MinLength(1, { message: 'La descripcion no puede estar vacío' })
    @MaxLength(100, { message: 'La descripcion no puede exceder los 45 caracteres' })
    descripcion: string;

    @IsInt({ message: 'precio debe ser un número entero' })
    valor: number;
}
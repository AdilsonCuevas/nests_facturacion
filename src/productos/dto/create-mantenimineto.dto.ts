import { IsInt, IsString, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateManteniminetoDto {

    @IsInt({ message: 'id del producto debe ser un número entero' }) 
    equipo_id: number;

    @Type(() => Date) 
    fecha: Date;

    @IsString()
    @MinLength(1, { message: 'La descripcion no puede estar vacío' })
    @MaxLength(100, { message: 'La descripcion no puede exceder los 45 caracteres' })
    descripcion: string;

    @IsInt({ message: 'precio debe ser un número entero' })
    valor: number;
}
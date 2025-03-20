import { IsInt, IsString, IsEmail, MinLength, MaxLength, IsNumberString, IsArray, IsISO8601, ValidateNested } from 'class-validator';
import { Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateNegocioEquiposDto } from './create-negocio-equipo.dto';

export class CreateNegocioDto {

    @IsInt({ message: 'id del cliente debe ser un número entero' })
    cliente_id: number;

    @IsString()
    @MinLength(1, { message: 'El Serial no puede estar vacío' })
    @MaxLength(100, { message: 'El nombre no puede exceder los 100 caracteres' })
    nombre: string;

    @Type(() => Date) 
    fecha_inicio: Date;

    @Type(() => Date) 
    fecha_fin: Date;

    @ValidateNested()
    @Type(() => CreateNegocioEquiposDto)
    equipos: CreateNegocioEquiposDto[];

}
import { IsInt } from 'class-validator';

export class CreateNegocioEquiposDto {

    @IsInt({ message: 'id del producto debe ser un número entero' }) 
    equipo_id: number;

    @IsInt({ message: 'precio arrendamiento debe ser un número entero' })
    valor_arrendamiento: number;

    @IsInt({ message: 'tarifa del iva debe ser un número entero' })
    tarifa_iva: number;
}
import { IsInt, IsString, IsEmail, MinLength, MaxLength, IsNumberString } from 'class-validator';
import { Min, Max } from 'class-validator';

export class CreateClienteDto {
    @IsInt({ message: 'El número de documento debe ser un número entero' })
    @Min(1000000, { message: 'El número de documento debe tener al menos 7 dígitos' }) 
    @Max(9999999999, { message: 'El número de documento no puede tener más de 10 dígitos' }) 
    numero_documento: number;

    @IsString()
    @MinLength(1, { message: 'El nombre no puede estar vacío' })
    @MaxLength(45, { message: 'El nombre no puede exceder los 45 caracteres' })
    nombre: string;

    @IsString()
    @MinLength(1, { message: 'El apellido no puede estar vacío' })
    @MaxLength(45, { message: 'El apellido no puede exceder los 45 caracteres' })
    apellido: string;

    @IsEmail({}, { message: 'El email debe ser válido' })
    @MaxLength(100, { message: 'El email no puede exceder los 100 caracteres' })
    email: string;

    @IsInt({ message: 'El número de telefono debe ser un número entero' })
    @Min(1000000, { message: 'El número de telefono debe tener al menos 7 dígitos' }) // Mínimo 7 dígitos (1 millón)
    @Max(9999999999, { message: 'El número de telefono no puede tener más de 10 dígitos' }) // Máximo 10 dígitos
    telefono: number;
}
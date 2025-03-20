import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'bigint', unique: true })  
    numero_documento: number;

    @Column({ type: 'varchar', length: 45 }) 
    nombre: string;

    @Column({ type: 'varchar', length: 45 }) 
    apellido: string;

    @Column({ type: 'varchar', length: 100 }) 
    email: string;

    @Column({ type: 'int' })
    telefono: number;
}
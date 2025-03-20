import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Negocio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })  
    cliente_id: number;

    @Column({ type: 'varchar', length: 100 }) 
    nombre: string;

    @Column({ type: 'date'}) 
    fecha_inicio: Date;

    @Column({ type: 'date'}) 
    fecha_fin: Date;
}
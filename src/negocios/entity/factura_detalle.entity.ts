import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class FacturaDetalle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })  
    factura_id: number;

    @Column({ type: 'int' })  
    negocio_equipo_id: number;

    @Column({ type: 'int' })  
    valor: number;
}
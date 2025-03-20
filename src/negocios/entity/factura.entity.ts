import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Factura {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })  
    negocio_id: number;

    @Column({ type: 'date'}) 
    fecha_factura: Date;

    @Column({ type: 'int' })
    valor_factura: number;
}
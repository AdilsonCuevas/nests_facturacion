import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Equipo } from '../../productos/entity/equipo.entity';
import { Negocio } from './negocio.entity';

@Entity()
export class NegocioEquipo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })  
    negocio_id: number;

    @Column({ type: 'int' })  
    equipo_id: number;

    @Column({ type: 'int' })  
    valor_arrendamiento: number;

    @Column({ type: 'int' })  
    tarifa_iva: number;

    @Column({ type: 'int' })  
    valor_total: number;
}
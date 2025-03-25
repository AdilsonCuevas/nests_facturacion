import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Equipo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 20, unique: true }) 
    serial: string;

    @Column({ type: 'varchar', length: 100 }) 
    referencia: string;

    @Column({ type: 'bigint' })  
    valor_compra: number;
}
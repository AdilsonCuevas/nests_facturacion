import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EquipoCosto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })  
    equipo_id: number;

    @Column({ type: 'date'}) 
    fecha: Date;

    @Column({ type: 'varchar', length: 100 }) 
    descripcion: string;

    @Column({ type: 'int' })  
    valor: number;
}
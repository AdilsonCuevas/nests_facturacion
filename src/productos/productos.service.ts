import { Equipo } from './entity/equipo.entity';
import { EquipoCosto } from './entity/equipo_costo.entity';
import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateManteniminetoDto } from './dto/create-mantenimineto.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class ProductosService {

    constructor(
        @InjectRepository(Equipo)
        private equipoRepository: Repository<Equipo>,

        @InjectRepository(EquipoCosto)
        private equipoCostoRepository: Repository<EquipoCosto>,
    ) {}

    async create(createClienteDto: CreateProductoDto): Promise<Equipo> {
        // Crear cliente
        const producto = this.equipoRepository.create({
            serial: createClienteDto.serial,
            referencia: createClienteDto.referencia,
            valor_compra: createClienteDto.valor_compra,
        });
    
        // Guardar el cliente
        const clienteGuardado = await this.equipoRepository.save(producto);
        return clienteGuardado;
    }

    async createMantenimiento(createManteniminetoDto: CreateManteniminetoDto): Promise<EquipoCosto>{
        const newDetalles = this.equipoCostoRepository.create({
            equipo_id: createManteniminetoDto.equipo_id,
            fecha: createManteniminetoDto.fecha,
            descripcion: createManteniminetoDto.descripcion,
            valor: createManteniminetoDto.valor,
        });

        try {
            const mantenimineto = await this.equipoCostoRepository.save(newDetalles);
            return mantenimineto;
        } catch (error) {
            throw new BadRequestException("Error"+ error);
        }
        
    }
}
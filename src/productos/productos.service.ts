import { Equipo } from './entity/equipo.entity';
import { EquipoCosto } from './entity/equipo_costo.entity';
import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
            valor_compa: createClienteDto.valor_compa,
        });
    
        // Guardar el cliente
        const clienteGuardado = await this.equipoRepository.save(producto);

        const newDetalles = this.equipoCostoRepository.create({
            equipo_id: clienteGuardado.id,
            fecha: createClienteDto.fecha,
            descripcion: createClienteDto.descripcion,
            valor: createClienteDto.valor,
        });
    
        await this.equipoCostoRepository.save(newDetalles);

        return clienteGuardado;
    }
}
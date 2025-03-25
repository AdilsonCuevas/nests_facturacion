import { Cliente } from './entity/cliente.entity';
import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class ClientesService {

    constructor(
        @InjectRepository(Cliente)
        private ClienteRepository: Repository<Cliente>,
    ) {}

    async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
        try {
            const user = this.ClienteRepository.create(createClienteDto);
            return await this.ClienteRepository.save(user);
        } catch (error) {
            throw new BadRequestException("Error"+ error);
        }
        
    }
}

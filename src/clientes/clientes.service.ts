import { Cliente } from './entity/cliente.entity';
import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientesService {

    constructor(
        @InjectRepository(Cliente)
        private ClienteRepository: Repository<Cliente>,
    ) {}

    async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
        const user = this.ClienteRepository.create(createClienteDto);
        return await this.ClienteRepository.save(user);
    }
}

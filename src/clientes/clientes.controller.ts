import { Controller, Post, Body } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { ClientesService } from './clientes.service';
import { Cliente } from './entity/cliente.entity';

@Controller('clientes')
export class ClientesController {

    constructor(private readonly clientesService: ClientesService) {}

    @Post()
    async create(@Body() Dto: CreateClienteDto): Promise<Cliente> {
        console.log(Dto);
        return await this.clientesService.create(Dto);
    }
}

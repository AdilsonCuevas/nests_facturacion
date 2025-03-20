import { Negocio } from './entity/negocio.entity';
import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { CreateNegocioDto } from './dto/create-negocios.dto';
import { NegociosService } from './negocios.service';

@Controller('negocios')
export class NegociosController {

    constructor(private readonly negociosService: NegociosService) {}

    @Post()
    create(@Body() createNegocioDto: CreateNegocioDto): Promise<Negocio> {
        return this.negociosService.create(createNegocioDto);
    }

    @Get()
    facturar() {
        return this.negociosService.findAll();
    }

}

import { Controller, Post, Body } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { ProductosService } from './productos.service';
import { Equipo } from './entity/equipo.entity';

@Controller('productos')
export class ProductosController {

    constructor(private readonly productosService: ProductosService) {}

    @Post()
    create(@Body() createProductoDto: CreateProductoDto): Promise<Equipo> {
        return this.productosService.create(createProductoDto);
    }
}

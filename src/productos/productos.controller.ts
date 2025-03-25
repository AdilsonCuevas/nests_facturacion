import { Controller, Post, Body } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { ProductosService } from './productos.service';
import { Equipo } from './entity/equipo.entity';
import { EquipoCosto } from './entity/equipo_costo.entity';
import { CreateManteniminetoDto } from './dto/create-mantenimineto.dto';

@Controller('productos')
export class ProductosController {

    constructor(private readonly productosService: ProductosService) {}

    @Post()
    create(@Body() createProductoDto: CreateProductoDto): Promise<Equipo> {
        return this.productosService.create(createProductoDto);
    }

    @Post('mantenimiento')
    createMantenimineto(@Body() createManteniminetoDto: CreateManteniminetoDto): Promise<EquipoCosto> {
        return this.productosService.createMantenimiento(createManteniminetoDto);
    }
}

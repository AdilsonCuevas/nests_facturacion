import { Module } from '@nestjs/common';
import { NegociosService } from './negocios.service';
import { NegociosController } from './negocios.controller';
import { Factura } from './entity/factura.entity';
import { FacturaDetalle } from './entity/factura_detalle.entity';
import { NegocioEquipo } from './entity/negocio_equipo.entity';
import { Negocio } from './entity/negocio.entity';
import { EquipoCosto } from '../productos/entity/equipo_costo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Factura]), TypeOrmModule.forFeature([FacturaDetalle]), TypeOrmModule.forFeature([NegocioEquipo]), TypeOrmModule.forFeature([Negocio]), TypeOrmModule.forFeature([EquipoCosto]), EquipoCosto],
  controllers: [NegociosController],
  providers: [NegociosService, Factura, FacturaDetalle, NegocioEquipo, Negocio],
  exports: [Factura, FacturaDetalle, NegocioEquipo, Negocio],
})
export class NegociosModule {}

import { Module } from '@nestjs/common';
import { NegociosService } from './negocios.service';
import { NegociosController } from './negocios.controller';
import { Factura } from './entity/factura.entity';
import { FacturaDetalle } from './entity/factura_detalle.entity';
import { NegocioEquipo } from './entity/negocio_equipo.entity';
import { Negocio } from './entity/negocio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Factura]), TypeOrmModule.forFeature([FacturaDetalle]), TypeOrmModule.forFeature([NegocioEquipo]), TypeOrmModule.forFeature([Negocio])],
  controllers: [NegociosController],
  providers: [NegociosService, Factura, FacturaDetalle, NegocioEquipo, Negocio],
  exports: [Factura, FacturaDetalle, NegocioEquipo, Negocio],
})
export class NegociosModule {}

import { ProductosController } from './productos.controller';
import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipo } from './entity/equipo.entity';
import { EquipoCosto } from './entity/equipo_costo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Equipo]), TypeOrmModule.forFeature([EquipoCosto])],
  controllers: [ProductosController],
  providers: [ProductosService, Equipo, EquipoCosto],
  exports: [EquipoCosto, Equipo],
})
export class ProductosModule {}

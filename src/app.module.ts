import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './clientes/clientes.module';
import { Cliente } from './clientes/entity/cliente.entity';
import { Equipo } from './productos/entity/equipo.entity';
import { EquipoCosto } from './productos/entity/equipo_costo.entity';
import { ProductosModule } from './productos/productos.module';
import { NegociosModule } from './negocios/negocios.module';
import { Negocio } from './negocios/entity/negocio.entity';
import { NegocioEquipo } from './negocios/entity/negocio_equipo.entity';
import { Factura } from './negocios/entity/factura.entity';
import { FacturaDetalle } from './negocios/entity/factura_detalle.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'db_celya',
      entities: [Cliente, Equipo, EquipoCosto, Negocio, NegocioEquipo, Factura, FacturaDetalle],
      synchronize: true,
    }),
    ClientesModule,
    ProductosModule,
    NegociosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Injectable } from '@nestjs/common';
import { CreateNegocioDto } from './dto/create-negocios.dto';
import { Negocio } from './entity/negocio.entity';
import { NegocioEquipo } from './entity/negocio_equipo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { Factura } from './entity/factura.entity';
import { FacturaDetalle } from './entity/factura_detalle.entity';

@Injectable()
export class NegociosService {

    constructor(
        @InjectRepository(Negocio)
        private NegocioRepository: Repository<Negocio>,
    
        @InjectRepository(NegocioEquipo)
        private NegocioEquipoRepository: Repository<NegocioEquipo>,

        @InjectRepository(Factura)
        private FacturaRepository: Repository<Factura>,

        @InjectRepository(FacturaDetalle)
        private FacturaDetalleRepository: Repository<FacturaDetalle>,
    ) {}

    async create(createNegocioDto : CreateNegocioDto): Promise<Negocio> {
        //crear negocio
        const negocio = this.NegocioRepository.create({
            cliente_id: createNegocioDto.cliente_id,
            nombre: createNegocioDto.nombre,
            fecha_inicio: createNegocioDto.fecha_inicio,
            fecha_fin: createNegocioDto.fecha_fin,
        });
        // Guardar el negocio
        const negocioGuardado = await this.NegocioRepository.save(negocio);

        //detalles
        const equipos = createNegocioDto.equipos;
        await Promise.all(equipos.map(async (element) => {
            const newDetalles = this.NegocioEquipoRepository.create({
                negocio_id: negocioGuardado.id,
                equipo_id: element.equipo_id,
                valor_arrendamiento: element.valor_arrendamiento,
                tarifa_iva: element.tarifa_iva,
                valor_total: element.valor_arrendamiento * element.tarifa_iva,
            });
            const equipoactual = await this.NegocioEquipoRepository.findOneBy({ id: element.equipo_id });
            if (!equipoactual) {
                await this.NegocioEquipoRepository.save(newDetalles);
            } else {
                throw new BadRequestException("equipo ya corresponde a un negocio ");
            }
        }));

        return negocioGuardado;

    }

    async findAll() {
        const negociosActivos = await this.NegocioRepository.find({});
        var cantidad = 0;

        for (const negocio of negociosActivos) {
            // Obtener detalles del negocio
            const detallesNegocio = await this.NegocioEquipoRepository.find({
                where: { negocio_id: negocio.id },
            });

            const fechaActual = new Date(); const fecha_inicio = new Date(negocio.fecha_inicio); const fecha_fin = new Date(negocio.fecha_fin);
            const fechaFinMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0); // Último día del mes
            const mesInicioNegocio = fecha_inicio.getMonth() + 1;
            const mesFinalNegocio = fecha_fin.getMonth() + 1;
            const mesActual = fechaActual.getMonth() + 1;
            var valor_factura = 0;

            // Generar la factura
            const factura = this.FacturaRepository.create({
                negocio_id: negocio.id,
                fecha_factura: fechaFinMes,
                valor_factura: 0
            });
            await this.FacturaRepository.save(factura);

            for (const detalle of detallesNegocio) {
                var diasFacturar = 0;
                if (mesActual == mesInicioNegocio){
                    diasFacturar = fechaFinMes.getDate() - negocio.fecha_inicio.getDate();
                } else if (mesActual == mesFinalNegocio) {
                    diasFacturar = negocio.fecha_fin.getDate();
                } else {
                    diasFacturar = fechaFinMes.getDate();
                }

                const valorProrrateado = detalle.valor_total / (fechaFinMes.getDate() / diasFacturar);
                valor_factura = valor_factura + valorProrrateado;

                const facturaDetalle = this.FacturaDetalleRepository.create({
                    factura_id: factura.id,
                    negocio_equipo_id: detalle.id,
                    valor: valorProrrateado, // Ajustar según prorrateo si es necesario
                });
                await this.FacturaDetalleRepository.save(facturaDetalle);
            }
            const facturaUpdate = await this.FacturaRepository.findOne({
                where: { id: factura.id },  
            });
            if (facturaUpdate) {
                facturaUpdate.valor_factura = valor_factura;
                await this.FacturaRepository.save(facturaUpdate);
                cantidad++;
            }
        }

        return "cantidad de facturas realizadas " + cantidad;
    }

}

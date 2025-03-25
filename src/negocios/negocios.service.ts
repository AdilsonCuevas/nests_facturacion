import { Injectable } from '@nestjs/common';
import { CreateNegocioDto } from './dto/create-negocios.dto';
import { Negocio } from './entity/negocio.entity';
import { NegocioEquipo } from './entity/negocio_equipo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { Factura } from './entity/factura.entity';
import { FacturaDetalle } from './entity/factura_detalle.entity';
import { EquipoCosto } from '../productos/entity/equipo_costo.entity';

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

        @InjectRepository(EquipoCosto)
        private EquipoCostoRepository: Repository<EquipoCosto>,
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
        for (const equipo of equipos) {
            const equipoactual = await this.NegocioEquipoRepository.findOneBy({ equipo_id: equipo.equipo_id });
            if (equipoactual) {
                const negocio = await this.NegocioRepository.find({
                    where: { id: negocioGuardado.id },
                });
                await this.NegocioRepository.remove(negocio);
                throw new BadRequestException("equipo ya corresponde a un negocio ");
            } 
        }
        await Promise.all(equipos.map(async (element) => {
            const newDetalles = this.NegocioEquipoRepository.create({
                negocio_id: negocioGuardado.id,
                equipo_id: element.equipo_id,
                valor_arrendamiento: element.valor_arrendamiento,
                tarifa_iva: element.tarifa_iva,
                valor_total: (element.valor_arrendamiento * (element.tarifa_iva/100)) + element.valor_arrendamiento,
            });
            await this.NegocioEquipoRepository.save(newDetalles);
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

            const fechaActual = new Date(); var fecha_inicio = new Date(negocio.fecha_inicio); const fecha_fin = new Date(negocio.fecha_fin);
            const mesInicioNegocio = fecha_inicio.getMonth() + 1; const añoInicio = fecha_inicio.getFullYear();
            const mesFinalNegocio = fecha_fin.getMonth() + 1; const añoFin = fecha_fin.getFullYear();
            const mesActual = fechaActual.getMonth() + 1;
            var valor_factura = 0;

            var constante = 1; 
            while (constante == 1) {
                var fechaFinMes = new Date(fecha_inicio.getFullYear(), fecha_inicio.getMonth() + 1, 0);

                // Generar la factura
                const factura = this.FacturaRepository.create({
                    negocio_id: negocio.id,
                    fecha_factura: fechaFinMes,
                    valor_factura: 0
                });
                await this.FacturaRepository.save(factura);

                for (const detalle of detallesNegocio) {
                    var diasFacturar = 0;
                    if (mesInicioNegocio == (fechaFinMes.getMonth() + 1) && añoInicio == fechaFinMes.getFullYear()){
                        diasFacturar = fechaFinMes.getDate() - fecha_inicio.getDate();
                    } else if (mesFinalNegocio == (fechaFinMes.getMonth() + 1) && añoFin == fechaFinMes.getFullYear()) {
                        diasFacturar = fechaFinMes.getDate() - (fechaFinMes.getDate() - fecha_inicio.getDate());
                    } else {
                        diasFacturar = fechaFinMes.getDate();
                    }

                    const equipo_costos = await this.EquipoCostoRepository.find({
                        where: { equipo_id: detalle.equipo_id },
                    });
                    var valor_equipo = 0;
                    for (const equipo_costo of equipo_costos) {
                        var fecha = new Date(equipo_costo.fecha);
                        if ((fecha.getMonth() + 1) == (fechaFinMes.getMonth() + 1) && fecha.getFullYear() == fechaFinMes.getFullYear()) {
                            valor_equipo = equipo_costo.valor;
                        }
                    }
                    const valorProrrateado = (detalle.valor_total * (diasFacturar / fechaFinMes.getDate() )) + (valor_equipo + (valor_equipo * 0.19));
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

                    if ((fecha_inicio.getMonth() + 1) != mesActual && (fecha_inicio.getMonth() + 1) != mesFinalNegocio){
                        fecha_inicio = new Date(fecha_inicio.getFullYear(), fecha_inicio.getMonth() + 1, 1);
                        if ((fecha_inicio.getMonth() + 1) == mesFinalNegocio){
                            fecha_inicio = fecha_fin;
                        }
                    } else {
                        constante = 0;
                    }
                    cantidad++;
                }
            }
        }

        return "cantidad de facturas realizadas " + cantidad;
    }

}

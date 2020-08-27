import { Request, Response } from 'express';
import MySQL from '../mysql/mysql';


class CotizacionCtrl {

    public static tabla: string = 'CAB_COTIZACION';

    public listar(req: Request, res: Response) {
        const query = `SELECT a.COD_CABC,a.SECUENCIAL_CABC,c.NOMBRE_ESCO,a.FECHA_CABC,b.NOMBRES_CLIE,b.CORREO_CLIE,b.TELEFONO_CLIE,d.NOMBRE_TICO,
        f.NOMBRE_VACO, e.NOMBRE_COCO, a.SUBTOTAL_CABC,a.SUBTOTAL0_CABC,a.IVA_CABC,a.TOTAL_CABC,g.NOMBRE_USUA
        FROM ${CotizacionCtrl.tabla}  a
        INNER join cliente b on a.COD_CLIE = b.COD_CLIE
        left join estado_cotizacion c on a.COD_ESCO = c.COD_ESCO
        inner join tipo_cotizacion d on a.COD_TICO = d.COD_TICO
        left JOIN condicion_cotizacion e on a.COD_COCO = e.COD_COCO
        left JOIN validez_cotizacion f on a.COD_VACO = f.COD_VACO
        left join usuario g on a.COD_USUA = g.COD_USUA
        order by a.COD_CABC desc`;
        MySQL.consultar(query, (err: any, data: Object[]) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err
                });
            }
            res.json({
                error: false,
                datos: data
            });
        });
    }


    public getEstados(req: Request, res: Response) {
        const query = `SELECT * FROM estado_cotizacion`;
        MySQL.consultar(query, (err: any, data: Object[]) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err
                });
            }
            res.json({
                error: false,
                datos: data
            });
        });
    }


    public getTipos(req: Request, res: Response) {
        const query = `SELECT * FROM tipo_cotizacion`;
        MySQL.consultar(query, (err: any, data: Object[]) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err
                });
            }
            res.json({
                error: false,
                datos: data
            });
        });
    }


    public getValidez(req: Request, res: Response) {
        const query = `SELECT * FROM validez_cotizacion`;
        MySQL.consultar(query, (err: any, data: Object[]) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err
                });
            }
            res.json({
                error: false,
                datos: data
            });
        });
    }


    public getCondicion(req: Request, res: Response) {
        const query = `SELECT * FROM cab_cotizacion`;
        MySQL.consultar(query, (err: any, data: Object[]) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err
                });
            }
            res.json({
                error: false,
                datos: data
            });
        });
    }

    public buscarPorId(req: Request, res: Response) {
        const COD_CABC = req.params.id;
        const query = `SELECT a.*,h.*,NOMBRE_PROD,NOMBRE_UNID
        FROM det_cotizacion h
        inner join cab_cotizacion a on a.COD_CABC = h.COD_CABC
        inner join producto b on h.COD_PROD=b.COD_PROD
        inner join unidad_medida c on h.COD_UNID = c.COD_UNID
        WHERE a.COD_CABC = ${COD_CABC}
        order by a.SECUENCIAL_CABC
        `;
        MySQL.consultar(query, (err: any, data: Object[]) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err
                });
            }
            res.json({
                error: false,
                datos: data
            });
        });
    }


    public async crear(req: Request, res: Response) {
        //Insreta o actualiza el cliente
        const correo_clie: string = MySQL.escape(req.body.CORREO_CLIE);
        //Valida si el correo electrónico del cliente ya existe en la base de datos
        let cod_clie = null;
        const query = `SELECT COD_CLIE FROM CLIENTE a WHERE CORREO_CLIE = ${correo_clie} LIMIT 1`;
        //console.log(query + ' query');
        cod_clie = await new Promise(resolve => {
            MySQL.consultar(query, (err: any, data: Object[]) => {
                if (data !== null) {
                    const resul: any = data[0];
                    resolve(resul.COD_CLIE);
                }
                else {
                    resolve(null);
                }
            });
        });
        //Si el cliente no existe lo crea
        if (cod_clie === null) {
            //Inserta el cliente            
            const camposCliente = {
                TIPO_ID_CLIE: req.body.TIPO_ID_CLIE,
                IDENTIFICACION_CLIE: req.body.IDENTIFICACION_CLIE,
                NOMBRES_CLIE: req.body.NOMBRES_CLIE,
                CORREO_CLIE: req.body.CORREO_CLIE,
                TELEFONO_CLIE: req.body.TELEFONO_CLIE,
                DIRECCION_CLIE: req.body.DIRECCION_CLIE,
                COORDENADAS_CLIE: req.body.COORDENADAS_CLIE
            };
            // console.log(campos);
            cod_clie = await new Promise(resolve => {
                MySQL.insertar('CLIENTE', camposCliente, (err: any, insertId: any) => {
                    if (err) {
                        res.status(400).json({
                            error: true,
                            mensaje: 'Error al crear cliente: ' + err
                        });
                    }
                    resolve(insertId);
                });
            });
        }
        //console.log(cod_clie + ' cod_clie  ');
        //Inserta la cabecera de la cotizacion
        let cod_cabc = null;
        let fecha_actual = new Date().toISOString().slice(0, 10)
        const camposCabecera = {
            COD_ESCO: 1, //ingresado
            COD_TICO: 1, //portal web
            COD_CLIE: cod_clie,
            FECHA_CABC: fecha_actual, // fecha actual           
            CORREO_CABC: req.body.CORREO_CLIE,
            DIRECCION_CABC: req.body.DIRECCION_CLIE,
            FECHA_CREA: fecha_actual,
            USUARIO_CREA: 'sa'
        };
        // console.log(campos);
        cod_cabc = await new Promise(resolve => {
            MySQL.insertar('CAB_COTIZACION', camposCabecera, (err: any, insertId: any) => {
                if (err) {
                    res.status(400).json({
                        error: true,
                        mensaje: 'Error al crear cabecera de la cotización: ' + err
                    });
                }
                resolve(insertId);
            });
        });
        //console.log(cod_cabc + ' cod_cabc  ');
        //DETALLES
        let detalles = req.body.DETALLES;
        for (let actual in detalles) {
            let fila: any = detalles[actual];
            const camposDetalle = {
                COD_PROD: fila.codigo, 
                COD_UNID: fila.codigo_unidad, 
                CANTIDAD_DECO: fila.cantidad, 
                COD_CABC: cod_cabc, 
            };
            await new Promise(resolve => {
                MySQL.insertar('DET_COTIZACION', camposDetalle, (err: any, insertId: any) => {
                    if (err) {
                        res.status(400).json({
                            error: true,
                            mensaje: 'Error al crear detalle de la cotización: ' + err
                        });
                    }
                    resolve(insertId);
                });
            });

        }
        res.json({
            error: false,
            cod_clie: cod_clie,
            cod_cabc: cod_cabc
        });
    }


    public eliminar(req: Request, res: Response) {
        const condiciones = {
            COD_CABC: req.params.id
        };
        MySQL.eliminar(CotizacionCtrl.tabla, condiciones, (err: any, affectedRows: any) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err
                });
            }

            res.json({
                error: false,
                affectedRows: affectedRows
            });

        });
    }

    public actualizar(req: Request, res: Response) {

        
       
        //Inserta la cabecera de la cotizacion
        let cod_cabc = req.body.COD_CABC;
        let fecha_actual = new Date().toISOString().slice(0, 10)
        const camposCabecera = {
            COD_ESCO: 1, //ingresado
            COD_TICO: 1, //portal web
            COD_CLIE: cod_clie,
            FECHA_CABC: fecha_actual, // fecha actual           
            CORREO_CABC: req.body.CORREO_CLIE,
            DIRECCION_CABC: req.body.DIRECCION_CLIE,
            FECHA_CREA: fecha_actual,
            USUARIO_CREA: 'sa'
        };
        // console.log(campos);
            MySQL.insertar('CAB_COTIZACION', camposCabecera, (err: any, insertId: any) => {
                if (err) {
                    res.status(400).json({
                        error: true,
                        mensaje: 'Error al crear cabecera de la cotización: ' + err
                    });
                }
            });

        //console.log(cod_cabc + ' cod_cabc  ');
        //DETALLES
        let detalles = req.body.DETALLES;
        for (let actual in detalles) {
            let fila: any = detalles[actual];
            const camposDetalle = {
                COD_PROD: fila.codigo, 
                COD_UNID: fila.codigo_unidad, 
                CANTIDAD_DECO: fila.cantidad, 
                COD_CABC: cod_cabc, 
            };
            await new Promise(resolve => {
                MySQL.insertar('DET_COTIZACION', camposDetalle, (err: any, insertId: any) => {
                    if (err) {
                        res.status(400).json({
                            error: true,
                            mensaje: 'Error al crear detalle de la cotización: ' + err
                        });
                    }
                    resolve(insertId);
                });
            });

        }
        res.json({
            error: false,
            cod_clie: cod_clie,
            cod_cabc: cod_cabc
        });

    }



//MIS COTIZACIONES
public misCotizaciones(req: Request, res: Response) {
    const COD_USUA = req.params.id;
    const query = `SELECT a.COD_CABC,a.SECUENCIAL_CABC,c.NOMBRE_ESCO,a.FECHA_CABC,b.NOMBRES_CLIE,b.CORREO_CLIE,b.TELEFONO_CLIE,d.NOMBRE_TICO,
    f.NOMBRE_VACO, e.NOMBRE_COCO, a.SUBTOTAL_CABC,a.SUBTOTAL0_CABC,a.IVA_CABC,a.TOTAL_CABC,g.NOMBRE_USUA
    FROM ${CotizacionCtrl.tabla}  a
    INNER join cliente b on a.COD_CLIE = b.COD_CLIE
    left join estado_cotizacion c on a.COD_ESCO = c.COD_ESCO
    inner join tipo_cotizacion d on a.COD_TICO = d.COD_TICO
    left JOIN condicion_cotizacion e on a.COD_COCO = e.COD_COCO
    left JOIN validez_cotizacion f on a.COD_VACO = f.COD_VACO
    inner join usuario g on a.COD_USUA = g.COD_USUA
    where a.COD_USUA =  ${COD_USUA}  
    order by a.COD_CABC desc`;
    MySQL.consultar(query, (err: any, data: Object[]) => {
        if (err) {
            res.status(400).json({
                error: true,
                mensaje: err
            });
        }
        res.json({
            error: false,
            datos: data
        });
    });
}



}







const cotizacionCtrl = new CotizacionCtrl();
export default cotizacionCtrl;
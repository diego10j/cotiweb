import { Request, Response } from 'express';
import MySQL from '../mysql/mysql';


class CotizacionCtrl {

    public static tabla: string = 'CAB_COTIZACION';

    public listar(req: Request, res: Response) {
        const query = `SELECT a.COD_CABC,a.SECUENCIAL_CABC,c.NOMBRE_ESCO,a.FECHA_CABC,b.NOMBRES_CLIE,CORREO_CABC,b.TELEFONO_CLIE,d.NOMBRE_TICO,
        f.NOMBRE_VACO, e.NOMBRE_COCO, a.SUBTOTAL_CABC,a.SUBTOTAL0_CABC,a.IVA_CABC,a.TOTAL_CABC,g.NOMBRE_USUA, a.COD_ESCO,a.COD_USUA
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

    public getDatosCotizacion(req: Request, res: Response) {
        const COD_CABC = req.params.id;
        const query = `SELECT a.COD_CABC,a.SECUENCIAL_CABC,c.NOMBRE_ESCO,a.FECHA_CABC,b.NOMBRES_CLIE,CORREO_CABC,b.TELEFONO_CLIE,d.NOMBRE_TICO,
        f.NOMBRE_VACO, e.NOMBRE_COCO, a.SUBTOTAL_CABC,a.SUBTOTAL0_CABC,a.IVA_CABC,a.TOTAL_CABC,g.NOMBRE_USUA, a.COD_ESCO,a.COD_USUA,IDENTIFICACION_CLIE,DIRECCION_CABC
        FROM ${CotizacionCtrl.tabla}  a
        INNER join cliente b on a.COD_CLIE = b.COD_CLIE
        left join estado_cotizacion c on a.COD_ESCO = c.COD_ESCO
        inner join tipo_cotizacion d on a.COD_TICO = d.COD_TICO
        left JOIN condicion_cotizacion e on a.COD_COCO = e.COD_COCO
        left JOIN validez_cotizacion f on a.COD_VACO = f.COD_VACO
        left join usuario g on a.COD_USUA = g.COD_USUA
        WHERE a.COD_CABC  = ${COD_CABC}
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
                datos: data[0]
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
        const query = `SELECT a.*,h.*,NOMBRE_PROD,NOMBRE_UNID,DATE_FORMAT(a.FECHA_CABC,'%Y/%m/%d') as FECHA_CABC, TELEFONO_CLIE
        FROM det_cotizacion h
        inner join cab_cotizacion a on a.COD_CABC = h.COD_CABC
        inner join producto b on h.COD_PROD=b.COD_PROD
        inner join unidad_medida c on h.COD_UNID = c.COD_UNID
        INNER join cliente d on a.COD_CLIE = d.COD_CLIE
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


    public async crearDesdePortal(req: Request, res: Response) {
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
        let fecha_actual = new Date().toISOString().slice(0, 10);
        const camposCabecera = {
            COD_ESCO: 1, //ingresado
            COD_TICO: 1, //portal web
            COD_CLIE: cod_clie,
            FECHA_CABC: fecha_actual, // fecha actual           
            CORREO_CABC: req.body.CORREO_CLIE,
            DIRECCION_CABC: req.body.DIRECCION_CLIE,
            FECHA_CREA: fecha_actual,
            USUARIO_CREA: 'usuario',
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
                IVA_DECO: 1,
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

    public async actualizar(req: Request, res: Response) {

        const condicion = {
            COD_CABC: req.params.id
        };
        //Elimina detalles existentes
        await new Promise(resolve => {
            MySQL.eliminar('DET_COTIZACION', condicion, (err: any, affectedRows: any) => {
                if (err) {
                    res.status(400).json({
                        error: true,
                        mensaje: err.sqlMessage,
                        detalle: err
                    });
                }
                resolve(affectedRows);
            });
        });

        //cabecera de la cotizacion
        let fecha_actual = new Date().toISOString().slice(0, 10);
        const camposCabecera = {
            COD_ESCO: req.body.COD_ESCO,
            COD_TICO: req.body.COD_TICO,
            COD_CLIE: req.body.COD_CLIE,
            COD_COCO: req.body.COD_COCO,
            COD_VACO: req.body.COD_VACO,
            COD_USUA: req.body.COD_USUA,
            FECHA_CABC: fecha_actual,
            CORREO_CABC: req.body.CORREO_CABC,
            DIRECCION_CABC: req.body.DIRECCION_CABC,
            SUBTOTAL_CABC: req.body.SUBTOTAL_CABC,
            SUBTOTAL0_CABC: req.body.SUBTOTAL0_CABC,
            IVA_CABC: req.body.IVA_CABC,
            TOTAL_CABC: req.body.TOTAL_CABC,
            ENVIADA_CABC: req.body.ENVIADA_CABC,
            FECHA_MOD: fecha_actual,
            USUARIO_MOD: req.body.USUARIO_MOD,
        };


        // console.log(campos);
        MySQL.actualizar('CAB_COTIZACION', camposCabecera, condicion, (err: any, insertId: any) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: 'Error al crear cabecera de la cotización: ' + err
                });
            }
        });

        //DETALLES
        let detalles = req.body.DETALLES;

        for (let actual in detalles) {
            let fila: any = detalles[actual];
            const camposDetalle = {
                COD_PROD: fila.COD_PROD,
                COD_UNID: fila.COD_UNID,
                CANTIDAD_DECO: fila.CANTIDAD_DECO,
                PRECIO_DECO: fila.PRECIO_DECO,
                TOTAL_DECO: fila.TOTAL_DECO,
                IVA_DECO: fila.IVA_DECO,
                COD_CABC: req.params.id,
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
            cod_clie: 1,
            cod_cabc: req.params.id
        });

    }



    public async crear(req: Request, res: Response) {

        //cabecera de la cotizacion
        let fecha_actual = new Date().toISOString().slice(0, 10);
        const camposCabecera = {
            COD_ESCO: req.body.COD_ESCO,
            COD_TICO: req.body.COD_TICO,
            COD_CLIE: req.body.COD_CLIE,
            COD_COCO: req.body.COD_COCO,
            COD_VACO: req.body.COD_VACO,
            COD_USUA: req.body.COD_USUA,
            FECHA_CABC: fecha_actual,
            CORREO_CABC: req.body.CORREO_CABC,
            DIRECCION_CABC: req.body.DIRECCION_CABC,
            SUBTOTAL_CABC: req.body.SUBTOTAL_CABC,
            SUBTOTAL0_CABC: req.body.SUBTOTAL0_CABC,
            IVA_CABC: req.body.IVA_CABC,
            TOTAL_CABC: req.body.TOTAL_CABC,
            ENVIADA_CABC: req.body.ENVIADA_CABC,
            FECHA_CREA: fecha_actual,
            USUARIO_CREA: req.body.USUARIO_CREA,
        };
        // console.log(campos);
        let cod_cabc = await new Promise(resolve => {
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
                COD_PROD: fila.COD_PROD,
                COD_UNID: fila.COD_UNID,
                CANTIDAD_DECO: fila.CANTIDAD_DECO,
                PRECIO_DECO: fila.PRECIO_DECO,
                TOTAL_DECO: fila.TOTAL_DECO,
                IVA_DECO: fila.IVA_DECO,
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
            cod_clie: 1,
            cod_cabc: cod_cabc
        });

    }


    //MIS COTIZACIONES
    public misCotizaciones(req: Request, res: Response) {
        const COD_USUA = req.params.id;
        const query = `SELECT a.COD_CABC,a.SECUENCIAL_CABC,c.NOMBRE_ESCO,a.FECHA_CABC,b.NOMBRES_CLIE,CORREO_CABC,b.TELEFONO_CLIE,d.NOMBRE_TICO,
    f.NOMBRE_VACO, e.NOMBRE_COCO, a.SUBTOTAL_CABC,a.SUBTOTAL0_CABC,a.IVA_CABC,a.TOTAL_CABC,g.NOMBRE_USUA,a.COD_ESCO 
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


    public async asignarVendedor(req: Request, res: Response) {
        const condicion = {
            COD_CABC: req.params.id
        };
        const camposCabecera = {
            COD_USUA: req.body.COD_USUA,
            COD_ESCO: 2,
        };
        // console.log(campos);
        MySQL.actualizar('CAB_COTIZACION', camposCabecera, condicion, (err: any, changedRows: any) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err
                });
            }
            res.json({
                error: false,
                changedRows: changedRows
            });
        });
    }

    public async asignarEstado(req: Request, res: Response) {
        const condicion = {
            COD_CABC: req.params.id
        };
        const camposCabecera = {
            COD_ESCO: req.body.COD_ESCO,
        };
        // console.log(campos);
        MySQL.actualizar('CAB_COTIZACION', camposCabecera, condicion, (err: any, changedRows: any) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err
                });
            }
            res.json({
                error: false,
                changedRows: changedRows
            });
        });
    }


    async enviarMail(req: Request, res: Response) {
        var nodemailer = require('nodemailer');

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "mail.produquimic.com.ec",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'sigafi@produquimic.com.ec', // generated ethereal user
                pass: 'Arleth2016', // generated ethereal password
            },
        });


        let mensaje = "<html>"
        + "<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />"
        + "<body style='font-family: sans-serif;margin: 0;padding: 0;font-size: 13px;overflow: hidden;'>"
        + "<div>"
        + "	<div align=\"right\" style=\"background: #0eb3a8;width: 98%;color: white;padding-right:35px;height:33px;font-size:20px;\"> <div style=\"height:33px;vertical-align:middle;display: table-cell;\"> Sistema de Cotizaciones</div></div>"
        + "	<br/>"
        + "	<div style=\"padding-left:15px\"> "
        + "	<p>Estimado(a) DIEGO FERNANDO JACOME </p>"
        + "	<p> Se encuentra adjunta la cotización solicitada.</p>"
        + "	<p>"	
        + "	<br/>\n"
        + "	</div>\n"
        + "</div>\n"
        + "</body>\n"
       + "</html>";

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'sigafi@produquimic.com.ec', // sender address
            to: "diego10j.89@hotmail.com", // list of receivers
            subject: "COTIZACIÓN", // Subject line
            text: "Hello world?", // plain text body
            html: mensaje, // html body
        });

        //console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
       // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou..

        res.json({
            error: false,
            mensaje: 'Correo enviado exitosamente'
        });

    }


}





const cotizacionCtrl = new CotizacionCtrl();
export default cotizacionCtrl;
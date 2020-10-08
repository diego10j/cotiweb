import { Request, Response } from 'express';
import MySQL from '../mysql/mysql';



class SistemaCtrl {



    public getCombo(req: Request, res: Response) {
        const tabla = req.body.tabla;
        const campoCodigo = req.body.campoCodigo;
        const campoLabel = req.body.campoLabel;
        const condicion = req.body.condicion;
        let sqlCondicion = "";
        if (condicion) {
            sqlCondicion = " WHERE 1 = 1 AND " + condicion;
        }
        const query = `SELECT ${campoCodigo} AS value, ${campoLabel} AS label 
        FROM ${tabla} 
        ${sqlCondicion} 
        ORDER BY ${campoLabel}`;
        MySQL.consultar(query, (err: any, data: Object[]) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err.sqlMessage,
                    detalle: err
                });
            }
            res.json({
                error: false,
                datos: data
            });
        });
    }


    public getOpciones(req: Request, res: Response) {
        const query = `SELECT A.COD_OPCI,A.NOMBRE_OPCI,A.ICONO_OPCI,A.PATH_OPCI,B.NOMBRE_OPCI AS GRUPO 
        FROM OPCION A LEFT JOIN OPCION B ON A.OPC_COD_OPCI=B.COD_OPCI order by B.NOMBRE_OPCI, A.NOMBRE_OPCI `;
        MySQL.consultar(query, (err: any, data: Object[]) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err.sqlMessage,
                    detalle: err
                });
            }
            res.json({
                error: false,
                datos: data
            });
        });
    }

    public getPerfiles(req: Request, res: Response) {
        const query = `SELECT * FROM perfil`;
        MySQL.consultar(query, (err: any, data: Object[]) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err.sqlMessage,
                    detalle: err
                });
            }
            res.json({
                error: false,
                datos: data
            });
        });
    }


    public getParametros(req: Request, res: Response) {
        const query = `SELECT * FROM parametro`;
        MySQL.consultar(query, (err: any, data: Object[]) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err.sqlMessage,
                    detalle: err
                });
            }
            res.json({
                error: false,
                datos: data
            });
        });
    }

    public crearOpcion(req: Request, res: Response) {
        const campos = {
            NOMBRE_OPCI: req.body.NOMBRE_OPCI,
            DETALLE_OPCI: req.body.DETALLE_OPCI,
            ICONO_OPCI: req.body.ICONO_OPCI,
            PATH_OPCI: req.body.PATH_OPCI,
            OPC_COD_OPCI: req.body.OPC_COD_OPCI,
            ACTIVO_OPCI: true
        };
        MySQL.insertar('OPCION', campos, (err: any, insertId: any) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err.sqlMessage,
                    detalle: err
                });
            }

            res.json({
                error: false,
                insertId: insertId
            });

        });
    }


    public eliminarOpcion(req: Request, res: Response) {
        const condiciones = {
            COD_OPCI: req.params.id
        };
        MySQL.eliminar('OPCION', condiciones, (err: any, affectedRows: any) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err.sqlMessage,
                    detalle: err
                });
            }

            res.json({
                error: false,
                affectedRows: affectedRows
            });

        });
    }



    /**
     * Retorna el menú al que tiene acceso el usuario 
     * @param req 
     * @param res 
     */
    public async getMenuOpcionesUsuario(req: Request, res: Response) {
        const COD_PERF = req.body.COD_USUA;
        const querySistema = `SELECT * FROM perfil_opcion a inner join opcion b on a.COD_OPCI= b.COD_OPCI where b.OPC_COD_OPCI= 1 and a.COD_PERF=${COD_PERF}`;
        const queryProductos =  `SELECT * FROM perfil_opcion a inner join opcion b on a.COD_OPCI= b.COD_OPCI where b.OPC_COD_OPCI= 2 and a.COD_PERF=${COD_PERF}`;
        const queryCotizacion =  `SELECT * FROM perfil_opcion a inner join opcion b on a.COD_OPCI= b.COD_OPCI where b.OPC_COD_OPCI= 3 and a.COD_PERF=${COD_PERF}`;

        let menuOpciones: any = [];

        let listSistema: any = await new Promise(resolve => {
            MySQL.consultar(querySistema, (err: any, data: Object[]) => {
                if (data !== null) {
                    const resul: any = data;
                    resolve(resul);
                }
                else {
                    resolve(null);
                }
            });
        });


        let listProductos: any = await new Promise(resolve => {
            MySQL.consultar(queryProductos, (err: any, data: Object[]) => {
                if (data !== null) {
                    const resul: any = data;
                    resolve(resul);
                }
                else {
                    resolve(null);
                }
            });
        });


        let listCotizacion: any = await new Promise(resolve => {
            MySQL.consultar(queryCotizacion, (err: any, data: Object[]) => {
                if (data !== null) {
                    const resul: any = data;
                    resolve(resul);
                }
                else {
                    resolve(null);
                }
            });
        });


        //Arma array de respuesta para el menú
        if (listSistema) {
            let child = [];
            for (let actual of listSistema) {
                const resul: any = actual;
                let aux1: any = {
                    label: resul.NOMBRE_OPCI,
                    icon: resul.ICONO_OPCI,
                    path: resul.PATH_OPCI,
                    command: null,
                }
                child.push(aux1);
            }
            let menu = {
                label: 'SISTEMA',
                icon: '',
                expanded: true,
                items: child
            }
            menuOpciones.push(menu);
        }

        if (listProductos) {
            let child = [];
            for (let actual of listProductos) {
                const resul: any = actual;
                let aux1: any = {
                    label: resul.NOMBRE_OPCI,
                    icon: resul.ICONO_OPCI,
                    path: resul.PATH_OPCI,
                    command: null,
                }
                child.push(aux1);
            }
            let menu = {
                label: 'PRODUCTOS',
                icon: '',
                expanded: true,
                items: child
            }
            menuOpciones.push(menu);
        }

        if (listCotizacion) {
            let child = [];
            for (let actual of listCotizacion) {
                const resul: any = actual;
                let aux1: any = {
                    label: resul.NOMBRE_OPCI,
                    icon: resul.ICONO_OPCI,
                    path: resul.PATH_OPCI,
                    command: null,
                }
                child.push(aux1);
            }
            let menu = {
                label: 'COTIZACIONES',
                icon: '',
                expanded: true,
                items: child
            }
            menuOpciones.push(menu);
        }

        res.json({
            error: false,
            datos: menuOpciones
        });

    }


    public getPermisosPerfil(req: Request, res: Response) {
        const COD_PERF = req.body.COD_PERF;
        const query = `SELECT * FROM perfil_opcion a
        INNER JOIN opcion b on a.COD_OPCI = b.COD_OPCI
        WHERE COD_PERF= ${COD_PERF}  `;
        MySQL.consultar(query, (err: any, data: Object[]) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err.sqlMessage,
                    detalle: err
                });
            }
            res.json({
                error: false,
                datos: data
            });
        });
    }


    public getDatosEmpresa(req: Request, res: Response) {
        const query = `SELECT * FROM EMPRESA `;
        MySQL.consultar(query, (err: any, data: Object[]) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err.sqlMessage,
                    detalle: err
                });
            }
            res.json({
                error: false,
                datos: data[0]
            });
        });
    }

    public actualizarDatosEmpresa(req: Request, res: Response) {
        const campos = {
            NOMBRE_EMPR: req.body.NOMBRE_EMPR,
            CORREO_EMPR: req.body.CORREO_EMPR,
            DIRECCION_EMPR: req.body.DIRECCION_EMPR,
            TELEFONO_EMPR: req.body.TELEFONO_EMPR,
            RUC_EMPR: req.body.RUC_EMPR,
            RAZON_SOCIAL_EMPR: req.body.RAZON_SOCIAL_EMPR,
            CONTABILIDAD_EMPR: req.body.CONTABILIDAD_EMPR,
            LONGITUD_EMPR: req.body.LONGITUD_EMPR,
            LATITUD_EMPR: req.body.LATITUD_EMPR,
            LOGO_EMPR: req.body.LOGO_EMPR,
        };
        const condiciones = {
            COD_EMPR: req.params.id
        };
        MySQL.actualizar('EMPRESA', campos, condiciones, (err: any, changedRows: any) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err.sqlMessage,
                    detalle: err
                });
            }

            res.json({
                error: false,
                changedRows: changedRows
            });

        });
    }

    public buscarPerfilPorId(req: Request, res: Response) {
        const id = {
            COD_PERF: req.params.id
        };
        MySQL.buscarPorId('PERFIL', id, (err: any, data: Object[]) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err.sqlMessage,
                    detalle: err
                });
            }
            res.json({
                error: false,
                datos: data
            });

        });
    }

    public eliminarPerfil(req: Request, res: Response) {
        const condiciones = {
            COD_PERF: req.params.id
        };
        MySQL.eliminar('PERFIL', condiciones, (err: any, affectedRows: any) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err.sqlMessage,
                    detalle: err
                });
            }

            res.json({
                error: false,
                affectedRows: affectedRows
            });

        });
    }

    public actualizarPerfil(req: Request, res: Response) {
        const campos = {
            NOMBRE_PERF: req.body.NOMBRE_PERF,
            DESCRIPCION_PERF: req.body.DESCRIPCION_PERF,
            ACTIVO_PERF: req.body.ACTIVO_PERF,
        };
        const condiciones = {
            COD_PERF: req.params.id
        };
        MySQL.actualizar('PERFIL', campos, condiciones, (err: any, changedRows: any) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err.sqlMessage,
                    detalle: err
                });
            }

            res.json({
                error: false,
                changedRows: changedRows
            });

        });
    }


    public crearPerfil(req: Request, res: Response) {
        const campos = {
            NOMBRE_PERF: req.body.NOMBRE_PERF,
            DESCRIPCION_PERF: req.body.DESCRIPCION_PERF,
            ACTIVO_PERF: req.body.ACTIVO_PERF,
        };
        MySQL.insertar('PERFIL', campos, (err: any, insertId: any) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err.sqlMessage,
                    detalle: err
                });
            }
            res.json({
                error: false,
                insertId: insertId
            });
        });
    }




    public buscarParametroPorId(req: Request, res: Response) {
        const id = {
            NEMONICO_PARA: req.params.id
        };
        MySQL.buscarPorId('PARAMETRO', id, (err: any, data: Object[]) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err.sqlMessage,
                    detalle: err
                });
            }
            res.json({
                error: false,
                datos: data
            });

        });
    }

    public actualizarParametro(req: Request, res: Response) {
        const campos = {
            DESCRIPCION_PARA: req.body.DESCRIPCION_PARA,
            VALOR_PARA: req.body.VALOR_PARA,
            ACTIVO_PARA: req.body.ACTIVO_PARA,
        };
        const condiciones = {
            NEMONICO_PARA: req.params.id
        };
        MySQL.actualizar('PARAMETRO', campos, condiciones, (err: any, changedRows: any) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err.sqlMessage,
                    detalle: err
                });
            }

            res.json({
                error: false,
                changedRows: changedRows
            });

        });
    }





    public buscarOpcionPorId(req: Request, res: Response) {
        const id = {
            COD_OPCI: req.params.id
        };
        MySQL.buscarPorId('OPCION', id, (err: any, data: Object[]) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err.sqlMessage,
                    detalle: err
                });
            }
            res.json({
                error: false,
                datos: data
            });

        });
    }

    public actualizarOpcion(req: Request, res: Response) {
        const campos = {
            NOMBRE_OPCI: req.body.NOMBRE_OPCI,
            DETALLE_OPCI: req.body.DETALLE_OPCI,
            PATH_OPCI: req.body.PATH_OPCI,
            ICONO_OPCI: req.body.ICONO_OPCI,
            OPC_COD_OPCI: req.body.OPC_COD_OPCI,
            ACTIVO_OPCI: req.body.ACTIVO_OPCI,
        };
        const condiciones = {
            COD_OPCI: req.params.id
        };
        MySQL.actualizar('OPCION', campos, condiciones, (err: any, changedRows: any) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err.sqlMessage,
                    detalle: err
                });
            }

            res.json({
                error: false,
                changedRows: changedRows
            });

        });
    }



    public async guardarPermisos(req: Request, res: Response) {


        const condicion = {
            COD_PERF: req.params.id
        };
         //Elimina detalles existentes
         await new Promise(resolve => {
            MySQL.eliminar('PERFIL_OPCION', condicion, (err: any, affectedRows: any) => {
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

        let detalles = req.body.DETALLES;
        for (let actual in detalles) {
            let fila: any = detalles[actual];

            const campos = {
                COD_PERF: fila.COD_PERF,
                COD_OPCI: fila.COD_OPCI,
                ACTIVO_PEOP: true
            };
            await new Promise(resolve => {
                MySQL.insertar('PERFIL_OPCION', campos, (err: any, insertId: any) => {
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
            mensaje: 'ok'
        });



    }


}



const sistemaCtrl = new SistemaCtrl();
export default sistemaCtrl;
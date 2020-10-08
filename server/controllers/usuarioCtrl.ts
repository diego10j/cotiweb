import { Request, Response } from 'express';
import MySQL from '../mysql/mysql';
import bcrypt from 'bcrypt';
import Token from '../classes/token';


class UsuarioCtrl {

    public static tabla: string = 'USUARIO';

    public listar(req: Request, res: Response) {
        const query = `SELECT COD_USUA,NOMBRE_USUA,LOGIN_USUA,NOMBRE_PERF,CORREO_USUA,TELEFONO_USUA,ACTIVO_USUA 
        FROM ${UsuarioCtrl.tabla} a 
        INNER JOIN PERFIL b on a.COD_PERF = b.COD_PERF 
        ORDER BY NOMBRE_USUA`;
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
        const id = {
            COD_USUA: req.params.id
        };
        MySQL.buscarPorId(UsuarioCtrl.tabla, id, (err: any, data: Object[]) => {
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


    public crear(req: Request, res: Response) {
        const campos = {
            COD_PERF: req.body.COD_PERF,
            NOMBRE_USUA: req.body.NOMBRE_USUA,
            LOGIN_USUA: req.body.LOGIN_USUA,
            CLAVE_USUA: bcrypt.hashSync(req.body.CLAVE_USUA, 10),
            CORREO_USUA: req.body.CORREO_USUA,
            TELEFONO_USUA: req.body.TELEFONO_USUA,
            ACTIVO_USUA: true,
            AVATAR_USUA: req.body.AVATAR_USUA,
            CAMBIA_CLAVE: true
        };
        MySQL.insertar(UsuarioCtrl.tabla, campos, (err: any, insertId: any) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err
                });
            }
            res.json({
                error: false,
                insertId: insertId
            });
        });
    }


    public eliminar(req: Request, res: Response) {
        const condiciones = {
            COD_USUA: req.params.id
        };
        MySQL.eliminar(UsuarioCtrl.tabla, condiciones, (err: any, affectedRows: any) => {
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
        const campos = {
            COD_PERF: req.body.COD_PERF,
            NOMBRE_USUA: req.body.NOMBRE_USUA,
            LOGIN_USUA: req.body.LOGIN_USUA,
            CORREO_USUA: req.body.CORREO_USUA,
            TELEFONO_USUA: req.body.TELEFONO_USUA,
            ACTIVO_USUA: true, //CAMBIAR
            AVATAR_USUA: req.body.AVATAR_USUA,
            CAMBIA_CLAVE: true
        };
        const condiciones = {
            COD_USUA: req.params.id
        };
        MySQL.actualizar(UsuarioCtrl.tabla, campos, condiciones, (err: any, changedRows: any) => {
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


      public login(req: Request, res: Response) {
        const condicion = {
            LOGIN_USUA: req.body.usuario
        };
        const CLAVE_USUA = req.body.clave;

        MySQL.consultarTabla(UsuarioCtrl.tabla, condicion, async (err: any, data: any[]) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err
                });
            }
            if (data !== null) {

                if (bcrypt.compareSync(CLAVE_USUA, data[0].CLAVE_USUA)) {
                    const tokenUser = Token.getJwtToken({
                        COD_USUA: data[0].COD_USUA,
                        LOGIN_USUA: data[0].LOGIN_USUA
                    });


                    ////menu
                    const COD_PERF= data[0].COD_PERF;

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


                    ////


                    res.json({
                        error: false,
                        token: tokenUser,
                        datos: {
                            COD_USUA: data[0].COD_USUA,
                            COD_PERF: data[0].COD_PERF,
                            NOMBRE_USUA: data[0].NOMBRE_USUA,
                            LOGIN_USUA: data[0].LOGIN_USUA,
                            CORREO_USUA: data[0].CORREO_USUA,
                            TELEFONO_USUA: data[0].TELEFONO_USUA,
                            AVATAR_USUA: data[0].AVATAR_USUA,
                            MENU: menuOpciones,
                        }
                    });
                } else {
                    return res.json({
                        error: true,
                        mensaje: 'Usuario/contraseña no son correctos'
                    });
                }
            }
            else {
                return res.json({
                    error: true,
                    mensaje: 'Usuario/contraseña no son correctos'
                });
            }
        });
    }


    public verificaToken(req: any, res: Response) {
        const usuario = req.usuario;
        res.json({
            error: false,
            datos: usuario
        });
    }



    public getVendedores(req: Request, res: Response) {
        const query = `SELECT COD_USUA,NOMBRE_USUA,LOGIN_USUA,NOMBRE_PERF,CORREO_USUA,TELEFONO_USUA,ACTIVO_USUA 
        FROM ${UsuarioCtrl.tabla} a 
        INNER JOIN PERFIL b on a.COD_PERF = b.COD_PERF 
        WHERE a.COD_PERF = 2
        ORDER BY NOMBRE_USUA`;
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

const usuarioCtrl = new UsuarioCtrl();
export default usuarioCtrl;
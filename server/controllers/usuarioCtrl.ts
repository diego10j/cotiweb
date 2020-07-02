import { Request, Response } from 'express';
import MySQL from '../mysql/mysql';
import bcrypt from 'bcrypt';
import Token from '../classes/token';


class UsuarioCtrl {

    public static tabla :string='USUARIO';

    public listar(req: Request, res: Response) {
        const query = `SELECT * FROM ${UsuarioCtrl.tabla}`;
        MySQL.consultar(query, (err: any, data: Object[]) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err
                });
            }
            if (data !== null) {
                res.json({
                    error: false,
                    data: data
                });
            }
            else {
                res.json({
                    error: false,
                    data: null,
                    mensaje: 'No existen registros'
                });
            }
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
            if (data !== null) {
                res.json({
                    error: false,
                    data: data
                });
            }
            else {
                res.json({
                    error: false,
                    datos: null,
                    mensaje: 'No existen registros'
                });
            }
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
            else {
                res.json({
                    error: false,
                    insertId: insertId
                });
            }
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
            else {
                res.json({
                    error: false,
                    affectedRows: affectedRows
                });
            }
        });
    }

    public actualizar(req: Request, res: Response) {
        const campos = {
            NOMBRE_USUA: req.body.NOMBRE_USUA,
            LOGIN_USUA: req.body.LOGIN_USUA
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
            else {
                res.json({
                    error: false,
                    changedRows: changedRows
                });
            }
        });
    }


    public login(req: Request, res: Response) {
        const condicion = {
            LOGIN_USUA: req.body.usuario
        };
        const CLAVE_USUA = req.body.clave;

        MySQL.consultarTabla(UsuarioCtrl.tabla, condicion, (err: any, data: any[]) => {
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
                    res.json({
                        error: false,
                        token: tokenUser,
                        datos:{
                            COD_USUA: data[0].COD_USUA,
                            COD_PERF: data[0].COD_PERF,
                            NOMBRE_USUA: data[0].NOMBRE_USUA,
                            LOGIN_USUA: data[0].LOGIN_USUA,
                            CORREO_USUA: data[0].CORREO_USUA,
                            TELEFONO_USUA: data[0].TELEFONO_USUA,
                            AVATAR_USUA: data[0].AVATAR_USUA,
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
            datos:usuario
        });
    }

}

const usuarioCtrl = new UsuarioCtrl();
export default usuarioCtrl;
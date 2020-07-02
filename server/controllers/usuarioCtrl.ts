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
                    ok: false,
                    error: err
                });
            }
            if (data !== null) {
                res.json({
                    ok: true,
                    data: data
                });
            }
            else {
                res.json({
                    ok: true,
                    data: null,
                    error: 'No existen registros'
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
                    ok: false,
                    error: err
                });
            }
            if (data !== null) {
                res.json({
                    ok: true,
                    data: data
                });
            }
            else {
                res.json({
                    ok: true,
                    data: null,
                    error: 'No existen registros'
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
                    ok: false,
                    error: err
                });
            }
            else {
                res.json({
                    ok: true,
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
                    ok: false,
                    error: err
                });
            }
            else {
                res.json({
                    ok: true,
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
                    ok: false,
                    error: err
                });
            }
            else {
                res.json({
                    ok: true,
                    changedRows: changedRows
                });
            }
        });
    }


    public login(req: Request, res: Response) {

        const condicion = {
            LOGIN_USUA: req.body.LOGIN_USUA
        };
        const CLAVE_USUA = req.body.CLAVE_USUA;

        MySQL.consultarTabla(UsuarioCtrl.tabla, condicion, (err: any, data: any[]) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    error: err
                });
            }
            if (data !== null) {
                if (bcrypt.compareSync(CLAVE_USUA, data[0].CLAVE_USUA)) {
                    const tokenUser = Token.getJwtToken({
                        COD_USUA: data[0].COD_USUA,
                        LOGIN_USUA: data[0].LOGIN_USUA
                    });
                    res.json({
                        ok: true,
                        token: tokenUser
                    });
                } else {
                    return res.json({
                        ok: false,
                        mensaje: 'Usuario/contraseña no son correctos'
                    });
                }
            }
            else {
                return res.json({
                    ok: false,
                    mensaje: 'Usuario/contraseña no son correctos'
                });
            }
        });
    }


    public verificaToken(req: any, res: Response) {
        const usuario = req.usuario;
        res.json({
            ok: true,
            usuario
        });
    }

}

const usuarioCtrl = new UsuarioCtrl();
export default usuarioCtrl;
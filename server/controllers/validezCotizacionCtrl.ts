import { Request, Response } from 'express';
import MySQL from '../mysql/mysql';


class ValidezCotizacionCtrl {

    public static tabla :string='VALIDEZ_COTIZACION';

    public listar(req: Request, res: Response) {
        const query = `SELECT * FROM ${ValidezCotizacionCtrl.tabla}`;
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

    public buscarPorId(req: Request, res: Response) {
        const id = {
            COD_VACO: req.params.id
        };
        MySQL.buscarPorId(ValidezCotizacionCtrl.tabla, id, (err: any, data: Object[]) => {
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


    public crear(req: Request, res: Response) {
        const campos = {
            NOMBRE_VACO: req.body.NOMBRE_VACO,
            DIAS_VACO: req.body.DIAS_VACO,
            ACTIVO_VACO: true
        };
        MySQL.insertar(ValidezCotizacionCtrl.tabla, campos, (err: any, insertId: any) => {
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


    public eliminar(req: Request, res: Response) {
        const condiciones = {
            COD_VACO: req.params.id
        };
        MySQL.eliminar(ValidezCotizacionCtrl.tabla, condiciones, (err: any, affectedRows: any) => {
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

    public actualizar(req: Request, res: Response) {
        const campos = {
            NOMBRE_VACO: req.body.NOMBRE_VACO,
            DIAS_VACO: req.body.DIAS_ESCO,
            ACTIVO_VACO: req.body.ACTIVO_VACO,
        };
        const condiciones = {
            COD_VACO: req.params.id
        };
        MySQL.actualizar(ValidezCotizacionCtrl.tabla, campos, condiciones, (err: any, changedRows: any) => {
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
}

const validezCotizacionCtrl = new ValidezCotizacionCtrl();
export default validezCotizacionCtrl;
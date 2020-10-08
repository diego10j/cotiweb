import { Request, Response } from 'express';
import MySQL from '../mysql/mysql';


class EstadoCotizacionCtrl {

    public static tabla :string='ESTADO_COTIZACION';

    public listar(req: Request, res: Response) {
        const query = `SELECT * FROM ${EstadoCotizacionCtrl.tabla}`;
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
            COD_ESCO: req.params.id
        };
        MySQL.buscarPorId(EstadoCotizacionCtrl.tabla, id, (err: any, data: Object[]) => {
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
            NOMBRE_ESCO: req.body.NOMBRE_ESCO,
            DESCRIPCION_ESCO: req.body.DESCRIPCION_ESCO,
            ACTIVO_ESCO: true
        };
        MySQL.insertar(EstadoCotizacionCtrl.tabla, campos, (err: any, insertId: any) => {
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
            COD_ESCO: req.params.id
        };
        MySQL.eliminar(EstadoCotizacionCtrl.tabla, condiciones, (err: any, affectedRows: any) => {
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
            NOMBRE_ESCO: req.body.NOMBRE_ESCO,
            DESCRIPCION_ESCO: req.body.DESCRIPCION_ESCO,
            ACTIVO_ESCO: req.body.ACTIVO_ESCO,
        };
        const condiciones = {
            COD_ESCO: req.params.id
        };
        MySQL.actualizar(EstadoCotizacionCtrl.tabla, campos, condiciones, (err: any, changedRows: any) => {
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

const estadoCotizacionCtrl = new EstadoCotizacionCtrl();
export default estadoCotizacionCtrl;
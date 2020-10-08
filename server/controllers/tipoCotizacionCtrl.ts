import { Request, Response } from 'express';
import MySQL from '../mysql/mysql';


class TipoCotizacionCtrl {

    public static tabla :string='TIPO_COTIZACION';

    public listar(req: Request, res: Response) {
        const query = `SELECT * FROM ${TipoCotizacionCtrl.tabla}`;
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
            COD_TICO: req.params.id
        };
        MySQL.buscarPorId(TipoCotizacionCtrl.tabla, id, (err: any, data: Object[]) => {
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
            NOMBRE_TICO: req.body.NOMBRE_TICO,
            ACTIVO_TICO: true
        };
        MySQL.insertar(TipoCotizacionCtrl.tabla, campos, (err: any, insertId: any) => {
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
            COD_TICO: req.params.id
        };
        MySQL.eliminar(TipoCotizacionCtrl.tabla, condiciones, (err: any, affectedRows: any) => {
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
            NOMBRE_TICO: req.body.NOMBRE_TICO,
            ACTIVO_TICO: req.body.ACTIVO_TICO,
        };
        const condiciones = {
            COD_TICO: req.params.id
        };
        MySQL.actualizar(TipoCotizacionCtrl.tabla, campos, condiciones, (err: any, changedRows: any) => {
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

const tipoCotizacionCtrl = new TipoCotizacionCtrl();
export default tipoCotizacionCtrl;
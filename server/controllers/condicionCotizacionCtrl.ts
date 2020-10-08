import { Request, Response } from 'express';
import MySQL from '../mysql/mysql';


class CondicionCotizacionCtrl {

    public static tabla :string='CONDICION_COTIZACION';

    public listar(req: Request, res: Response) {
        const query = `SELECT * FROM ${CondicionCotizacionCtrl.tabla}`;
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
            COD_COCO: req.params.id
        };
        MySQL.buscarPorId(CondicionCotizacionCtrl.tabla, id, (err: any, data: Object[]) => {
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
            NOMBRE_COCO: req.body.NOMBRE_COCO,
            ACTIVO_COCO: true
        };
        MySQL.insertar(CondicionCotizacionCtrl.tabla, campos, (err: any, insertId: any) => {
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
            COD_COCO: req.params.id
        };
        MySQL.eliminar(CondicionCotizacionCtrl.tabla, condiciones, (err: any, affectedRows: any) => {
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
            NOMBRE_COCO: req.body.NOMBRE_COCO,
            ACTIVO_COCO: req.body.ACTIVO_COCO,
        };
        const condiciones = {
            COD_COCO: req.params.id
        };
        MySQL.actualizar(CondicionCotizacionCtrl.tabla, campos, condiciones, (err: any, changedRows: any) => {
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

const condicionCotizacionCtrl = new CondicionCotizacionCtrl();
export default condicionCotizacionCtrl;
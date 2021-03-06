import { Request, Response } from 'express';
import MySQL from '../mysql/mysql';


class UnidadMedidaCtrl {

    public static tabla: string = 'UNIDAD_MEDIDA';

    public listar(req: Request, res: Response) {
        const query = `SELECT * FROM ${UnidadMedidaCtrl.tabla}`;
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
            COD_UNID: req.params.id
        };
        MySQL.buscarPorId(UnidadMedidaCtrl.tabla, id, (err: any, data: Object[]) => {
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
            NOMBRE_UNID: req.body.NOMBRE_UNID,
            SIMBOLO_UNID: req.body.SIMBOLO_UNID,
            ACTIVO_UNID: true
        };
        MySQL.insertar(UnidadMedidaCtrl.tabla, campos, (err: any, insertId: any) => {
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
            COD_UNID: req.params.id
        };
        MySQL.eliminar(UnidadMedidaCtrl.tabla, condiciones, (err: any, affectedRows: any) => {
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
            NOMBRE_UNID: req.body.NOMBRE_UNID,
            SIMBOLO_UNID: req.body.SIMBOLO_UNID,
            ACTIVO_UNID: req.body.ACTIVO_UNID
        };
        const condiciones = {
            COD_UNID: req.params.id
        };
        MySQL.actualizar(UnidadMedidaCtrl.tabla, campos, condiciones, (err: any, changedRows: any) => {
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

const unidadMedidaCtrl = new UnidadMedidaCtrl();
export default unidadMedidaCtrl;
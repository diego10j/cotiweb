import { Request, Response } from 'express';
import MySQL from '../mysql/mysql';


class TipoProductoCtrl {

    public static tabla :string='TIPO_PRODUCTO';

    public listar(req: Request, res: Response) {
        const query = `SELECT * FROM ${TipoProductoCtrl.tabla}`;
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
            COD_TIPR: req.params.id
        };
        MySQL.buscarPorId(TipoProductoCtrl.tabla, id, (err: any, data: Object[]) => {
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
            NOMBRE_TIPR: req.body.NOMBRE_TIPR,
            DESCRIPCION_TPR: req.body.DESCRIPCION_TPR,
            ACTIVO_TIPR: true
        };
        MySQL.insertar(TipoProductoCtrl.tabla, campos, (err: any, insertId: any) => {
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
            COD_TIPR: req.params.id
        };
        MySQL.eliminar(TipoProductoCtrl.tabla, condiciones, (err: any, affectedRows: any) => {
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
            NOMBRE_TIPR: req.body.NOMBRE_TIPR,
            DESCRIPCION_TPR: req.body.DESCRIPCION_TIPR,
            ACTIVO_TIPR: req.body.ACTIVO_TIPR,
        };
        const condiciones = {
            COD_TIPR: req.params.id
        };
        MySQL.actualizar(TipoProductoCtrl.tabla, campos, condiciones, (err: any, changedRows: any) => {
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
}

const tipoProductoCtrl = new TipoProductoCtrl();
export default tipoProductoCtrl;
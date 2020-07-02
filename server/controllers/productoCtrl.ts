import { Request, Response } from 'express';
import MySQL from '../mysql/mysql';


class ProductoCtrl {

    public static tabla: string = 'PRODUCTO';

    public listar(req: Request, res: Response) {
        const query = `SELECT * FROM ${ProductoCtrl.tabla} ORDER BY NOMBRE_PROD`;
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


    public getProductosPorTipo(req: Request, res: Response) {
        const COD_TIPR = MySQL.escape(req.body.COD_TIPR);        
        const query = `SELECT * FROM ${ProductoCtrl.tabla} WHERE COD_TIPR = ${COD_TIPR} ORDER BY NOMBRE_PROD` ;
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
            COD_PROD: req.params.id
        };
        MySQL.buscarPorId(ProductoCtrl.tabla, id, (err: any, data: Object[]) => {
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
            COD_TIPR: req.body.COD_TIPR,
            COD_UNID: req.body.COD_UNID,
            NOMBRE_PROD: req.body.NOMBRE_PROD,
            DESCRIPCION_PROD: req.body.DESCRIPCION_PROD,
            COD_AUX_PROD: req.body.COD_AUX_PROD,
            ACTIVO_PROD: true
        };
        MySQL.insertar(ProductoCtrl.tabla, campos, (err: any, insertId: any) => {
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
            COD_PROD: req.params.id
        };
        MySQL.eliminar(ProductoCtrl.tabla, condiciones, (err: any, affectedRows: any) => {
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
            COD_TIPR: req.body.COD_TIPR,
            COD_UNID: req.body.COD_UNID,
            NOMBRE_PROD: req.body.NOMBRE_PROD,
            DESCRIPCION_PROD: req.body.DESCRIPCION_PROD,
            COD_AUX_PROD: req.body.COD_AUX_PROD,
            ACTIVO_PROD: req.body.ACTIVO_PROD,
        };
        const condiciones = {
            COD_PROD: req.params.id
        };
        MySQL.actualizar(ProductoCtrl.tabla, campos, condiciones, (err: any, changedRows: any) => {
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

const productoCtrl = new ProductoCtrl();
export default productoCtrl;
import { Request, Response } from 'express';
import MySQL from '../mysql/mysql';


class ProductoCtrl {

    public static tabla: string = 'PRODUCTO';

    public listar(req: Request, res: Response) {
        const query = `SELECT a.COD_PROD,NOMBRE_PROD,NOMBRE_TIPR,NOMBRE_UNID,PATH_ARCH,IMAGEN_PROD,a.COD_UNID  
        FROM ${ProductoCtrl.tabla} a 
        LEFT JOIN ARCHIVO_PRODUCTO b on a.COD_PROD = b.COD_PROD and IMAGEN_ARCH=true
        LEFT JOIN TIPO_PRODUCTO c on a.COD_TIPR = c.COD_TIPR 
        LEFT JOIN UNIDAD_MEDIDA d on a.COD_UNID = d.COD_UNID 
        ORDER BY NOMBRE_PROD`; 
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


    public getProductosPorTipo(req: Request, res: Response) {
        let condicion ="";
        if (req.body.COD_TIPR ) {
                condicion = ' AND a.COD_TIPR IN ('+req.body.COD_TIPR+")";
        }
        const query = `SELECT a.COD_PROD,NOMBRE_PROD,NOMBRE_TIPR,NOMBRE_UNID,PATH_ARCH,IMAGEN_PROD,a.COD_UNID 
        FROM ${ProductoCtrl.tabla} a 
        LEFT JOIN ARCHIVO_PRODUCTO b on a.COD_PROD = b.COD_PROD and IMAGEN_ARCH=true
        LEFT JOIN TIPO_PRODUCTO c on a.COD_TIPR = c.COD_TIPR 
        LEFT JOIN UNIDAD_MEDIDA d on a.COD_UNID = d.COD_UNID
        WHERE 1=1 ${condicion} 
        ORDER BY NOMBRE_PROD`;

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

        let condicion ="";
        if (req.params.id ) {
                condicion = ' WHERE a.COD_PROD IN ('+req.params.id+")";
        }
        const query = `SELECT a.COD_PROD,NOMBRE_PROD,NOMBRE_TIPR,NOMBRE_UNID,DESCRIPCION_PROD,IMAGEN_PROD,a.COD_UNID 
        FROM ${ProductoCtrl.tabla} a 
        LEFT JOIN TIPO_PRODUCTO c on a.COD_TIPR = c.COD_TIPR 
        LEFT JOIN UNIDAD_MEDIDA d on a.COD_UNID = d.COD_UNID
        ${condicion} 
        ORDER BY NOMBRE_PROD`;

        MySQL.consultar(query, (err: any, data: Object[]) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err
                });
            }
            res.json({
                error: false,
                datos: data[0]
            });
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
            COD_PROD: req.params.id
        };
        MySQL.eliminar(ProductoCtrl.tabla, condiciones, (err: any, affectedRows: any) => {
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
}

const productoCtrl = new ProductoCtrl();
export default productoCtrl;
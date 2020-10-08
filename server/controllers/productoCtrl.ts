import { Request, Response } from 'express';
import MySQL from '../mysql/mysql';


class ProductoCtrl {

    public static tabla: string = 'PRODUCTO';

    public listar(req: Request, res: Response) {
        const query = `SELECT a.COD_PROD,NOMBRE_PROD,IMAGEN_PROD
        FROM ${ProductoCtrl.tabla} a 
        ORDER BY NOMBRE_PROD`;
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


    public getProductosPorCategoria(req: Request, res: Response) {
        let condicion = "";
        if (req.body.COD_TIPR) {
            condicion = ' AND a.COD_PROD IN ( select COD_PROD FROM DET_TIPO_PRODUCTO WHERE COD_TIPR IN  (' + req.body.COD_TIPR + ") )";
        }
        const query = `SELECT a.COD_PROD,NOMBRE_PROD,IMAGEN_PROD
        FROM ${ProductoCtrl.tabla} a 
        WHERE 1=1 ${condicion} 
        GROUP BY a.COD_PROD,NOMBRE_PROD,IMAGEN_PROD
        ORDER BY NOMBRE_PROD`;

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

        let condicion = "";
        if (req.params.id) {
            condicion = ' WHERE a.COD_PROD IN (' + req.params.id + ")";
        }
        const query = `SELECT a.COD_PROD,NOMBRE_PROD,NOMBRE_UNID,DESCRIPCION_PROD,IMAGEN_PROD,a.COD_UNID,a.COD_AUX_PROD,a.ACTIVO_PROD,a.CANT_MIN_PROD 
        FROM ${ProductoCtrl.tabla} a 
        LEFT JOIN UNIDAD_MEDIDA d on a.COD_UNID = d.COD_UNID
        ${condicion} 
        ORDER BY NOMBRE_PROD`;

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
                datos: data[0]
            });
        });
    }


    public async crear(req: Request, res: Response) {
        const campos = {
            COD_TIPR: req.body.COD_TIPR,
            COD_UNID: req.body.COD_UNID,
            NOMBRE_PROD: req.body.NOMBRE_PROD,
            DESCRIPCION_PROD: req.body.DESCRIPCION_PROD,
            COD_AUX_PROD: req.body.COD_AUX_PROD,
            IMAGEN_PROD: req.body.IMAGEN_PROD,
            CANT_MIN_PROD: req.body.CANT_MIN_PROD,
            ACTIVO_PROD: true
        };
        let COD_PROD = await new Promise(resolve => {
            MySQL.insertar(ProductoCtrl.tabla, campos, (err: any, insertId: any) => {
                if (err) {
                    res.status(400).json({
                        error: true,
                        mensaje: err.sqlMessage,
                        detalle: err
                    });
                }
                resolve(insertId);
            });
        });

        let detalles = req.body.CATEGORIAS;

        for (let actual in detalles) {
            let fila: any = detalles[actual];
            if (fila.IS_CHECKED) {
                const camposDetalle = {
                    COD_PROD: COD_PROD,
                    COD_TIPR: fila.COD_TIPR,

                };
                MySQL.insertar('DET_TIPO_PRODUCTO', camposDetalle, (err: any, insertId: any) => {
                    if (err) {
                        res.status(400).json({
                            error: true,
                            mensaje: 'Error al crear Categorias: ' + err
                        });
                    }
                });
            }
        }
        res.json({
            error: false,
            insertId: COD_PROD
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

    public async actualizar(req: Request, res: Response) {

        const condicion = {
            COD_PROD: req.params.id
        };
        //Elimina detalles existentes
        await new Promise(resolve => {
            MySQL.eliminar('DET_TIPO_PRODUCTO', condicion, (err: any, affectedRows: any) => {
                if (err) {
                    res.status(400).json({
                        error: true,
                        mensaje: err.sqlMessage,
                        detalle: err
                    });
                }
                resolve(affectedRows);
            });
        });
   

        const campos = {
            COD_TIPR: req.body.COD_TIPR,
            COD_UNID: req.body.COD_UNID,
            NOMBRE_PROD: req.body.NOMBRE_PROD,
            DESCRIPCION_PROD: req.body.DESCRIPCION_PROD,
            COD_AUX_PROD: req.body.COD_AUX_PROD,
            IMAGEN_PROD: req.body.IMAGEN_PROD,
            CANT_MIN_PROD: req.body.CANT_MIN_PROD,
            ACTIVO_PROD: req.body.ACTIVO_PROD,
        };

        MySQL.actualizar(ProductoCtrl.tabla, campos, condicion, (err: any, changedRows: any) => {
            if (err) {
                res.status(400).json({
                    error: true,
                    mensaje: err.sqlMessage,
                    detalle: err
                });
            }

            let detalles = req.body.CATEGORIAS;

            for (let actual in detalles) {
                let fila: any = detalles[actual];
                if (fila.IS_CHECKED) {
                    const camposDetalle = {
                        COD_PROD: req.params.id,
                        COD_TIPR: fila.COD_TIPR,
    
                    };
                    MySQL.insertar('DET_TIPO_PRODUCTO', camposDetalle, (err: any, insertId: any) => {
                        if (err) {
                            res.status(400).json({
                                error: true,
                                mensaje: 'Error al crear Categorias: ' + err
                            });
                        }
                    });
                }
            }
           
            res.json({
                error: false,
                changedRows: changedRows
            });

        });
    }

    public getCategoriasProducto(req: Request, res: Response) {
        const COD_PROD = req.params.id;
        const query = `SELECT * FROM det_tipo_producto a
        INNER JOIN tipo_producto b ON a.COD_TIPR = b.COD_TIPR
        WHERE COD_PROD= ${COD_PROD}  `;
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

}

const productoCtrl = new ProductoCtrl();
export default productoCtrl;
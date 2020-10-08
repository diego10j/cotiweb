import { Request, Response } from 'express';
import MySQL from '../mysql/mysql';


class ClienteCtrl {

    public static tabla: string = 'CLIENTE';

    public listar(req: Request, res: Response) {
        const query = `SELECT * FROM ${ClienteCtrl.tabla} a   
        ORDER BY NOMBRES_CLIE`; 
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
            COD_CLIE: req.params.id
        };
        MySQL.buscarPorId(ClienteCtrl.tabla, id, (err: any, data: Object[]) => {
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


    public crear(req: Request, res: Response) {
        const campos = {
            TIPO_ID_CLIE: req.body.TIPO_ID_CLIE,
            IDENTIFICACION_CLIE: req.body.IDENTIFICACION_CLIE,
            NOMBRES_CLIE: req.body.NOMBRES_CLIE,
            CORREO_CLIE: req.body.CORREO_CLIE,
            TELEFONO_CLIE: req.body.TELEFONO_CLIE,
            DIRECCION_CLIE: req.body.DIRECCION_CLIE,
            COORDENADAS_CLIE: req.body.COORDENADAS_CLIE
        };
       // console.log(campos);
        MySQL.insertar(ClienteCtrl.tabla, campos, (err: any, insertId: any) => {
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
            COD_CLIE: req.params.id
        };
        MySQL.eliminar(ClienteCtrl.tabla, condiciones, (err: any, affectedRows: any) => {
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
            TIPO_ID_CLIE: req.body.TIPO_ID_CLIE,
            IDENTIFICACION_CLIE: req.body.IDENTIFICACION_CLIE,
            NOMBRES_CLIE: req.body.NOMBRES_CLIE,
            CORREO_CLIE: req.body.CORREO_CLIE,
            TELEFONO_CLIE: req.body.TELEFONO_CLIE,
            DIRECCION_CLIE: req.body.DIRECCION_CLIE,
            COORDENADAS_CLIE: req.body.COORDENADAS_CLIE
        };
        const condiciones = {
            COD_CLIE: req.params.id
        };
        MySQL.actualizar(ClienteCtrl.tabla, campos, condiciones, (err: any, changedRows: any) => {
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

const clienteCtrl = new ClienteCtrl();
export default clienteCtrl;
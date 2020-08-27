import { Request, Response } from 'express';
import MySQL from '../mysql/mysql';



class SistemaCtrl {

    

    public getCombo(req: Request, res: Response) {
        const tabla = req.body.tabla;
        const campoCodigo = req.body.campoCodigo;     
        const campoLabel = req.body.campoLabel;
        const condicion = req.body.condicion;
        let sqlCondicion= "";
        if(condicion){
            sqlCondicion= " WHERE 1 = 1 AND "+condicion;
        }
        const query = `SELECT ${campoCodigo} AS value, ${campoLabel} AS label 
        FROM ${tabla} 
        ${sqlCondicion} 
        ORDER BY ${campoLabel}`;
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


    public getOpciones(req: Request, res: Response) {
        const query = `SELECT A.COD_OPCI,A.NOMBRE_OPCI,A.ICONO_OPCI,A.PATH_OPCI,B.NOMBRE_OPCI AS GRUPO 
        FROM OPCION A LEFT JOIN OPCION B ON A.OPC_COD_OPCI=B.COD_OPCI order by B.NOMBRE_OPCI, A.NOMBRE_OPCI `;
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

    public getPerfiles(req: Request, res: Response) {
        const query = `SELECT * FROM perfil`;
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


    public getParametros(req: Request, res: Response) {
        const query = `SELECT * FROM parametro`;
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


    public getPermisosPerfil(req: Request, res: Response) {
        const COD_PERF = req.body.COD_PERF;
        const query = `SELECT * FROM perfil_opcion WHERE COD_PERF = ${COD_PERF}  `;
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

}

const sistemaCtrl = new SistemaCtrl();
export default sistemaCtrl;
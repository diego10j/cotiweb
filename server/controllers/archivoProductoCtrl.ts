import { Request, Response } from 'express';
import MySQL from '../mysql/mysql';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from '../classes/file-system';

const fileSystem = new FileSystem();
class ArchivoProductoCtrl {

    public static tabla: string = 'ARCHIVO_PRODUCTO';

    public listar(req: Request, res: Response) {
        const query = `SELECT * FROM ${ArchivoProductoCtrl.tabla}`;
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
            COD_ARCH: req.params.id
        };
        MySQL.buscarPorId(ArchivoProductoCtrl.tabla, id, (err: any, data: Object[]) => {
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
            COD_PERF: req.body.COD_PERF,
            NOMBRE_USUA: req.body.NOMBRE_USUA,
            LOGIN_USUA: req.body.LOGIN_USUA,
            CORREO_USUA: req.body.CORREO_USUA,
            TELEFONO_USUA: req.body.TELEFONO_USUA,
            ACTIVO_USUA: true,
            AVATAR_USUA: req.body.AVATAR_USUA,
            CAMBIA_CLAVE: true
        };
        MySQL.insertar(ArchivoProductoCtrl.tabla, campos, (err: any, insertId: any) => {
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
            COD_ARCH: req.params.id
        };
        MySQL.eliminar(ArchivoProductoCtrl.tabla, condiciones, (err: any, affectedRows: any) => {
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
            NOMBRE_USUA: req.body.NOMBRE_USUA,
            LOGIN_USUA: req.body.LOGIN_USUA
        };
        const condiciones = {
            COD_ARCH: req.params.id
        };
        MySQL.actualizar(ArchivoProductoCtrl.tabla, campos, condiciones, (err: any, changedRows: any) => {
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




    // Servicio para subir archivos
    public async subirImagen (req: any, res: Response) : Promise<any>{

        if (!req.files) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No se subió ningun archivo'
            });
        }

        const file: FileUpload = req.files.image;

        if (!file) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No se subió ningun archivo - image'
            });
        }

        if (!file.mimetype.includes('image')) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Lo que subió no es una imagen'
            });
        }
        
        await fileSystem.guardarImagenTemporal(file, req.usuario.COD_USUA);

        res.json({
            ok: true,
            file: file.mimetype
        });

    }


}

const archivoProductoCtrl = new ArchivoProductoCtrl();
export default archivoProductoCtrl;
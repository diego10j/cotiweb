import { Router } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import archivoProductoCtrl from '../controllers/archivoProductoCtrl';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from '../classes/file-system';
import { Request, Response } from 'express';
const userRoutes = Router();
const fileSystem = new FileSystem();
// Crear
userRoutes.post('/crear', verificaToken, archivoProductoCtrl.crear);

// Eliminar
userRoutes.delete('/eliminar/:id', verificaToken, archivoProductoCtrl.eliminar);

// Actualizar
userRoutes.put('/actualizar/:id', verificaToken, archivoProductoCtrl.actualizar);

//Listar
userRoutes.get('/listar', verificaToken, archivoProductoCtrl.listar);

//Buscar por Id
userRoutes.get('/buscarPorId/:id', verificaToken, archivoProductoCtrl.buscarPorId);

//Buscar por Id
userRoutes.post('/subirImagen', verificaToken,  archivoProductoCtrl.subirImagen);

// Servicio para subir archivos
userRoutes.post( '/upload', verificaToken , async (req: any, res: Response) => {
    
    if ( !req.files ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningun archivo'
        });
    }

    const file: FileUpload = req.files.image;

    if ( !file ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningun archivo - image'
        });
    }

    if ( !file.mimetype.includes('image') ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Lo que subió no es una imagen'
        }); 
    }
    const nombreImagen =await fileSystem.guardarImagen(file);
    res.json({
        ok: true,
        mimetype: file.mimetype,
        nombreImagen
    });
});

userRoutes.get('/imagen/:img', (req: any, res: Response) => {

     const img    = req.params.img;

    const pathFoto = fileSystem.getFotoUrl( img );

    res.sendFile( pathFoto );

});



export default userRoutes;
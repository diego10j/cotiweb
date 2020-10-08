import { FileUpload } from '../interfaces/file-upload';
import fs from 'fs';
import path from 'path';
import uniqid from 'uniqid';

var p = require('path');

export default class FileSystem {

    constructor() { };

    guardarImagen(file: FileUpload) {
        const pathUser = p.resolve(__dirname, '../uploads/');
        return new Promise((resolve, reject) => {
            // Crear carpeta
            const path = this.crearCarpetaProductos();
            // Nombre archivo
            const nombreArchivo = this.generarNombreUnico(file.name);
            // Mover el archivo del Temp a nuestra carpeta
            file.mv(`${path}/${nombreArchivo}`, (err: any) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(nombreArchivo);
                }
            });
        });
    }

    private generarNombreUnico(nombreOriginal: string) {
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1];
        const idUnico = uniqid();
        return `${idUnico}.${extension}`;
    }


    private crearCarpetaProductos() {
        const pathUser = p.resolve(__dirname, '../uploads');
        const pathProductos = pathUser + '/productos';
        const existe = fs.existsSync(pathProductos);
        if (!existe) {
            // fs.mkdirSync( pathUser );
            fs.mkdirSync(pathProductos);
        }
        return pathProductos;
    }

    getFotoUrl(img: string): string {
        // Path Productos
        const pathFoto = p.resolve(__dirname, '../uploads/productos/' + img);
        // Si la imagen existe
        const existe = fs.existsSync(pathFoto);
        if (!existe) {
            return p.resolve(__dirname, '../uploads/productos/imagen.svg');
        }
        return pathFoto;
    }


}
import { Pipe, PipeTransform } from '@angular/core';
import { UtilitarioService } from '../services/utilitario.service';
import { environment } from '../../environments/environment.prod';
const URL = environment.rest_api;
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  
  transform( img: string): string { 
    return `${ URL }/archivoProducto/imagen/${ img }`;
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { UtilitarioService } from '../services/utilitario.service';
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  
  URL_FILESERVER:string;

  constructor(private utilitario: UtilitarioService) { 
    this.URL_FILESERVER =  this.utilitario.getVariableLocalStorage('FILESERVER');

  }

  transform( img: string): string {
    const index = img.indexOf( 'upload/');
    const path  = img.substring(index+6);
    return `${ this.URL_FILESERVER}${ path }`;
  }

}

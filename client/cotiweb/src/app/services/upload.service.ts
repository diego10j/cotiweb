import { Injectable } from '@angular/core';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { UtilitarioService } from './utilitario.service';

@Injectable({
  providedIn: 'root',
})
export class UploadService {

  constructor(private fileTransfer: FileTransfer, private utilitario: UtilitarioService,
  ) { }

  public subirImagen(img: string) {

    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'cotiweb-token': 'cotiweb-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7IkNPRF9VU1VBIjoxMywiTE9HSU5fVVNVQSI6ImRqYWNvbWUifSwiaWF0IjoxNTkzODM2MDczLCJleHAiOjE1OTY0MjgwNzN9.cFmJHYPnj3gzfLZ8_VF_wGDPjNo4_vzphD-GMrKKMhc',
      },
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    const RESTAPI = this.utilitario.getRestApi();
    console.log(RESTAPI + '/archivoProducto/upload');
    fileTransfer.upload(img, RESTAPI + '/archivoProducto/upload', options)
      .then((data) => {
        
        console.log(data);
      }).catch((err) => {
        console.log('error en carga', err);
      });

  }





  
}

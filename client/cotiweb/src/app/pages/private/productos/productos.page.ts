import { Component, OnInit } from '@angular/core';
import { RestResponse } from '../../../interfaces/interfaces';
import { RestService } from '../../../services/rest.service';
import { UtilitarioService } from '../../../services/utilitario.service';
import { MessageService } from 'primeng/api';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  providers: [MessageService],
})
export class ProductosPage {

  public respuesta: RestResponse = this.utilitario.getRestResponse();
  public buscando = false;
  public pagina: number;

  constructor(private restService: RestService,
    private utilitario: UtilitarioService,
    private messageService: MessageService,
    private alertController: AlertController) { }

  public async ionViewWillEnter() {
    this.buscando = true;
    this.pagina = 1;
    this.respuesta = await this.consulta();
    this.buscando = false;
  }

  private consulta(): Promise<RestResponse> {
    return this.restService.consultar('producto/listar', this.pagina);
  }

  public crear() {
    this.utilitario.abrirPagina('crear-producto');
  }

  public modificar(event) {
    const parametros = {
      seleccionado: event.COD_PROD,
    };
    this.utilitario.abrirPagina('modificar-producto', parametros);
  }

  public async eliminar(event) {
    const parametros = {
      seleccionado: event.COD_PROD,
    };
    this.buscando = true;
    const resp: RestResponse = await this.restService.eliminar('producto/eliminar/' + parametros.seleccionado);
    if (resp.error === false) {
      this.messageService.add({ severity: 'success', summary: '', detail: 'Se eliminó correctamente.' });
    }
    this.respuesta = await this.consulta();
    this.buscando = false;
  }

  public async confirmarEliminar(event) {
    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: '¿Seguro desea eliminar el registro seleccionado?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Si',
          handler: () => {
            this.eliminar(event);
          },
        },
      ],
    });
    await alert.present();
  }

}

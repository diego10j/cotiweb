import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { RestService } from '../../../../services/rest.service';
import { UtilitarioService } from '../../../../services/utilitario.service';
import { AlertController } from '@ionic/angular';
import { RestResponse } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-condicion-cotizacion',
  templateUrl: './condicion-cotizacion.page.html',
  styleUrls: ['./condicion-cotizacion.page.scss'],
  providers: [MessageService],
})
export class CondicionCotizacionPage {

  public respuesta: RestResponse = this.utilitario.getRestResponse();
  public buscando = false;
  public pagina: number;
  public listaBreadcrumb: MenuItem[];

  constructor(private restService: RestService,
              private utilitario: UtilitarioService,
              private messageService: MessageService,
              private alertController: AlertController) {
                this.listaBreadcrumb = [
                  { label: 'COTIZACIONES' },
                  { label: 'Condiciones de la Cotización' }
                ];
               }

  public async ionViewWillEnter() {
    this.buscando = true;
    this.pagina = 1;
    this.respuesta = await this.consulta();
    this.buscando = false;
  }

  private consulta(): Promise<RestResponse> {
    return this.restService.consultar('condicionCotizacion/listar', this.pagina);
  }

  public crear() {
    this.utilitario.abrirPagina('crear-condicion-cotizacion');
  }

  public modificar(event) {
    this.utilitario.abrirPaginaPublica('private/modificar-condicion-cotizacion/'+event.COD_COCO);
  }

  public async eliminar(event) {
 
    this.buscando = true;
    const resp : RestResponse = await this.restService.eliminar('condicionCotizacion/eliminar/' + event.COD_COCO);
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

import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { RestResponse } from '../../../../interfaces/interfaces';
import { RestService } from '../../../../services/rest.service';
import { UtilitarioService } from '../../../../services/utilitario.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.page.html',
  styleUrls: ['./unidades.page.scss'],
  providers: [MessageService],
})
export class UnidadesPage {

  public respuesta: RestResponse = this.utilitario.getRestResponse();
  public buscando = false;
  public pagina: number;
  public listaBreadcrumb: MenuItem[];

  constructor(private restService: RestService,
              private utilitario: UtilitarioService,
              private messageService: MessageService,
              private alertController: AlertController) {
                this.listaBreadcrumb = [
                  { label: 'PRODUCTOS' },
                  { label: 'Unidades de Medida' }
                ];
               }

  public async ionViewWillEnter() {
    this.buscando = true;
    this.pagina = 1;
    this.respuesta = await this.consulta();
    this.buscando = false;
  }

  private consulta(): Promise<RestResponse> {
    return this.restService.consultar('unidadMedida/listar', this.pagina);
  }

  public crear() {
    this.utilitario.abrirPagina('crear-unidad');
  }

  public modificar(event) {
    this.utilitario.abrirPaginaPublica('private/modificar-unidad/'+event.COD_UNID);
  }

  public async eliminar(event) {
 
    this.buscando = true;
    const resp : RestResponse = await this.restService.eliminar('unidadMedia/eliminar/' + event.COD_UNID);
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

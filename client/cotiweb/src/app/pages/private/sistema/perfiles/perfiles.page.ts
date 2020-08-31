import { Component } from '@angular/core';
import { RestResponse } from '../../../../interfaces/interfaces';
import { RestService } from '../../../../services/rest.service';
import { UtilitarioService } from '../../../../services/utilitario.service';
import { MessageService, MenuItem } from 'primeng/api';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.page.html',
  styleUrls: ['./perfiles.page.scss'],
  providers: [MessageService],
})
export class PerfilesPage {

  public respuesta: RestResponse = this.utilitario.getRestResponse();
  public buscando = false;
  public pagina: number;
  public listaBreadcrumb: MenuItem[];

  constructor(private restService: RestService,
              private utilitario: UtilitarioService,
              private messageService: MessageService,
              private alertController: AlertController) { 
                this.listaBreadcrumb = [
                  { label: 'SISTEMA' },
                  { label: 'Perfiles' }
                ];
              }

  public async ionViewWillEnter() {
    this.buscando = true;
    this.pagina = 1;
    this.respuesta = await this.consulta();
    this.buscando = false;
  }

  private consulta(): Promise<RestResponse> {
    return this.restService.consultar('sistema/getPerfiles', this.pagina);
  }

  public crear() {
    this.utilitario.abrirPagina('crear-perfil');
  }

  public modificar(event) {
    this.utilitario.abrirPaginaPublica('private/modificar-perfil/' + event.COD_PERF);
  }

  public async eliminar(event) {
    this.buscando = true;
    const resp : RestResponse = await this.restService.eliminar('sistema/eliminarPerfil/' + event.COD_PERF);
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

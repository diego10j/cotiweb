import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MessageService, MenuItem } from 'primeng/api';
import { RestResponse } from '../../../interfaces/interfaces';
import { RestService } from '../../../services/rest.service';
import { UtilitarioService } from '../../../services/utilitario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
  providers: [MessageService],
})
export class UsuariosPage {

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
                  { label: 'Usuarios' }
                ];
              }

  public async ionViewWillEnter() {
    this.buscando = true;
    this.pagina = 1;
    this.respuesta = await this.consulta();
    this.buscando = false;
  }

  private consulta(): Promise<RestResponse> {
    return this.restService.consultar('usuario/listar', this.pagina);
  }

  public crear() {
    this.utilitario.abrirPagina('crear-usuario');
  }

  public modificar(event) {
    this.utilitario.abrirPaginaPublica('private/modificar-usuario/' + event.COD_USUA);
  }

  public async eliminar(event) {
    const parametros = {
      seleccionado: event.COD_USUA,
    };
    this.buscando = true;
    const resp : RestResponse = await this.restService.eliminar('usuario/eliminar/' + parametros.seleccionado);
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

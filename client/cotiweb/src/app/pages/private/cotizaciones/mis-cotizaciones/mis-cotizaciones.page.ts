import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { RestResponse } from '../../../../interfaces/interfaces';
import { RestService } from '../../../../services/rest.service';
import { UtilitarioService } from '../../../../services/utilitario.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mis-cotizaciones',
  templateUrl: './mis-cotizaciones.page.html',
  styleUrls: ['./mis-cotizaciones.page.scss'],
  providers: [MessageService],
})
export class MisCotizacionesPage {

  public respuesta: RestResponse = this.utilitario.getRestResponse();
  public buscando = false;
  public pagina: number;
  public seleccionado: any;
  public listaBreadcrumb: MenuItem[];

  constructor(private restService: RestService,
              private utilitario: UtilitarioService,
              private messageService: MessageService,
              private alertController: AlertController) { 

                this.listaBreadcrumb = [
                  { label: 'COTIZACIONES' },
                  { label: 'Mis Cotizaciones' , routerLink: '/private/mis-cotizaciones'},
                ];
              }

  public async ionViewWillEnter() {
    this.buscando = true;
    this.pagina = 1;
    this.respuesta = await this.consulta();
    this.buscando = false;
  }

  private consulta(): Promise<RestResponse> {
    const COD_USUA = this.utilitario.getVariableLocalStorage('COD_USUA');
    return this.restService.consultar('cotizacion/misCotizaciones/'+COD_USUA, this.pagina);
  }

  public crear() {
    this.utilitario.abrirPagina('crear-cotizacion');
  }

  public async eliminar(event) {
    const parametros = {
      seleccionado: event.COD_USUA,
    };
    this.buscando = true;
    const resp : RestResponse = await this.restService.eliminar('sistema/eliminarPerfil/' + parametros.seleccionado);
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


  public modificar(){
    this.utilitario.abrirPaginaPublica('private/modificar/'+this.seleccionado.COD_CABC);
  }


  async  solicitarAprobacion(){
    if(this.seleccionado.COD_ESCO !== 3){
      this.messageService.add({ severity: 'error', summary: '', detail: 'Solo se puede solictar aprobación las cotizaciones en estado ELABORADO' });
      return;
    }

    const alert = await this.alertController.create({
      header: 'Confirmar!',
      message: 'Está seguro de solicitar la Aprobación la Cotización seleccionada?',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'ACEPTAR',
          handler: async () => {
            

              const campos = { COD_ESCO: 7 }; //POR AUTORIZAR
              const resp = await this.restService.actualizar('cotizacion/asignarEstado/' + this.seleccionado.COD_CABC, campos);
              if (resp.error === false) {
                this.respuesta = await this.consulta();
                this.seleccionado=null;
                this.messageService.add({ severity: 'success', summary: '', detail: 'Se guardo correctamente.' });
              }
            



          }
        }
      ]
    });
    await alert.present();
  }

  async actualizar(){
    this.buscando = true;
    this.pagina = 1;
    this.respuesta = await this.consulta();
    this.buscando = false;
  }

}

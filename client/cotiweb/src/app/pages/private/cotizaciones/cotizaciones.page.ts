import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem, MenuItem } from 'primeng/api';
import { RestResponse } from '../../../interfaces/interfaces';
import { RestService } from '../../../services/rest.service';
import { UtilitarioService } from '../../../services/utilitario.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ConfiguracionPage } from '../../modal/configuracion/configuracion.page';


@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.page.html',
  styleUrls: ['./cotizaciones.page.scss'],
  providers: [MessageService],
})
export class CotizacionesPage {

  public respuesta: RestResponse = this.utilitario.getRestResponse();
  public buscando = false;
  public pagina: number;

  public seleccionado: any;
  public comboEstado: SelectItem[];
  public comboUsuario: SelectItem[];
  public comboTipoCotizacion: SelectItem[];
  public listaBreadcrumb: MenuItem[];

  constructor(private restService: RestService,
    private utilitario: UtilitarioService,
    private messageService: MessageService,
    private alertController: AlertController,
    private modalCtrl: ModalController,) {

    this.listaBreadcrumb = [
      { label: 'COTIZACIONES' },
      { label: 'Listado de Cotizaciones' },
    ];
  }

  public async ionViewWillEnter() {
    this.buscando = true;
    this.comboEstado = this.utilitario.getCombo(await this.restService.getCombo('ESTADO_COTIZACION', 'COD_ESCO', 'NOMBRE_ESCO'));
    this.comboUsuario = this.utilitario.getCombo(await this.restService.getCombo('USUARIO', 'COD_USUA', 'NOMBRE_USUA'));
    this.comboTipoCotizacion = this.utilitario.getCombo(await this.restService.getCombo('TIPO_COTIZACION', 'COD_TICO', 'NOMBRE_TICO'));

    this.pagina = 1;
    this.respuesta = await this.consulta();
    this.buscando = false;
  }

  private consulta(): Promise<RestResponse> {
    return this.restService.consultar('cotizacion/listar', this.pagina);
  }

  public async ver() {


    const modal = await this.modalCtrl.create({
      component: ConfiguracionPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        COD_CABC: await this.seleccionado.COD_CABC
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    //console.log(data);
    //console.log('xxxxxx');
    this.respuesta = await this.consulta();


  }




  async abrirCambiarEstado() {

    let respuestaEstados: RestResponse = this.utilitario.getRestResponse();
    respuestaEstados = await this.getEstados();

    if (respuestaEstados.error === true) {
      this.utilitario.agregarMensaje('Error', respuestaEstados.mensaje);
      return;
    }
    const sucursales = [];
    for (const fila of respuestaEstados.datos) {
      sucursales.push({
        type: 'radio',
        label: fila.NOMBRE_ESCO,
        value: fila.COD_ESCO,
        checked: this.seleccionado.COD_ESCO === fila.COD_ESCO,
      });
    }

    const prompt = await this.alertController.create({
      header: 'Cambiar de Estado Cotización N. ' + this.seleccionado.COD_CABC,
      message: 'Estado Actual :' + this.seleccionado.NOMBRE_ESCO,
      cssClass: 'modal50',
      inputs: sucursales,
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'ACEPTAR',
          handler: async data => {
            if (data) {
              const campos = { COD_ESCO: data };
              const resp = await this.restService.actualizar('cotizacion/asignarEstado/' + this.seleccionado.COD_CABC, campos);
              if (resp.error === false) {
                this.respuesta = await this.consulta();
                this.seleccionado = null;
                this.messageService.add({ severity: 'success', summary: '', detail: 'Se guardo correctamente.' });
              }
            }
          }
        }],
      backdropDismiss: false
    });
    await prompt.present();
  }


  async abrirCambiarVendedor() {

    let respuestaVendedores: RestResponse = this.utilitario.getRestResponse();
    respuestaVendedores = await this.getVendedores();

    if (respuestaVendedores.error === true) {
      this.utilitario.agregarMensaje('Error', respuestaVendedores.mensaje);
      return;
    }
    const vendedores = [];
    for (const fila of respuestaVendedores.datos) {
      vendedores.push({
        type: 'radio',
        label: fila.NOMBRE_USUA,
        value: fila.COD_USUA,
        checked: this.seleccionado.COD_USUA === fila.COD_USUA,
      });
    }

    const prompt = await this.alertController.create({
      header: 'Asignar Vendedor a la Cotización N. ' + this.seleccionado.COD_CABC,
      message: 'Vendedor Actual : ' + this.seleccionado.NOMBRE_USUA,
      cssClass: 'modal50',
      inputs: vendedores,
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'ACEPTAR',
          handler: async data => {
            if (data) {
              const campos = { COD_USUA: data };
              const resp = await this.restService.actualizar('cotizacion/asignarVendedor/' + this.seleccionado.COD_CABC, campos);
              if (resp.error === false) {
                this.respuesta = await this.consulta();
                this.seleccionado = null;
                this.messageService.add({ severity: 'success', summary: '', detail: 'Se guardo correctamente.' });
              }
            }
          }
        }],
      backdropDismiss: false
    });
    await prompt.present();
  }



  private getEstados(): Promise<RestResponse> {
    return this.restService.consultar('estadoCotizacion/listar', 1);
  }


  private getVendedores(): Promise<RestResponse> {
    return this.restService.consultar('usuario/getVendedores', 1);
  }


}

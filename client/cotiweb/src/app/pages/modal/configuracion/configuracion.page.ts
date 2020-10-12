import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { RestResponse } from '../../../interfaces/interfaces';
import { SelectItem, MessageService } from 'primeng/api';
import { RestService } from '../../../services/rest.service';
import { UtilitarioService } from '../../../services/utilitario.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  providers: [MessageService],
})
export class ConfiguracionPage {

  public respuesta: RestResponse = this.utilitario.getRestResponse();
  public buscando = false;
  public pagina: number;
  public seleccionado: any;
  @Input() COD_CABC = -1;
  public subtotal = 0;
  public subtotal0 = 0;
  public iva = 0;
  public total = 0;

  //Combos
  public comboCliente: SelectItem[];
  public comboTipoCotiza: SelectItem[];
  public comboCondiCotiza: SelectItem[];
  public comboEstadoCotiza: SelectItem[];
  public comboValidez: SelectItem[];
  public comboUsuario: SelectItem[];
  public comboProductos: SelectItem[];
  public comboUnidades: SelectItem[];
  public comboIVA: SelectItem[];
  public estadoPorAbrobar = false;
  public estadoPorConcretar = false;

  constructor(private modalCtrl: ModalController,
    private restService: RestService,
    private alertController: AlertController,
    private utilitario: UtilitarioService,
    private messageService: MessageService,
  ) {
    this.comboIVA = [{ label: 'SI', value: '1' }, { label: 'NO', value: '0' }]
  }

  public async ionViewWillEnter() {
    this.buscando = true;
    this.pagina = 1;
    this.respuesta = await this.consulta();

    //Combo Cliente
    const COD_CLIE = this.respuesta.datos[0].COD_CLIE;
    const COD_TICO = this.respuesta.datos[0].COD_TICO;
    const COD_ESCO = this.respuesta.datos[0].COD_ESCO;
    const COD_USUA = this.respuesta.datos[0].COD_USUA;
    const COD_COCO = this.respuesta.datos[0].COD_COCO;
    const COD_VACO = this.respuesta.datos[0].COD_VACO;


    this.subtotal = this.respuesta.datos[0].SUBTOTAL_CABC;
    this.subtotal0 = this.respuesta.datos[0].SUBTOTAL0_CABC;
    this.iva = this.respuesta.datos[0].IVA_CABC;
    this.total = this.respuesta.datos[0].TOTAL_CABC;


    this.comboCliente = this.utilitario.getCombo(await this.restService.getCombo('CLIENTE', 'COD_CLIE', 'NOMBRES_CLIE', 'COD_CLIE = ' + COD_CLIE), false);

    this.comboTipoCotiza = this.utilitario.getCombo(await this.restService.getCombo('TIPO_COTIZACION', 'COD_TICO', 'NOMBRE_TICO', 'COD_TICO = ' + COD_TICO), false);
    this.comboCondiCotiza = this.utilitario.getCombo(await this.restService.getCombo('CONDICION_COTIZACION', 'COD_COCO', 'NOMBRE_COCO', 'COD_COCO = ' + COD_COCO), false);
    this.comboEstadoCotiza = this.utilitario.getCombo(await this.restService.getCombo('ESTADO_COTIZACION', 'COD_ESCO', 'NOMBRE_ESCO', 'COD_ESCO = ' + COD_ESCO), false);
    this.comboValidez = this.utilitario.getCombo(await this.restService.getCombo('VALIDEZ_COTIZACION', 'COD_VACO', 'NOMBRE_VACO', 'COD_VACO = ' + COD_VACO), false);
    this.comboUsuario = this.utilitario.getCombo(await this.restService.getCombo('USUARIO', 'COD_USUA', 'NOMBRE_USUA', 'COD_USUA = ' + COD_USUA), false);
    this.comboProductos = this.utilitario.getCombo(await this.restService.getCombo('PRODUCTO', 'COD_PROD', 'NOMBRE_PROD'));
    this.comboUnidades = this.utilitario.getCombo(await this.restService.getCombo('UNIDAD_MEDIDA', 'COD_UNID', 'NOMBRE_UNID'));
    this.buscando = false;

    if (this.respuesta.datos[0].COD_ESCO === 7) {
      this.estadoPorAbrobar = true;
    }
    if (this.respuesta.datos[0].COD_ESCO === 4) {
      this.estadoPorConcretar= true;
    }

  }

  private consulta(): Promise<RestResponse> {
    return this.restService.consultar('cotizacion/buscarPorId/' + this.COD_CABC, this.pagina);
  }

  public seleccionaProducto(evt, fila) {
    const nombre = this.getNombreProducto(evt.value);
    fila.NOMBRE_PROD = nombre;
  }

  public seleccionaUnidadMedida(evt, fila) {
    const nombre = this.getNombreUnidadMedida(evt.value);
    fila.NOMBRE_UNID = nombre;
  }

  public getNombreProducto(value): string {
    const obj = this.comboProductos.find(x => x.value === value);
    return obj.label;
  }

  public getNombreUnidadMedida(value): string {
    const obj = this.comboUnidades.find(x => x.value === value);
    return obj.label;
  }

  guardar() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  cerrar() {
    this.modalCtrl.dismiss(
      {
        'dismissed': true
      }
    );
  }
  

  async confirmarAprobar() {
    
    //this.modalCtrl.dismiss();
    if (this.respuesta.datos[0].COD_ESCO !== 7) {
      this.messageService.add({ severity: 'error', summary: '', detail: 'Solo se puede Aprobar las cotizaciones en estado POR AUTORIZAR' });
      return;
    }

    const alert = await this.alertController.create({
      header: 'Confirmar!',
      message: 'Está seguro de Aprobar la Cotización?',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'ACEPTAR',
          handler: async () => {
            const campos = { COD_ESCO: 4 };
            const resp = await this.restService.actualizar('cotizacion/asignarEstado/' + this.COD_CABC, campos);
            if (resp.error === false) {
              this.respuesta = await this.consulta();
              this.seleccionado = null;
              this.modalCtrl.dismiss();
            }
            //llama enviar mail
            this.restService.llamarServicioWeb('cotizacion/enviarMail', campos);
           
          }
        }
      ]
    });
    await alert.present();
  }


  async confirmarNoAprobar() {
   
    //this.modalCtrl.dismiss();
    if (this.respuesta.datos[0].COD_ESCO !== 7) {
      this.messageService.add({ severity: 'error', summary: '', detail: 'Solo se puede no Aprobar las cotizaciones en estado POR AUTORIZAR' });
      return;
    }

    const alert = await this.alertController.create({
      header: 'Confirmar!',
      message: 'Está seguro de No Aprobar la Cotización?',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'ACEPTAR',
          handler: async () => {
            const campos = { COD_ESCO: 5 };
            const resp = await this.restService.actualizar('cotizacion/asignarEstado/' + this.COD_CABC, campos);
            if (resp.error === false) {
              this.respuesta = await this.consulta();
              this.seleccionado = null;
              this.modalCtrl.dismiss();
            }
          }
        }
      ]
    });
    await alert.present();
  }


  async confirmarConcretar() {
   
    //this.modalCtrl.dismiss();
    if (this.respuesta.datos[0].COD_ESCO !== 4) {
      this.messageService.add({ severity: 'error', summary: '', detail: 'Solo se puede no Concretar las cotizaciones en estado ABROBADO' });
      return;
    }

    const alert = await this.alertController.create({
      header: 'Confirmar!',
      message: 'Está seguro que la Cotización de concretó con el cliente ?',
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'ACEPTAR',
          handler: async () => {
            const campos = { COD_ESCO: 8 };
            const resp = await this.restService.actualizar('cotizacion/asignarEstado/' + this.COD_CABC, campos);
            if (resp.error === false) {
              this.respuesta = await this.consulta();
              this.seleccionado = null;
              this.modalCtrl.dismiss();
            }
          }
        }
      ]
    });
    await alert.present();
  }


}

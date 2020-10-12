import { Component, OnInit, Input, ViewChild, ɵConsole } from '@angular/core';
import { ModalController, IonInfiniteScroll } from '@ionic/angular';
import { RestResponse } from '../../../interfaces/interfaces';
import { UtilitarioService } from '../../../services/utilitario.service';
import { RestService } from '../../../services/rest.service';


@Component({
  selector: 'app-buscar-cliente',
  templateUrl: './buscar-cliente.page.html',
  styleUrls: ['./buscar-cliente.page.scss'],
})
export class BuscarClientePage {
  @Input() seleccionado: any;
  @Input() textoBusca: string;

  @Input() busquedaCliente = true;
  @Input() busquedaProveedor = false;

  textoBusqueda: string;


  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

  respuesta: RestResponse = this.utilitario.getRestResponse();
  buscando = false;
  pagina: number;

  constructor(private restService: RestService, private modalCtrl: ModalController, private utilitario: UtilitarioService) {

      this.textoBusqueda = 'Buscar Cliente';
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  async cargarSiguientes(event) {
   // if (this.textoBusca) {
   //   this.pagina++;
   //   // console.log('Cargando siguientes.... ' + this.pagina);
   //   const resp = await this.consulta();
   //   if (resp.totalRegistros === '0') {
   //     event.target.complete();
   //     this.infiniteScroll.disabled = true;
   //     return;
   //   }
   //   this.respuesta.datos.push(...resp.datos);
   // }
    event.target.complete();
  }

  private consulta(): Promise<RestResponse> {

    const parametros = {
      NOMBRE: this.textoBusca,
    }
    return this.restService.llamarServicioWeb('cliente/buscarCliente', parametros);
  }

  limpiar() {
    this.respuesta = this.utilitario.getRestResponse();
    this.textoBusca = '';
    this.buscando = false;
    this.seleccionado = null;
  }


  async buscar() {
    this.pagina = 1;
    this.buscando = true;
    this.respuesta = await this.consulta();
    //if (this.infiniteScroll) {
    //  if (this.respuesta.totalRegistros === '0') {
    //    this.infiniteScroll.disabled = true;
    //  } else {
    //    this.infiniteScroll.disabled = false;
    //  }
   // }
    this.buscando = false;
  }

  seleccionar(seleccionado) {
    this.seleccionado = seleccionado;
  }

  aceptar() {
    this.modalCtrl.dismiss({
      seleccionado: this.seleccionado
    });
  }
}

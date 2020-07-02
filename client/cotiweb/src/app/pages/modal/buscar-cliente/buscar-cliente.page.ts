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

    if(this.busquedaCliente === true) {
      this.textoBusqueda = 'Buscar Cliente';
    } else {
      this.textoBusqueda = 'Buscar Proveedor';
    } 

  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  async cargarSiguientes(event) {
    if (this.textoBusca) {
      this.pagina++;
      // console.log('Cargando siguientes.... ' + this.pagina);
      const resp = await this.consulta();
      if (resp.totalRegistros === '0') {
        event.target.complete();
        this.infiniteScroll.disabled = true;
        return;
      }
      this.respuesta.datos.push(...resp.datos);
    }
    event.target.complete();
  }

  private consulta(): Promise<RestResponse> {
    let condicionBusqueda = '';
    if (this.busquedaCliente === true) {
      condicionBusqueda = ' AND ES_CLIENTE_GEPER = true ';
    }  else {
      condicionBusqueda = ' AND ES_PROVEEDO_GEPER = true ';
    }
    return this.restService.consultar
      ('SELECT IDE_GEPER,IDENTIFICAC_GEPER,NOM_GEPER ' +
        'FROM GEN_PERSONA ' +
        'WHERE IDENTIFICAC_GEPER is not null ' +
        condicionBusqueda +
        'AND UPPER(NOM_GEPER) LIKE \'%' + this.textoBusca.toUpperCase() + '%\' ' +
        'OR UPPER(NOMBRE_COMPL_GEPER) LIKE \'%' + this.textoBusca.toUpperCase() + '%\' ' +
        'ORDER BY NOM_GEPER ', this.pagina);
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
    if (this.infiniteScroll) {
      if (this.respuesta.totalRegistros === '0') {
        this.infiniteScroll.disabled = true;
      } else {
        this.infiniteScroll.disabled = false;
      }
    }
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

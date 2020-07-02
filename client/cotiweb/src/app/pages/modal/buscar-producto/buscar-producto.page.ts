import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController, IonSearchbar } from '@ionic/angular';
import { RestResponse } from '../../../interfaces/interfaces';
import { RestService } from '../../../services/rest.service';
import { UtilitarioService } from '../../../services/utilitario.service';

@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.page.html',
  styleUrls: ['./buscar-producto.page.scss'],
})
export class BuscarProductoPage  {
  @Input() seleccionado: any;
  @Input() textoBusca: string;

  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  @ViewChild('searchbarProd', {static: false}) searchbar: IonSearchbar;

  respuesta: RestResponse = this.utilitario.getRestResponse();
  buscando = false;
  pagina: number;

  constructor(private restService: RestService, private modalCtrl: ModalController, private utilitario: UtilitarioService) {
  }

  ionViewWillEnter() {
  setTimeout(() => { this.searchbar.setFocus(); }, 150);
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
    return this.restService.consultar
      ("SELECT IDE_INARTI,CODIGO_INARTI,NOMBRE_INARTI " +
        "FROM INV_ARTICULO " +
        "WHERE NIVEL_INARTI = 'HIJO' " +
        "AND HACE_KARDEX_INARTI = true " +
        "AND UPPER(NOMBRE_INARTI) LIKE '%" + this.textoBusca.toUpperCase() + "%' " +
        "ORDER BY NOMBRE_INARTI ", this.pagina);
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

  seleccionarProducto(seleccionado) {
    this.seleccionado = seleccionado;
  }

  aceptar() {
    this.modalCtrl.dismiss({
      seleccionado: this.seleccionado
    });
  }
}

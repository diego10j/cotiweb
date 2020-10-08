import { Component, OnInit } from '@angular/core';
import { RestResponse, Producto } from '../../../interfaces/interfaces';
import { RestService } from '../../../services/rest.service';
import { UtilitarioService } from '../../../services/utilitario.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-info-producto',
  templateUrl: './info-producto.page.html',
  styleUrls: ['./info-producto.page.scss'],
})
export class InfoProductoPage {

  public respuesta: RestResponse = this.utilitario.getRestResponse();
  public respuestaCategorias: RestResponse = this.utilitario.getRestResponse();
  public buscando = false;
  public pagina: number;
  public seleccionado: any;
  public cantidad:number = 0.00;
  public numNotificaciones = 0;
  public producto : Producto;
  public isAgregado = false;

  constructor(private router: Router,private restService: RestService,
    private utilitario: UtilitarioService,private route: ActivatedRoute ) { 
      //this.seleccionado = this.router.getCurrentNavigation().extras.state.seleccionado;
    }

  public async ionViewWillEnter() {

    this.route.params.subscribe((params: Params) => this.seleccionado = params.id);
    this.seleccionado = atob(this.seleccionado);

    this.buscando = true;
    this.pagina = 1;
    this.respuesta = await this.consulta();
    this.numNotificaciones=(await this.utilitario.getListaProductos()).length;
    this.producto= {
      codigo: this.respuesta.datos.COD_PROD,
      nombre: this.respuesta.datos.NOMBRE_PROD,
      cantidad: this.cantidad,
      imagen: this.respuesta.datos.IMAGEN_PROD,
      unidad: this.respuesta.datos.NOMBRE_UNID,
      codigo_unidad: this.respuesta.datos.COD_UNID,
    };
    this.isAgregado= await this.utilitario.existeProductoLista(this.producto);
    this.respuestaCategorias = await this.consultaCategorias();
    this.buscando = false;
  }

  private consulta(): Promise<RestResponse> {
    return this.restService.consultar('producto/buscarPorId/' + this.seleccionado, 1);
  }

  private consultaCategorias(): Promise<RestResponse> {
    return this.restService.consultar('producto/getCategoriasProducto/' + this.seleccionado, 1);
  }

  async agregarLista(){
    this.producto= {
      codigo: this.respuesta.datos.COD_PROD,
      nombre: this.respuesta.datos.NOMBRE_PROD,
      cantidad: this.cantidad,
      imagen: this.respuesta.datos.IMAGEN_PROD,
      unidad: this.respuesta.datos.NOMBRE_UNID,
      codigo_unidad: this.respuesta.datos.COD_UNID,
    };
    await this.utilitario.agregarListaProductos(this.producto);
    this.numNotificaciones=(await this.utilitario.getListaProductos()).length;
    this.isAgregado= await this.utilitario.existeProductoLista(this.producto);
    this.utilitario.agregarMensaje("Agregado","Se agregó el producto a tu lista.")
  }

  async cotizarAhora(){
    this.producto= {
      codigo: this.respuesta.datos.COD_PROD,
      nombre: this.respuesta.datos.NOMBRE_PROD,
      cantidad: this.cantidad,
      imagen: this.respuesta.datos.IMAGEN_PROD,
      unidad: this.respuesta.datos.NOMBRE_UNID,
      codigo_unidad: this.respuesta.datos.COD_UNID,
    };
    await this.utilitario.agregarListaProductos(this.producto);
    this.numNotificaciones=(await this.utilitario.getListaProductos()).length;
    this.isAgregado= await this.utilitario.existeProductoLista(this.producto);
    this.utilitario.abrirPaginaPublica('cotizar');
  }



  public abrirLista() {
    this.utilitario.abrirPaginaPublica('mi-lista');
  }

  public abrirCatalogo() {
    this.utilitario.abrirPaginaPublica('catalogo');
  }



}

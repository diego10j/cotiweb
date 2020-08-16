import { Component } from '@angular/core';
import { RestResponse } from '../../../interfaces/interfaces';
import { UtilitarioService } from '../../../services/utilitario.service';
import { RestService } from '../../../services/rest.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage {

  public respuesta: RestResponse = this.utilitario.getRestResponse();
  public buscando = false;
  public pagina: number;
  public listaCategorias = [];
  public numNotificaciones = 0;


  constructor(private restService: RestService,
    private utilitario: UtilitarioService) { }

  public async ionViewWillEnter() {
    this.buscando = true;
    let comboTipo = this.utilitario.getCombo(await this.restService.getCombo('TIPO_PRODUCTO', 'COD_TIPR', 'NOMBRE_TIPR'));
    comboTipo.splice(0, 1);
    this.listaCategorias = [];
    for (let catActual of comboTipo) {
      this.listaCategorias.push({ valor: catActual.label, codigo: catActual.value, isChecked: false });
    }
    this.pagina = 1;
    this.respuesta = await this.consulta();

    this.numNotificaciones=(await this.utilitario.getListaProductos()).length;

    this.buscando = false;
  }

  private consulta(): Promise<RestResponse> {
    let categoriasSeleccionadas='';
    for (const catSelect of this.listaCategorias) {
      if (catSelect.isChecked) {
        if (categoriasSeleccionadas) {
          categoriasSeleccionadas = categoriasSeleccionadas + ',';
        }
        categoriasSeleccionadas = categoriasSeleccionadas + catSelect.codigo;
      }
    }
    const parametros = {
      COD_TIPR: categoriasSeleccionadas,
    }
    return this.restService.llamarServicioWeb('producto/getProductosPorTipo', parametros);
  }


  public async filtrarPorCategoria() {
    this.buscando = true;
    this.pagina = 1;
    this.respuesta = await this.consulta();
    this.buscando = false;
  }


  public abrirDetalleProducto(event) {
    const parametros = {
      seleccionado: event,
    };
    this.utilitario.abrirPaginaPublica('info-producto', parametros);
  }

  public abrirLista() {
    this.utilitario.abrirPaginaPublica('mi-lista');
  }

}

import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../../services/rest.service';
import { UtilitarioService } from '../../../../services/utilitario.service';
import { RestResponse } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.page.html',
  styleUrls: ['./permisos.page.scss'],
})
export class PermisosPage {

  public respuesta: RestResponse = this.utilitario.getRestResponse();
  public buscando = false;
  public pagina: number;
  public listaCategorias = [];
  public numNotificaciones = 0;


  constructor(private restService: RestService,
    private utilitario: UtilitarioService) { }

  public async ionViewWillEnter() {
    this.buscando = true;
    let comboTipo = this.utilitario.getCombo(await this.restService.getCombo('OPCION', 'COD_OPCI', 'NOMBRE_OPCI'));
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
    return this.restService.llamarServicioWeb('sistema/getPerfiles', parametros);
  }



}

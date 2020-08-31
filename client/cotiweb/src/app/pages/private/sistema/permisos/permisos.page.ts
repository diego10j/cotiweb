import { MenuItem } from 'primeng/api';
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
  public perfilSeleccionado;
  public comboTipo;
  public listaBreadcrumb: MenuItem[];

  constructor(private restService: RestService,
    private utilitario: UtilitarioService) {

    this.listaBreadcrumb = [
      { label: 'SISTEMA' },
      { label: 'Permisos' }
    ];
  }

  public async ionViewWillEnter() {
    this.buscando = true;
    this.comboTipo = this.utilitario.getCombo(await this.restService.getCombo('OPCION', 'COD_OPCI', 'NOMBRE_OPCI', 'OPC_COD_OPCI is not null'));
    this.comboTipo.splice(0, 1);
    this.listaCategorias = [];
    this.marcarOpcionesPerfil();
    this.pagina = 1;
    this.respuesta = await this.consulta();

    this.numNotificaciones = (await this.utilitario.getListaProductos()).length;

    this.buscando = false;
  }

  private async marcarOpcionesPerfil() {
    this.listaCategorias = [];
    for (let catActual of this.comboTipo) {
      this.listaCategorias.push({ valor: catActual.label, codigo: catActual.value, isChecked: false });
    }
    if (this.perfilSeleccionado) {
      const parametros = {
        COD_PERF: this.perfilSeleccionado.COD_PERF,
      }
      const respOpciones = await this.restService.llamarServicioWeb('sistema/getPermisosPerfil', parametros);
      if (respOpciones.datos) {
        for (let catActual of respOpciones.datos) {
          const obj = this.listaCategorias.find(x => x.codigo === catActual.COD_OPCI);
          obj.isChecked = true;
        }
      }
    }
  }

  private consulta(): Promise<RestResponse> {
    let categoriasSeleccionadas = '';
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

  onRowSelect(event) {
    this.marcarOpcionesPerfil();
  }

  onRowUnselect(event) {
    this.marcarOpcionesPerfil();
  }

  public guardar() {

  }



}

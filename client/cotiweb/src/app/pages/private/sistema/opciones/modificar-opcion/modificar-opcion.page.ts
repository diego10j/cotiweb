import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RestResponse } from '../../../../../interfaces/interfaces';
import { SelectItem, MenuItem, MessageService } from 'primeng/api';
import { ActivatedRoute, Params } from '@angular/router';
import { RestService } from '../../../../../services/rest.service';
import { UtilitarioService } from '../../../../../services/utilitario.service';

@Component({
  selector: 'app-modificar-opcion',
  templateUrl: './modificar-opcion.page.html',
  styleUrls: ['./modificar-opcion.page.scss'],
  providers: [MessageService],
})
export class ModificarOpcionPage {

  public form: FormGroup;
  public seleccionado: any;
  public buscando = false;
  public ejecutando = false;
  public respuesta: RestResponse = this.utilitario.getRestResponse();
  public comboGrupo: SelectItem[];
  public listaBreadcrumb: MenuItem[];

  constructor(private route: ActivatedRoute, private restService: RestService,
    private utilitario: UtilitarioService, private messageService: MessageService,
    private fb: FormBuilder) {
      this.listaBreadcrumb = [
        { label: 'SISTEMA' },
        { label: 'Opciones' , routerLink: '/private/opciones'},
        { label: 'Modificar Opción' }
      ];
      this.form = this.fb.group({
        NOMBRE_OPCI: new FormControl('', Validators.required),
        DETALLE_OPCI: new FormControl('', Validators.required),
        PATH_OPCI: new FormControl('', Validators.required),
        ICONO_OPCI: new FormControl('', Validators.required),
        OPC_COD_OPCI: new FormControl('', Validators.required),
        ACTIVO_OPCI: new FormControl('', Validators.required),
      });
  }

  public async ionViewWillEnter() {
    this.route.params.subscribe((params: Params) => this.seleccionado = params.id);
    this.buscando = true;
    this.comboGrupo = this.utilitario.getCombo(await this.restService.getCombo('OPCION', 'COD_OPCI', 'NOMBRE_OPCI', 'OPC_COD_OPCI IS NULL'));
    this.respuesta = await this.consulta();
    this.buscando = false;
    this.form.patchValue(this.respuesta.datos);
  }

  private consulta(): Promise<RestResponse> {
    return this.restService.consultar('sistema/buscarOpcionPorId/' + this.seleccionado, 1);
  }

  public async modificar() {
    this.ejecutando = true;
    this.respuesta = await this.restService.actualizar('sistema/actualizarOpcion/' + this.seleccionado, this.form.value);
    this.ejecutando = false;
    if (this.respuesta.error === false) {
      this.messageService.add({ severity: 'success', summary: '', detail: 'Se guardo correctamente.' });
    }

  }

}

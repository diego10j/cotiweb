import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { RestResponse } from '../../../../interfaces/interfaces';
import { RestService } from '../../../../services/rest.service';
import { UtilitarioService } from '../../../../services/utilitario.service';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.page.html',
  styleUrls: ['./modificar-producto.page.scss'],
  providers: [MessageService],
})
export class ModificarProductoPage {

  public form: FormGroup;
  public seleccionado: any;
  public buscando = false;
  public ejecutando = false;
  public respuesta: RestResponse = this.utilitario.getRestResponse();
  public comboTipo: SelectItem[];
  public comboUnidad: SelectItem[];

  constructor(private router: Router, private restService: RestService,
    private utilitario: UtilitarioService, private messageService: MessageService,
    private fb: FormBuilder) {
    // Recupera parámetro enviado
    this.seleccionado = this.router.getCurrentNavigation().extras.state.seleccionado;
    this.form = this.fb.group({
      COD_TIPR: new FormControl('', Validators.required),
      COD_UNID: new FormControl(''),
      NOMBRE_PROD: new FormControl('', Validators.required),
      DESCRIPCION_PROD: new FormControl(''),
      ACTIVO_PROD: new FormControl('', Validators.required),
      COD_AUX_PROD: new FormControl(''),
    });
  }

  public async ionViewWillEnter() {
    this.buscando = true;
    this.comboTipo = this.utilitario.getCombo(await this.restService.getCombo('TIPO_PRODUCTO', 'COD_TIPR', 'NOMBRE_TIPR'));
    this.comboUnidad = this.utilitario.getCombo(await this.restService.getCombo('UNIDAD_MEDIDA', 'COD_UNID', 'NOMBRE_UNID'));
    this.respuesta = await this.consulta();
    this.buscando = false;
    this.form.patchValue(this.respuesta.datos);
  }

  private consulta(): Promise<RestResponse> {
    return this.restService.consultar('producto/buscarPorId/' + this.seleccionado, 1);
  }

  public cancelar() {
    this.utilitario.abrirPagina('productos');
  }

  public async modificar() {
    this.ejecutando = true;
    this.respuesta = await this.restService.actualizar('producto/actualizar/' + this.seleccionado, this.form.value);
    this.ejecutando = false;
    if (this.respuesta.error === false) {
      this.messageService.add({ severity: 'success', summary: '', detail: 'Se guardo correctamente.' });
    }

  }

}

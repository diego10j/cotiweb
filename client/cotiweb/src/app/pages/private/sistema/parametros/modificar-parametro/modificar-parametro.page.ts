import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RestService } from '../../../../../services/rest.service';
import { UtilitarioService } from '../../../../../services/utilitario.service';
import { RestResponse } from '../../../../../interfaces/interfaces';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-modificar-parametro',
  templateUrl: './modificar-parametro.page.html',
  styleUrls: ['./modificar-parametro.page.scss'],
  providers: [MessageService],
})
export class ModificarParametroPage {

  public form: FormGroup;
  public seleccionado: any;
  public buscando = false;
  public ejecutando = false;
  public respuesta: RestResponse = this.utilitario.getRestResponse();
  public listaBreadcrumb: MenuItem[];

  constructor(private route: ActivatedRoute,private restService: RestService,
    private utilitario: UtilitarioService, private messageService: MessageService,
    private fb: FormBuilder) {
      this.listaBreadcrumb = [
        { label: 'SISTEMA' },
        { label: 'Parámetros del sistema' , routerLink: '/private/parametros'},
        { label: 'Modificar Parámetro' }
      ];
    this.form = this.fb.group({
      NEMONICO_PARA: new FormControl('', Validators.required),
      DESCRIPCION_PARA: new FormControl('', Validators.required),
      VALOR_PARA: new FormControl('', Validators.required),
      ACTIVO_PARA: new FormControl('', Validators.required),
    });
    this.form.controls.ACTIVO_PARA.setValue(true);
  }
 
  public async ionViewWillEnter() {
    this.route.params.subscribe((params: Params) => this.seleccionado = params.id);
    this.buscando = true;
    this.respuesta = await this.consulta();
    this.buscando = false;
    this.form.patchValue(this.respuesta.datos);
  }

  private consulta(): Promise<RestResponse> {
    return this.restService.consultar('sistema/buscarParametroPorId/' + this.seleccionado, 1);
  }

  public async modificar() {
    this.ejecutando = true;
    this.respuesta = await this.restService.actualizar('sistema/actualizarParametro/' + this.seleccionado, this.form.value);
    this.ejecutando = false;
    if (this.respuesta.error === false) {
      this.messageService.add({ severity: 'success', summary: '', detail: 'Se guardo correctamente.' });
    }

  }

}

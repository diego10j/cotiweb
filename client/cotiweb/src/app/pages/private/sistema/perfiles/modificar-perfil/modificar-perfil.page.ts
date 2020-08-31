import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem, MenuItem } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RestResponse } from '../../../../../interfaces/interfaces';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestService } from '../../../../../services/rest.service';
import { UtilitarioService } from '../../../../../services/utilitario.service';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.page.html',
  styleUrls: ['./modificar-perfil.page.scss'],
  providers: [MessageService],
})
export class ModificarPerfilPage {

  public form: FormGroup;
  public seleccionado: any;
  public buscando = false;
  public ejecutando = false;
  public respuesta: RestResponse = this.utilitario.getRestResponse();
  public listaBreadcrumb: MenuItem[];

  constructor(private route: ActivatedRoute, private restService: RestService,
    private utilitario: UtilitarioService, private messageService: MessageService,
    private fb: FormBuilder) {
      this.listaBreadcrumb = [
        { label: 'SISTEMA' },
        { label: 'Perfiles' , routerLink: '/private/perfiles'},
        { label: 'Modificar Perfil' }
      ];
    // Recupera parámetro enviado
    this.form = this.fb.group({
      NOMBRE_PERF: new FormControl('', Validators.required),
      DESCRIPCION_PERF: new FormControl('', Validators.required),
      ACTIVO_PERF: new FormControl('', Validators.required),
    });

  }

  public async ionViewWillEnter() {
    this.route.params.subscribe((params: Params) => this.seleccionado = params.id);
    this.buscando = true;
    this.respuesta = await this.consulta();
    this.buscando = false;
    this.form.patchValue(this.respuesta.datos);
  }

  private consulta(): Promise<RestResponse> {
    return this.restService.consultar('sistema/buscarPerfilPorId/' + this.seleccionado, 1);
  }

  public async modificar() {
    this.ejecutando = true;
    this.respuesta = await this.restService.actualizar('sistema/actualizarPerfil/' + this.seleccionado, this.form.value);
    this.ejecutando = false;
    if (this.respuesta.error === false) {
      this.messageService.add({ severity: 'success', summary: '', detail: 'Se guardo correctamente.' });
    }

  }

}

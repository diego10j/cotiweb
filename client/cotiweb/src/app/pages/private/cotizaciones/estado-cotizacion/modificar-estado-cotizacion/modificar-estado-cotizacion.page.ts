import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RestResponse } from '../../../../../interfaces/interfaces';
import { ActivatedRoute, Params } from '@angular/router';
import { RestService } from '../../../../../services/rest.service';
import { UtilitarioService } from '../../../../../services/utilitario.service';

@Component({
  selector: 'app-modificar-estado-cotizacion',
  templateUrl: './modificar-estado-cotizacion.page.html',
  styleUrls: ['./modificar-estado-cotizacion.page.scss'],
  providers: [MessageService],
})
export class ModificarEstadoCotizacionPage {

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
        { label: 'COTIZACIONES' },
        { label: 'Estado de la Cotización' , routerLink: '/private/estado-cotizacion'},
        { label: 'Modificar Estado Cotización' }
      ];
    // Recupera parámetro enviado
    this.form = this.fb.group({
      NOMBRE_ESCO: new FormControl('', Validators.required),
      DESCRIPCION_ESCO: new FormControl('', Validators.required),
      ACTIVO_ESCO: new FormControl('', Validators.required),
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
    return this.restService.consultar('estadoCotizacion/buscarPorId/' + this.seleccionado, 1);
  }

  public async modificar() {
    this.ejecutando = true;
    this.respuesta = await this.restService.actualizar('estadoCotizacion/actualizar/' + this.seleccionado, this.form.value);
    this.ejecutando = false;
    if (this.respuesta.error === false) {
      this.messageService.add({ severity: 'success', summary: '', detail: 'Se guardo correctamente.' });
    }

  }

}

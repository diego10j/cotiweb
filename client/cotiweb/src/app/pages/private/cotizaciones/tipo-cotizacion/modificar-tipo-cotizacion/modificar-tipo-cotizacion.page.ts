import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RestResponse } from '../../../../../interfaces/interfaces';
import { ActivatedRoute, Params } from '@angular/router';
import { UtilitarioService } from '../../../../../services/utilitario.service';
import { RestService } from '../../../../../services/rest.service';

@Component({
  selector: 'app-modificar-tipo-cotizacion',
  templateUrl: './modificar-tipo-cotizacion.page.html',
  styleUrls: ['./modificar-tipo-cotizacion.page.scss'],
  providers: [MessageService],
})
export class ModificarTipoCotizacionPage {

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
        { label: 'Tipos de Cotizaciones' , routerLink: '/private/tipo-cotizacion'},
        { label: 'Modificar Tipo Cotización' }
      ];
    // Recupera parámetro enviado
    this.form = this.fb.group({
      NOMBRE_TICO: new FormControl('', Validators.required),
      ACTIVO_TICO: new FormControl('', Validators.required),
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
    return this.restService.consultar('tipoCotizacion/buscarPorId/' + this.seleccionado, 1);
  }

  public async modificar() {
    this.ejecutando = true;
    this.respuesta = await this.restService.actualizar('tipoCotizacion/actualizar/' + this.seleccionado, this.form.value);
    this.ejecutando = false;
    if (this.respuesta.error === false) {
      this.messageService.add({ severity: 'success', summary: '', detail: 'Se guardo correctamente.' });
    }

  }

}

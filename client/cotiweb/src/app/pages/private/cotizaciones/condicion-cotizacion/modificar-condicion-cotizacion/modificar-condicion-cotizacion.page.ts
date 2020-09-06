import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RestResponse } from '../../../../../interfaces/interfaces';
import { ActivatedRoute, Params } from '@angular/router';
import { RestService } from '../../../../../services/rest.service';
import { UtilitarioService } from '../../../../../services/utilitario.service';

@Component({
  selector: 'app-modificar-condicion-cotizacion',
  templateUrl: './modificar-condicion-cotizacion.page.html',
  styleUrls: ['./modificar-condicion-cotizacion.page.scss'],
  providers: [MessageService],
})
export class ModificarCondicionCotizacionPage {

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
        { label: 'Condiciones de la Cotización' , routerLink: '/private/condicion-cotizacion'},
        { label: 'Modificar Condición Cotización' }
      ];
    // Recupera parámetro enviado
    this.form = this.fb.group({
      NOMBRE_COCO: new FormControl('', Validators.required),
      ACTIVO_COCO: new FormControl('', Validators.required),
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
    return this.restService.consultar('condicionCotizacion/buscarPorId/' + this.seleccionado, 1);
  }

  public async modificar() {
    this.ejecutando = true;
    this.respuesta = await this.restService.actualizar('condicionCotizacion/actualizar/' + this.seleccionado, this.form.value);
    this.ejecutando = false;
    if (this.respuesta.error === false) {
      this.messageService.add({ severity: 'success', summary: '', detail: 'Se guardo correctamente.' });
    }

  }

}

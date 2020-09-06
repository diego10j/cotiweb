import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RestResponse } from '../../../../../interfaces/interfaces';
import { ActivatedRoute, Params } from '@angular/router';
import { RestService } from '../../../../../services/rest.service';
import { UtilitarioService } from '../../../../../services/utilitario.service';

@Component({
  selector: 'app-modificar-validez-cotizacion',
  templateUrl: './modificar-validez-cotizacion.page.html',
  styleUrls: ['./modificar-validez-cotizacion.page.scss'],
  providers: [MessageService],
})
export class ModificarValidezCotizacionPage {

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
        { label: 'Validez de Cotizaciones' , routerLink: '/private/validez-cotizacion'},
        { label: 'Modificar Validez Cotización' }
      ];
    // Recupera parámetro enviado
    this.form = this.fb.group({
      NOMBRE_VACO: new FormControl('', Validators.required),
      DIAS_VACO: new FormControl('', Validators.required),
      ACTIVO_VACO: new FormControl('', Validators.required),
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
    return this.restService.consultar('validezCotizacion/buscarPorId/' + this.seleccionado, 1);
  }

  public async modificar() {
    this.ejecutando = true;
    this.respuesta = await this.restService.actualizar('validezCotizacion/actualizar/' + this.seleccionado, this.form.value);
    this.ejecutando = false;
    if (this.respuesta.error === false) {
      this.messageService.add({ severity: 'success', summary: '', detail: 'Se guardo correctamente.' });
    }

  }

}

import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RestService } from '../../../../../services/rest.service';
import { UtilitarioService } from '../../../../../services/utilitario.service';
import { RestResponse } from '../../../../../interfaces/interfaces';

@Component({
  selector: 'app-crear-condicion-cotizacion',
  templateUrl: './crear-condicion-cotizacion.page.html',
  styleUrls: ['./crear-condicion-cotizacion.page.scss'],
  providers: [MessageService],
})
export class CrearCondicionCotizacionPage {

  public form: FormGroup;
  public ejecutando = false;
  public listaBreadcrumb: MenuItem[];

  constructor(private restService: RestService,
    private utilitario: UtilitarioService, private messageService: MessageService,
    private fb: FormBuilder) {
      this.listaBreadcrumb = [
        { label: 'COTIZACIONES' },
        { label: 'Condiciones de la Cotización' , routerLink: '/private/condicion-cotizacion'},
        { label: 'Crear Condición Cotización' }
      ];
    this.form = this.fb.group({
      NOMBRE_COCO: new FormControl('', Validators.required),
      ACTIVO_COCO: new FormControl('', Validators.required),
    });
    this.form.controls.ACTIVO_COCO.setValue(true);
  }
 

  public async crear() {
    this.ejecutando = true;
    let respuesta: RestResponse = this.utilitario.getRestResponse();
    respuesta = await this.restService.insertar('condicionCotizacion/crear', this.form.value);
    this.ejecutando = false;
    if (respuesta.error === false) {
      this.messageService.add({ severity: 'success', summary: '', detail: 'Se guardo correctamente.' });
      this.ejecutando = true;
    }
  }

}

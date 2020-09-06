import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RestService } from '../../../../../services/rest.service';
import { UtilitarioService } from '../../../../../services/utilitario.service';
import { RestResponse } from '../../../../../interfaces/interfaces';

@Component({
  selector: 'app-crear-validez-cotizacion',
  templateUrl: './crear-validez-cotizacion.page.html',
  styleUrls: ['./crear-validez-cotizacion.page.scss'],
  providers: [MessageService],
})
export class CrearValidezCotizacionPage  {

  public form: FormGroup;
  public ejecutando = false;
  public listaBreadcrumb: MenuItem[];

  constructor(private restService: RestService,
    private utilitario: UtilitarioService, private messageService: MessageService,
    private fb: FormBuilder) {
      this.listaBreadcrumb = [
        { label: 'COTIZACIONES' },
        { label: 'Validez de Cotizaciones' , routerLink: '/private/validez-cotizacion'},
        { label: 'Crear Vlidez Cotización' }
      ];
    this.form = this.fb.group({
      NOMBRE_VACO: new FormControl('', Validators.required),
      DIAS_VACO: new FormControl('', Validators.required),
      ACTIVO_VACO: new FormControl('', Validators.required),
    });
    this.form.controls.ACTIVO_VACO.setValue(true);
  }
 

  public async crear() {
    this.ejecutando = true;
    let respuesta: RestResponse = this.utilitario.getRestResponse();
    respuesta = await this.restService.insertar('validezCotizacion/crear', this.form.value);
    this.ejecutando = false;
    if (respuesta.error === false) {
      this.messageService.add({ severity: 'success', summary: '', detail: 'Se guardo correctamente.' });
      this.ejecutando = true;
    }
  }

}

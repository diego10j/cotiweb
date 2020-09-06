import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RestService } from '../../../../../services/rest.service';
import { UtilitarioService } from '../../../../../services/utilitario.service';
import { RestResponse } from '../../../../../interfaces/interfaces';

@Component({
  selector: 'app-crear-tipo-cotizacion',
  templateUrl: './crear-tipo-cotizacion.page.html',
  styleUrls: ['./crear-tipo-cotizacion.page.scss'],
  providers: [MessageService],
})
export class CrearTipoCotizacionPage {

  public form: FormGroup;
  public ejecutando = false;
  public listaBreadcrumb: MenuItem[];

  constructor(private restService: RestService,
    private utilitario: UtilitarioService, private messageService: MessageService,
    private fb: FormBuilder) {
      this.listaBreadcrumb = [
        { label: 'COTIZACIONES' },
        { label: 'Tipos de Cotizaciones' , routerLink: '/private/tipo-cotizacion'},
        { label: 'Crear Tipo Cotización' }
      ];
    this.form = this.fb.group({
      NOMBRE_TICO: new FormControl('', Validators.required),
      ACTIVO_TICO: new FormControl('', Validators.required),
    });
    this.form.controls.ACTIVO_TICO.setValue(true);
  }
 

  public async crear() {
    this.ejecutando = true;
    let respuesta: RestResponse = this.utilitario.getRestResponse();
    respuesta = await this.restService.insertar('tipoCotizacion/crear', this.form.value);
    this.ejecutando = false;
    if (respuesta.error === false) {
      this.messageService.add({ severity: 'success', summary: '', detail: 'Se guardo correctamente.' });
      this.ejecutando = true;
    }
  }

}

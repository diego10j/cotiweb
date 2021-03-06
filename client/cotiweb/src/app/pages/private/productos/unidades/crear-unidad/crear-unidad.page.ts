import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RestService } from '../../../../../services/rest.service';
import { UtilitarioService } from '../../../../../services/utilitario.service';
import { RestResponse } from '../../../../../interfaces/interfaces';

@Component({
  selector: 'app-crear-unidad',
  templateUrl: './crear-unidad.page.html',
  styleUrls: ['./crear-unidad.page.scss'],
  providers: [MessageService],
})
export class CrearUnidadPage {

  public form: FormGroup;
  public ejecutando = false;
  public listaBreadcrumb: MenuItem[];

  constructor(private restService: RestService,
    private utilitario: UtilitarioService, private messageService: MessageService,
    private fb: FormBuilder) {
      this.listaBreadcrumb = [
        { label: 'PRODUCTOS' },
        { label: 'Unidades de Medida' , routerLink: '/private/unidades'},
        { label: 'Crear Unidad de Medida' }
      ];
    this.form = this.fb.group({
      NOMBRE_UNID: new FormControl('', Validators.required),
      SIMBOLO_UNID: new FormControl('', Validators.required),
      ACTIVO_UNID: new FormControl('', Validators.required),
    });
    this.form.controls.ACTIVO_UNID.setValue(true);
  }
 

  public async crear() {
    this.ejecutando = true;
    let respuesta: RestResponse = this.utilitario.getRestResponse();
    respuesta = await this.restService.insertar('unidadMedida/crear', this.form.value);
    this.ejecutando = false;
    if (respuesta.error === false) {
      this.messageService.add({ severity: 'success', summary: '', detail: 'Se guardo correctamente.' });
      this.ejecutando = true;
    }
  }

}

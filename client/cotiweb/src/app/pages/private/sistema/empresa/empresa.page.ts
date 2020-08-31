import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem, MenuItem } from 'primeng/api';
import { RestResponse } from '../../../../interfaces/interfaces';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from '../../../../services/rest.service';
import { UtilitarioService } from '../../../../services/utilitario.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
  providers: [MessageService],
})
export class EmpresaPage {

  public form: FormGroup;
  public buscando = false;
  public ejecutando = false;
  public respuesta: RestResponse = this.utilitario.getRestResponse();
  public listaBreadcrumb: MenuItem[];

  constructor(private router: Router, private restService: RestService,
    private utilitario: UtilitarioService, private messageService: MessageService,
    private fb: FormBuilder) {
      this.listaBreadcrumb = [
        { label: 'SISTEMA' },
        { label: 'Datos de la Empresa'},
      ];

    this.form = this.fb.group({
      NOMBRE_EMPR: new FormControl('', Validators.required),
      CORREO_EMPR: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      DIRECCION_EMPR: new FormControl('', Validators.required),
      TELEFONO_EMPR: new FormControl('', Validators.required),
      RUC_EMPR: new FormControl('', Validators.required),
      RAZON_SOCIAL_EMPR: new FormControl(''),
      CONTABILIDAD_EMPR: new FormControl(''),
      LONGITUD_EMPR: new FormControl('', Validators.required),
      LATITUD_EMPR: new FormControl('', Validators.required),
      LOGO_EMPR: new FormControl(''),
    });
  }

  public async ionViewWillEnter() {
    this.buscando = true;
    this.respuesta = await this.consulta();
    this.buscando = false;
    this.form.patchValue(this.respuesta.datos);
  }

  private consulta(): Promise<RestResponse> {
    return this.restService.consultar('sistema/getDatosEmpresa', 1);
  }


  public async modificar() {
    this.ejecutando = true;
    this.respuesta = await this.restService.actualizar('sistema/actualizarEmpresa', this.form.value);
    this.ejecutando = false;
    if (this.respuesta.error === false) {
      this.messageService.add({ severity: 'success', summary: '', detail: 'Se guardo correctamente.' });
    }

  }

}

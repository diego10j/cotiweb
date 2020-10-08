import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem, MenuItem } from 'primeng/api';
import { RestResponse } from '../../../../interfaces/interfaces';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from '../../../../services/rest.service';
import { UtilitarioService } from '../../../../services/utilitario.service';
import { HttpClient } from '@angular/common/http';

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
  public nombreImagen='imagen.svg'; 

  constructor(private router: Router, private restService: RestService,private http: HttpClient,
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
      LONGITUD_EMPR: new FormControl(''),
      LATITUD_EMPR: new FormControl(''),
      LOGO_EMPR: new FormControl(''),
    });
  }

  public async ionViewWillEnter() {
    this.buscando = true;
    this.respuesta = await this.consulta();
    this.buscando = false;
    this.form.patchValue(this.respuesta.datos);
    this.nombreImagen=this.respuesta.datos.LOGO_EMPR;
  }

  private consulta(): Promise<RestResponse> {
    return this.restService.consultar('sistema/getDatosEmpresa', 1);
  }


  public async modificar() {
    this.ejecutando = true;
    this.form.controls.LOGO_EMPR.setValue(this.nombreImagen);
    this.respuesta = await this.restService.actualizar('sistema/actualizarDatosEmpresa/1', this.form.value);
    this.ejecutando = false;
    if (this.respuesta.error === false) {
      this.messageService.add({ severity: 'success', summary: '', detail: 'Se guardo correctamente.' });
    }

  }


  public onFileUpload(data: { files: File }): void {
    const formData: FormData = new FormData();
    const file = data.files[0];
    const RESTAPI = this.utilitario.getRestApi();
    formData.append('image', file, file.name);
    this.http.post<any>(RESTAPI+`/archivoProducto/upload`, formData)
      .subscribe(resp => {
        this.nombreImagen=resp.nombreImagen;
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RestService } from '../../../../../services/rest.service';
import { UtilitarioService } from '../../../../../services/utilitario.service';
import { MessageService } from 'primeng/api';
import { RestResponse } from '../../../../../interfaces/interfaces';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.page.html',
  styleUrls: ['./crear-categoria.page.scss'],
  providers: [MessageService],
})
export class CrearCategoriaPage {

  public form: FormGroup;
  public ejecutando = false;


  constructor(private restService: RestService,
    private utilitario: UtilitarioService, private messageService: MessageService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      NOMBRE_PERF: new FormControl('', Validators.required),
      DESCRIPCION_PERF: new FormControl('', Validators.required),
      ACTIVO_PERF: new FormControl('', Validators.required),
    });
    this.form.controls.ACTIVO_PERF.setValue(true);
  }
 
  public cancelar() {
    this.utilitario.abrirPagina('perfiles');
  }

  public async crear() {
    this.ejecutando = true;
    let respuesta: RestResponse = this.utilitario.getRestResponse();
    respuesta = await this.restService.insertar('perfiles/crear', this.form.value);
    this.ejecutando = false;
    if (respuesta.error === false) {
      this.messageService.add({ severity: 'success', summary: '', detail: 'Se guardo correctamente.' });
      this.ejecutando = true;
    }
  }

}

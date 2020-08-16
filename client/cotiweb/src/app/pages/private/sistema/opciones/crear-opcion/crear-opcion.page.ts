import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RestService } from '../../../../../services/rest.service';
import { UtilitarioService } from '../../../../../services/utilitario.service';
import { MessageService, SelectItem } from 'primeng/api';
import { RestResponse } from '../../../../../interfaces/interfaces';

@Component({
  selector: 'app-crear-opcion',
  templateUrl: './crear-opcion.page.html',
  styleUrls: ['./crear-opcion.page.scss'],
  providers: [MessageService],
})
export class CrearOpcionPage {

  public form: FormGroup;
  public ejecutando = false;
  public comboGrupo: SelectItem[];
  public buscando = false;

  constructor(private restService: RestService,
    private utilitario: UtilitarioService, private messageService: MessageService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      NOMBRE_OPCI: new FormControl('', Validators.required),
      DESCRIPCION_OPCI: new FormControl('', Validators.required),
      ACTIVO_OPCI: new FormControl('', Validators.required),
    });
    this.form.controls.ACTIVO_OPCI.setValue(true);
  }


  public async ionViewWillEnter() {
    this.buscando = true;
    this.comboGrupo = this.utilitario.getCombo(await this.restService.getCombo('OPCION', 'COD_OPCI', 'NOMBRE_OPCI', 'OPC_COD_OPCI IS NULL'));
    this.buscando = false;
  }

 
  public cancelar() {
    this.utilitario.abrirPagina('opciones');
  }

  public async crear() {
    this.ejecutando = true;
    let respuesta: RestResponse = this.utilitario.getRestResponse();
    respuesta = await this.restService.insertar('sistema/crearOpcion', this.form.value);
    this.ejecutando = false;
    if (respuesta.error === false) {
      this.messageService.add({ severity: 'success', summary: '', detail: 'Se guardo correctamente.' });
      this.ejecutando = true;
    }
  }

}

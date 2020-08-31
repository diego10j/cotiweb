import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RestService } from '../../../../../services/rest.service';
import { UtilitarioService } from '../../../../../services/utilitario.service';
import { MessageService, MenuItem } from 'primeng/api';
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
  public listaBreadcrumb: MenuItem[];

  constructor(private restService: RestService,
    private utilitario: UtilitarioService, private messageService: MessageService,
    private fb: FormBuilder) {
      this.listaBreadcrumb = [
        { label: 'PRODUCTOS' },
        { label: 'Categorías' , routerLink: '/private/categorias'},
        { label: 'Crear Categoría' }
      ];
    this.form = this.fb.group({
      NOMBRE_TIPR: new FormControl('', Validators.required),
      DESCRIPCION_TIPR: new FormControl('', Validators.required),
      ACTIVO_TIPR: new FormControl('', Validators.required),
    });
    this.form.controls.ACTIVO_TIPR.setValue(true);
  }
 

  public async crear() {
    this.ejecutando = true;
    let respuesta: RestResponse = this.utilitario.getRestResponse();
    respuesta = await this.restService.insertar('tipoProducto/crear', this.form.value);
    this.ejecutando = false;
    if (respuesta.error === false) {
      this.messageService.add({ severity: 'success', summary: '', detail: 'Se guardo correctamente.' });
      this.ejecutando = true;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { RestResponse } from '../../../../../interfaces/interfaces';
import { RestService } from '../../../../../services/rest.service';
import { UtilitarioService } from '../../../../../services/utilitario.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modificar-categoria',
  templateUrl: './modificar-categoria.page.html',
  styleUrls: ['./modificar-categoria.page.scss'],
  providers: [MessageService],
})
export class ModificarCategoriaPage {

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
        { label: 'PRODUCTOS' },
        { label: 'Categorías' , routerLink: '/private/categorias'},
        { label: 'Modificar Categoría' }
      ];
    // Recupera parámetro enviado
    this.form = this.fb.group({
      NOMBRE_TIPR: new FormControl('', Validators.required),
      DESCRIPCION_TIPR: new FormControl('', Validators.required),
      ACTIVO_TIPR: new FormControl('', Validators.required),
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
    return this.restService.consultar('tipoProducto/buscarPorId/' + this.seleccionado, 1);
  }

  public async modificar() {
    this.ejecutando = true;
    this.respuesta = await this.restService.actualizar('tipoProducto/actualizar/' + this.seleccionado, this.form.value);
    this.ejecutando = false;
    if (this.respuesta.error === false) {
      this.messageService.add({ severity: 'success', summary: '', detail: 'Se guardo correctamente.' });
    }

  }

}

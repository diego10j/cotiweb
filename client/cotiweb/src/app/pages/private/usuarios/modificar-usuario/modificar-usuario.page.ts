import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { RestResponse } from '../../../../interfaces/interfaces';
import { RestService } from '../../../../services/rest.service';
import { UtilitarioService } from '../../../../services/utilitario.service';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.page.html',
  styleUrls: ['./modificar-usuario.page.scss'],
  providers: [MessageService],
})
export class ModificarUsuarioPage {

  public form: FormGroup;
  public seleccionado: any;
  public buscando = false;
  public ejecutando = false;
  public respuesta: RestResponse = this.utilitario.getRestResponse();
  public comboPerfiles: SelectItem[];

  constructor(private router: Router, private restService: RestService,
    private utilitario: UtilitarioService, private messageService: MessageService,
    private fb: FormBuilder) {
    // Recupera parámetro enviado
    this.seleccionado = this.router.getCurrentNavigation().extras.state.seleccionado;
    this.form = this.fb.group({
      COD_PERF: new FormControl('', Validators.required),
      NOMBRE_USUA: new FormControl('', Validators.required),
      LOGIN_USUA: new FormControl('', Validators.required),
      CLAVE_USUA: new FormControl(''),
      CORREO_USUA: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      TELEFONO_USUA: new FormControl('', Validators.required),
      ACTIVO_USUA: new FormControl('', Validators.required),
      AVATAR_USUA: new FormControl(''),
      CAMBIA_CLAVE: new FormControl(''),
    });
  }

  public async ionViewWillEnter() {
    this.buscando = true;
    this.comboPerfiles = this.utilitario.getCombo(await this.restService.getCombo('PERFIL', 'COD_PERF', 'NOMBRE_PERF'));
    this.respuesta = await this.consulta();
    this.buscando = false;
    this.form.patchValue(this.respuesta.datos);
  }

  private consulta(): Promise<RestResponse> {
    return this.restService.consultar('usuario/buscarPorId/' + this.seleccionado, 1);
  }

  public cancelar() {
    this.utilitario.abrirPagina('usuarios');
  }

  public async modificar() {
    this.ejecutando = true;
    this.respuesta = await this.restService.actualizar('usuario/actualizar/' + this.seleccionado, this.form.value);
    this.ejecutando = false;
    if (this.respuesta.error === false) {
      this.messageService.add({ severity: 'success', summary: '', detail: 'Se guardo correctamente.' });
    }

  }

}

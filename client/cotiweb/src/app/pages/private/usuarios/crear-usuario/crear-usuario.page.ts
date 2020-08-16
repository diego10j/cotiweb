import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { RestResponse } from '../../../../interfaces/interfaces';
import { RestService } from '../../../../services/rest.service';
import { UtilitarioService } from '../../../../services/utilitario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
  providers: [MessageService],
})
export class CrearUsuarioPage {

  public form: FormGroup;
  public ejecutando = false;
  public comboPerfiles: SelectItem[];

  constructor(private restService: RestService,
    private utilitario: UtilitarioService, private messageService: MessageService,
    private fb: FormBuilder) {
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
    this.form.controls.ACTIVO_USUA.setValue(true);
  }
  public async ionViewWillEnter() {
    this.comboPerfiles = this.utilitario.getCombo(await this.restService.getCombo('PERFIL', 'COD_PERF', 'NOMBRE_PERF'));
  }

  public cancelar() {
    this.utilitario.abrirPagina('usuarios');
  }

  public async crear() {
    this.ejecutando = true;
    // La clave es el login
    this.form.controls.CLAVE_USUA.setValue(this.form.value.LOGIN_USUA);
    let respuesta: RestResponse = this.utilitario.getRestResponse();
    respuesta = await this.restService.insertar('usuario/crear', this.form.value);
    this.ejecutando = false;
    if (respuesta.error === false) {
      this.messageService.add({ severity: 'success', summary: '', detail: 'Se guardo correctamente.' });
      this.ejecutando = true;
    }
  }

}

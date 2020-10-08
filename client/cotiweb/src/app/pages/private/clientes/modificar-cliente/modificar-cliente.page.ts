import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RestService } from '../../../../services/rest.service';
import { UtilitarioService } from '../../../../services/utilitario.service';
import { MessageService, MenuItem } from 'primeng/api';
import { RestResponse } from '../../../../interfaces/interfaces';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-modificar-cliente',
  templateUrl: './modificar-cliente.page.html',
  styleUrls: ['./modificar-cliente.page.scss'],
  providers: [MessageService],
})
export class ModificarClientePage {
  public form: FormGroup;
  public seleccionado: any;
  public buscando = false;
  public ejecutando = false;
  public listaBreadcrumb: MenuItem[];
  public respuesta: RestResponse = this.utilitario.getRestResponse();

  cargandoGeo = false;

  ubicacion = {
    direccion: '',
    coords: null,
    posicion: false
  };

  usarGeo = false;

  constructor(private restService: RestService, private route: ActivatedRoute,
    private utilitario: UtilitarioService, private messageService: MessageService,
    private fb: FormBuilder, private geolocation: Geolocation) {
    // Por defecto coordenadas en quito centro
    const latitude = -0.3465013366146652;
    const longitude = -78.48221652950225;
    const coords = `${latitude},${longitude}`;
    this.ubicacion.coords = coords;

    this.listaBreadcrumb = [
      { label: 'COTIZACIONES' },
      { label: 'Clientes', routerLink: '/private/clientes' },
      { label: 'Modificar Cliente' }
    ];
    this.form = this.fb.group({
      TIPO_ID_CLIE: new FormControl(''),
      INDENTIFICACION_CLIE: new FormControl(''),
      NOMBRES_CLIE: new FormControl('', Validators.required),
      CORREO_CLIE: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      TELEFONO_CLIE: new FormControl('', Validators.required),
      DIRECCION_CLIE: new FormControl(''),
      COORDENADAS_CLIE: new FormControl(''),
    });
  }

  public async ionViewWillEnter() {
    this.route.params.subscribe((params: Params) => this.seleccionado = params.id);
    this.buscando = true;
    this.respuesta = await this.consulta();
    this.buscando = false;
    this.form.patchValue(this.respuesta.datos);
    if (this.respuesta.datos.COORDENADAS_CLIE) {
      this.ubicacion.coords = this.respuesta.datos.COORDENADAS_CLIE;
      this.ubicacion.posicion =true;
      this.usarGeo = true;
    }
  }

  public async modificar() {
    this.ejecutando = true;
    this.respuesta = await this.restService.actualizar('cliente/actualizar/' + this.seleccionado, this.form.value);
    this.ejecutando = false;
    if (this.respuesta.error === false) {
      this.messageService.add({ severity: 'success', summary: '', detail: 'Se guardo correctamente.' });
    }
  }

  getGeo() {

    if (this.usarGeo) {
      this.usarGeo = false;
    } else {
      this.usarGeo = true;
    }

    if (!this.ubicacion.posicion) {
      return;
    }

    this.cargandoGeo = true;

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.cargandoGeo = false;
      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      //console.log(coords);
      this.ubicacion.coords = coords;
    }).catch((error) => {
      console.log('Error getting location', error);
      this.cargandoGeo = false;
      this.usarGeo = false;
    });
  }


  private consulta(): Promise<RestResponse> {
    return this.restService.consultar('cliente/buscarPorId/' + this.seleccionado, 1);
  }


}

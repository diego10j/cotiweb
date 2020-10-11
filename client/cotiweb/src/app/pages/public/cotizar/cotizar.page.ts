import { Component, OnInit } from '@angular/core';
import { Producto, RestResponse } from '../../../interfaces/interfaces';
import { Router } from '@angular/router';
import { UtilitarioService } from '../../../services/utilitario.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RestService } from '../../../services/rest.service';

@Component({
  selector: 'app-cotizar',
  templateUrl: './cotizar.page.html',
  styleUrls: ['./cotizar.page.scss'],
})
export class CotizarPage {

  listaProductos: Producto[] = [];
  numNotificaciones = 0;


  cargandoGeo = false;

  ubicacion = {
    direccion: '',
    coords: null,
    posicion: false
  };

  usarGeo = false;

  public form: FormGroup;
  public ejecutando = false;

  constructor(private router: Router,private restService: RestService,
    private utilitario: UtilitarioService, private geolocation: Geolocation,
    private fb: FormBuilder) {
    // Por defecto coordenadas en quito centro
    const latitude = -0.3465013366146652;
    const longitude = -78.48221652950225;
    const coords = `${latitude},${longitude}`;
    this.ubicacion.coords = coords;

    this.form = this.fb.group({
      TIPO_ID_CLIE: new FormControl(''),
      IDENTIFICACION_CLIE: new FormControl(''),
      NOMBRES_CLIE: new FormControl('', Validators.required),
      CORREO_CLIE: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      TELEFONO_CLIE: new FormControl('', Validators.required),
      DIRECCION_CLIE: new FormControl(''),
      COORDENADAS_CLIE: new FormControl(''),
      DETALLES: new FormControl(''),
    });
  }


  public async ionViewWillEnter() {
    this.listaProductos = await this.utilitario.getListaProductos();
    this.numNotificaciones = (await this.utilitario.getListaProductos()).length;
    this.cargandoGeo = false;
  }

  public abrirCotizar() {
    this.utilitario.abrirPaginaPublica('cotizar');
  }
  public abrirLista() {
    this.utilitario.abrirPaginaPublica('mi-lista');
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



  public async guardar() {
    this.ejecutando = true;
    if(this.usarGeo){
      //console.log('ssssss' +this.ubicacion.coords )
      this.form.controls.COORDENADAS_CLIE.setValue(this.ubicacion.coords);
    }
    else{
      this.form.controls.COORDENADAS_CLIE.setValue(null );
    }

    this.form.controls.DETALLES.setValue(this.listaProductos);
    let respuesta: RestResponse = this.utilitario.getRestResponse();
    respuesta = await this.restService.insertar('cotizacion/crearDesdePortal', this.form.value);
    this.ejecutando = false;
    if (respuesta.error === false) {
      this.utilitario.agregarMensaje("Solicitud Enviada","Tu solicitud se guardó de manera exitosa, uno de nuestros asesores se comunicará contigo.");
      this.utilitario.limpiarListaProductos();
      this.utilitario.abrirPaginaPublica('catalogo');
    }
  }

  public abrirCatalogo() {
    this.utilitario.abrirPaginaPublica('catalogo');
  }


}

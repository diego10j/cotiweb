import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SelectItem, MenuItem, MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { RestService } from '../../../../services/rest.service';
import { ActivatedRoute } from '@angular/router';
import { UtilitarioService } from '../../../../services/utilitario.service';
import { AlertController, ModalController } from '@ionic/angular';
import { RestResponse } from '../../../../interfaces/interfaces';
import { BuscarClientePage } from '../../../modal/buscar-cliente/buscar-cliente.page';

@Component({
  selector: 'app-crear-cotizacion',
  templateUrl: './crear-cotizacion.page.html',
  styleUrls: ['./crear-cotizacion.page.scss'],
  providers: [MessageService],
})
export class CrearCotizacionPage {
  public buscando = false;
  public pagina: number;
  public seleccionado: any;

  //Combos
  public comboCliente: SelectItem[];
  public comboTipoCotiza: SelectItem[];
  public comboCondiCotiza: SelectItem[];
  public comboEstadoCotiza: SelectItem[];
  public comboValidez: SelectItem[];
  public comboUsuario: SelectItem[];
  public comboProductos: SelectItem[];
  public comboUnidades: SelectItem[];
  public comboIVA: SelectItem[];

  public form: FormGroup;
  public ejecutando = false;
  public es: any;

  public SUBTOTAL_CABC: number;
  public SUBTOTAL0_CABC: number;
  public IVA_CABC: number;
  public TOTAL_CABC: number;
  public listaBreadcrumb: MenuItem[];

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  constructor(private restService: RestService, private route: ActivatedRoute,
    private utilitario: UtilitarioService,
    private modalCtrl: ModalController,
    private messageService: MessageService, private cdRef: ChangeDetectorRef,
    private alertController: AlertController, private fb: FormBuilder) {

    this.listaBreadcrumb = [
      { label: 'COTIZACIONES' },
      { label: 'Mis Cotizaciones', routerLink: '/private/mis-cotizaciones' },
      { label: 'Crear Cotización' }
    ];

    this.es = utilitario.getCalendarioEsp();
    this.comboIVA = [{ label: 'SI', value: '1' }, { label: 'NO', value: '0' }];

    this.form = this.fb.group({
      COD_CLIE: new FormControl(''),
      COD_CABC: new FormControl(''),
      FECHA_CABC: new FormControl('', Validators.required),
      CORREO_CABC: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      DIRECCION_CABC: new FormControl(''),
      SUBTOTAL_CABC: new FormControl('', Validators.required),
      SUBTOTAL0_CABC: new FormControl('', Validators.required),
      IVA_CABC: new FormControl('', Validators.required),
      DESCUENTO_CABC: new FormControl(''),
      TOTAL_CABC: new FormControl('', Validators.required),
      ENVIADA_CABC: new FormControl(''),
      COD_COCO: new FormControl('', Validators.required),
      COD_VACO: new FormControl('', Validators.required),
      COD_ESCO: new FormControl('', Validators.required),
      COD_TICO: new FormControl('', Validators.required),
      COD_USUA: new FormControl(''),
      TELEFONO_CLIE: new FormControl(''),
      USUARIO_CREA: new FormControl(''),
    });
    this.form.addControl('DETALLES', new FormArray([]));

    //Valores por defecto
    this.form.controls.USUARIO_CREA.setValue(this.utilitario.getVariableLocalStorage('LOGIN_USUA'));
    this.form.controls.COD_USUA.setValue(this.utilitario.getVariableLocalStorage('COD_USUA'));
    this.form.controls.ENVIADA_CABC.setValue(false);
    this.form.controls.COD_ESCO.setValue('3'); //3 = ELABORADO
    this.form.controls.SUBTOTAL_CABC.setValue(0);
    this.form.controls.SUBTOTAL0_CABC.setValue(0);
    this.form.controls.IVA_CABC.setValue(0);
    this.form.controls.TOTAL_CABC.setValue(0);
    this.form.controls.DESCUENTO_CABC.setValue(0);
    const detalles = <FormArray>this.form.get('DETALLES');
    detalles.clear();
  }

  public async ionViewWillEnter() {
    this.buscando = true;
    this.comboCliente = this.utilitario.getCombo(await this.restService.getCombo('CLIENTE', 'COD_CLIE', 'NOMBRES_CLIE', 'COD_CLIE = -1'), false);
    this.comboTipoCotiza = this.utilitario.getCombo(await this.restService.getCombo('TIPO_COTIZACION', 'COD_TICO', 'NOMBRE_TICO'), false);
    this.comboCondiCotiza = this.utilitario.getCombo(await this.restService.getCombo('CONDICION_COTIZACION', 'COD_COCO', 'NOMBRE_COCO'));
    this.comboEstadoCotiza = this.utilitario.getCombo(await this.restService.getCombo('ESTADO_COTIZACION', 'COD_ESCO', 'NOMBRE_ESCO', 'COD_ESCO = 3'), false);
    this.comboValidez = this.utilitario.getCombo(await this.restService.getCombo('VALIDEZ_COTIZACION', 'COD_VACO', 'NOMBRE_VACO'));
    this.comboUsuario = this.utilitario.getCombo(await this.restService.getCombo('USUARIO', 'COD_USUA', 'NOMBRE_USUA', 'COD_USUA = ' + this.utilitario.getVariableLocalStorage('COD_USUA')), false);
    this.comboProductos = this.utilitario.getCombo(await this.restService.getCombo('PRODUCTO', 'COD_PROD', 'NOMBRE_PROD'));
    this.comboUnidades = this.utilitario.getCombo(await this.restService.getCombo('UNIDAD_MEDIDA', 'COD_UNID', 'NOMBRE_UNID'));
    this.buscando = false;
    this.calcularTotalFactura();
  }


  public seleccionaProducto(evt, index) {
    const nombre = this.getNombreProducto(evt.value);
    const detalles = <FormArray>this.form.get('DETALLES');
    const fila = detalles.at(index);
    fila.patchValue({
      NOMBRE_PROD: nombre
    });
  }

  public seleccionaUnidadMedida(evt, index) {
    const nombre = this.getNombreUnidadMedida(evt.value);
    const detalles = <FormArray>this.form.get('DETALLES');
    const fila = detalles.at(index);
    fila.patchValue({
      NOMBRE_UNID: nombre
    });
  }

  public getNombreProducto(value): string {
    const obj = this.comboProductos.find(x => x.value === value);
    return obj.label;
  }

  public getNombreUnidadMedida(value): string {
    const obj = this.comboUnidades.find(x => x.value === value);
    return obj.label;
  }


  public calcularDetalle(index) {
    const detalles = <FormArray>this.form.get('DETALLES');
    var fila: any = detalles.at(index);
    let cantidad: number = fila.value.CANTIDAD_DECO;
    let precio: number = fila.value.PRECIO_DECO;
    let total: number = cantidad * precio;
    fila.patchValue({
      TOTAL_DECO: total
    });
    this.calcularTotalFactura();
  }

  private calcularTotalFactura() {
    this.SUBTOTAL_CABC = 0;
    this.SUBTOTAL0_CABC = 0;
    this.IVA_CABC = 0;
    this.TOTAL_CABC = 0;
    const detalles = <FormArray>this.form.get('DETALLES');
    for (let fila of detalles.value) {
      let sub = fila.TOTAL_DECO;
      if (fila.IVA_DECO === '1') {
        this.SUBTOTAL_CABC = this.SUBTOTAL_CABC + sub;
      }
      else {
        this.SUBTOTAL0_CABC = this.SUBTOTAL0_CABC + sub;
      }
    }
    const porcentajeIVA = 0.12;
    this.IVA_CABC = this.SUBTOTAL_CABC * porcentajeIVA;
    this.TOTAL_CABC = this.SUBTOTAL_CABC + this.SUBTOTAL0_CABC + this.IVA_CABC;
    this.form.controls.SUBTOTAL_CABC.setValue(this.SUBTOTAL_CABC);
    this.form.controls.SUBTOTAL0_CABC.setValue(this.SUBTOTAL0_CABC);
    this.form.controls.IVA_CABC.setValue(this.IVA_CABC);
    this.form.controls.TOTAL_CABC.setValue(this.TOTAL_CABC);
  }


  public insertarProducto() {
    const detalles = <FormArray>this.form.get('DETALLES');
      detalles.push(
        this.fb.group({
          COD_DECO: new FormControl(null),
          COD_PROD: new FormControl(null, Validators.required),
          NOMBRE_PROD: new FormControl('', Validators.required),
          CANTIDAD_DECO: new FormControl(0, Validators.required),
          COD_UNID: new FormControl(null, Validators.required),
          NOMBRE_UNID: new FormControl('', Validators.required),
          PRECIO_DECO: new FormControl(0, Validators.required),
          IVA_DECO: new FormControl('1', Validators.required),
          TOTAL_DECO: new FormControl(0, Validators.required),
        })
      );
  }

  public eliminarProducto(index) {
    const detalles = <FormArray>this.form.get('DETALLES');
    detalles.removeAt(index);
    this.calcularTotalFactura();
  }

  public trackByFn(index, row) {
    return index;
  }

  public async guardar() {
    this.ejecutando = true;
    const Objeto = this.form.value;
    //formato fecha para bd
   // this.form.controls.FECHA_CABC.setValue(this.form.controls.FECHA_CABC.value.toISOString().slice(0, 10));
    let respuesta: RestResponse = this.utilitario.getRestResponse();
    respuesta = await this.restService.insertar('cotizacion/crear', this.form.value);
    //console.log(this.form.value);
    this.ejecutando = false;
    if (respuesta.error === false) {
      this.utilitario.agregarMensaje("Creación", "Se Guardo correctamente.");
      this.utilitario.limpiarListaProductos();
      this.utilitario.abrirPagina('mis-cotizaciones');
    }
  }

  public getValorDetalle(index, type: string) {
    const detalles = <FormArray>this.form.get('DETALLES');
    const fila = detalles.at(index).value;
    return fila[type];
  }

  async abrirBuscarCliente() {
    const modal = await this.modalCtrl.create({
      component: BuscarClientePage,
      backdropDismiss: false
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (this.utilitario.isDefined(data)) {
      this.seleccionado = data.seleccionado;
      this.comboCliente = this.utilitario.getCombo(await this.restService.getCombo('CLIENTE', 'COD_CLIE', 'NOMBRES_CLIE', 'COD_CLIE ='+data.seleccionado.COD_CLIE), false);
      this.form.controls.COD_CLIE.setValue(data.seleccionado.COD_CLIE);
      this.form.controls.DIRECCION_CABC.setValue(data.seleccionado.DIRECCION_CLIE);
      this.form.controls.CORREO_CABC.setValue(data.seleccionado.CORREO_CLIE);
      this.form.controls.TELEFONO_CLIE.setValue(data.seleccionado.TELEFONO_CLIE);

    }
  }

  public abrirCrear(){
    this.utilitario.abrirPagina('crear-cliente');
  }


}

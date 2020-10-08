import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MessageService, SelectItem, MenuItem } from 'primeng/api';
import { RestResponse } from '../../../../interfaces/interfaces';
import { RestService } from '../../../../services/rest.service';
import { UploadService } from '../../../../services/upload.service';
import { UtilitarioService } from '../../../../services/utilitario.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.page.html',
  styleUrls: ['./crear-producto.page.scss'],
  providers: [MessageService],
})
export class CrearProductoPage {

  public form: FormGroup;
  public ejecutando = false;
  public comboUnidad: SelectItem[];
  public listaBreadcrumb: MenuItem[];
  public nombreImagen='imagen.svg'; 

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  constructor(private restService: RestService,
    private utilitario: UtilitarioService, private http: HttpClient,
    private upload: UploadService, private cdRef: ChangeDetectorRef,
    private messageService: MessageService,
    private fb: FormBuilder) {

    this.listaBreadcrumb = [
      { label: 'PRODUCTOS' },
      { label: 'Productos', routerLink: '/private/productos' },
      { label: 'Crear Producto' }
    ];
    this.form = this.fb.group({
      COD_UNID: new FormControl(''),
      NOMBRE_PROD: new FormControl('', Validators.required),
      DESCRIPCION_PROD: new FormControl(''),
      ACTIVO_PROD: new FormControl('', Validators.required),
      COD_AUX_PROD: new FormControl(''),
      IMAGEN_PROD: new FormControl(''),
    });
    this.form.addControl('CATEGORIAS', new FormArray([]));
    this.form.controls.ACTIVO_PROD.setValue(true);

  }
  public async ionViewWillEnter() {
    const detalles = <FormArray>this.form.get('CATEGORIAS');
    detalles.controls = [];
    this.comboUnidad = this.utilitario.getCombo(await this.restService.getCombo('UNIDAD_MEDIDA', 'COD_UNID', 'NOMBRE_UNID'));
    const comboCategorias = this.utilitario.getCombo(await this.restService.getCombo('TIPO_PRODUCTO', 'COD_TIPR', 'NOMBRE_TIPR'));
    comboCategorias.splice(0, 1);

    comboCategorias.forEach(fila => {
      detalles.push(
        this.fb.group({
          COD_TIPR: fila.value,
          NOMBRE_TIPR: fila.label,
          IS_CHECKED: false,
        })
      );
    });
  }

  public cancelar() {
    this.utilitario.abrirPagina('productos');
  }

  public async crear() {
    this.ejecutando = true;
    let respuesta: RestResponse = this.utilitario.getRestResponse();
    this.form.controls.IMAGEN_PROD.setValue(this.nombreImagen);
    // console.log(this.form.value);
    respuesta = await this.restService.insertar('producto/crear', this.form.value);
    this.ejecutando = false;
    if (respuesta.error === false) {
      this.messageService.add({ severity: 'success', summary: '', detail: 'Se guardo correctamente.' });
      this.ejecutando = true;
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

  public getValorCategoria(index, type: string) {
    const detalles = <FormArray>this.form.get('CATEGORIAS');
    const fila = detalles.at(index).value;
    return fila[type];
  }

}


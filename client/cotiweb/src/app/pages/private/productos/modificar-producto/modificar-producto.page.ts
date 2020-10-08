import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MessageService, SelectItem, MenuItem } from 'primeng/api';
import { RestResponse } from '../../../../interfaces/interfaces';
import { RestService } from '../../../../services/rest.service';
import { UtilitarioService } from '../../../../services/utilitario.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.page.html',
  styleUrls: ['./modificar-producto.page.scss'],
  providers: [MessageService],
})
export class ModificarProductoPage {

  public form: FormGroup;
  public seleccionado: any;
  public buscando = false;
  public ejecutando = false;
  public respuesta: RestResponse = this.utilitario.getRestResponse();
  public comboTipo: SelectItem[];
  public comboUnidad: SelectItem[];
  public listaBreadcrumb: MenuItem[];
  public listaCategorias: any;
  public nombreImagen='imagen.svg'; 

  constructor(private route: ActivatedRoute, private restService: RestService,
    private utilitario: UtilitarioService, private messageService: MessageService,
    private fb: FormBuilder, private http: HttpClient) {
    this.listaBreadcrumb = [
      { label: 'PRODUCTOS' },
      { label: 'Productos', routerLink: '/private/productos' },
      { label: 'Modificar Producto' }
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
  }

  public async ionViewWillEnter() {
    this.route.params.subscribe((params: Params) => this.seleccionado = params.id);
    const detalles = <FormArray>this.form.get('CATEGORIAS');
    detalles.controls = [];
    this.buscando = true;
    const parametros = {
      COD_PROD: this.seleccionado,
    };
    this.listaCategorias = await this.restService.llamarServicioWeb('producto/getCategoriasProducto/'+this.seleccionado, parametros);
    this.comboTipo = this.utilitario.getCombo(await this.restService.getCombo('TIPO_PRODUCTO', 'COD_TIPR', 'NOMBRE_TIPR'));
    this.comboUnidad = this.utilitario.getCombo(await this.restService.getCombo('UNIDAD_MEDIDA', 'COD_UNID', 'NOMBRE_UNID'));
    this.respuesta = await this.consulta();
    this.nombreImagen=this.respuesta.datos.IMAGEN_PROD;
    const comboCategorias = this.utilitario.getCombo(await this.restService.getCombo('TIPO_PRODUCTO', 'COD_TIPR', 'NOMBRE_TIPR'));
    this.buscando = false;
    this.form.patchValue(this.respuesta.datos);

    comboCategorias.splice(0, 1);

    comboCategorias.forEach(fila => {
      detalles.push(
        this.fb.group({
          COD_TIPR: fila.value,
          NOMBRE_TIPR: fila.label,
          IS_CHECKED: this.isCategoriaMarcada(fila.value),
        })
      );
    });

  }

  private consulta(): Promise<RestResponse> {
    return this.restService.consultar('producto/buscarPorId/' + this.seleccionado, 1);
  }

  public async modificar() {
    this.ejecutando = true;
    this.form.controls.IMAGEN_PROD.setValue(this.nombreImagen);
    this.respuesta = await this.restService.actualizar('producto/actualizar/' + this.seleccionado, this.form.value);
    this.ejecutando = false;
    if (this.respuesta.error === false) {
      this.utilitario.agregarMensaje("Actualización", "Se Guardo correctamente.");
      this.utilitario.abrirPagina('productos');
    }

  }

  private isCategoriaMarcada(codigo) {
    if(this.listaCategorias.datos){
      const obj = this.listaCategorias.datos.find(x => x.COD_TIPR === codigo);
      if (obj) {
        return true;
      }
    }
   
    return false;
  }

  public getValorCategoria(index, type: string) {
    const detalles = <FormArray>this.form.get('CATEGORIAS');
    const fila = detalles.at(index).value;
    return fila[type];
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

}

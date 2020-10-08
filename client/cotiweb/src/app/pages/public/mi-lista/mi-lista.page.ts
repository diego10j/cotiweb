import { Component, OnInit } from '@angular/core';
import { UtilitarioService } from '../../../services/utilitario.service';
import { Producto } from '../../../interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-lista',
  templateUrl: './mi-lista.page.html',
  styleUrls: ['./mi-lista.page.scss'],
})
export class MiListaPage{

  listaProductos: Producto[] = [];
  numNotificaciones = 0;


  constructor(private router: Router,
    private utilitario: UtilitarioService) {

  }

  public async ionViewWillEnter() {
    this.listaProductos = await this.utilitario.getListaProductos();
    this.numNotificaciones = (await this.utilitario.getListaProductos()).length;
  }

  async eliminarProducto(evt) {
    await this.utilitario.eliminarProductoLista(evt);
    this.numNotificaciones = (await this.utilitario.getListaProductos()).length;
    this.listaProductos = await this.utilitario.getListaProductos();
  }

  public abrirCotizar() {
    this.utilitario.setListaProductos(this.listaProductos);
    this.utilitario.abrirPaginaPublica('cotizar');
  }
  public abrirLista() {
    this.utilitario.setListaProductos(this.listaProductos);
    this.utilitario.abrirPaginaPublica('mi-lista');
  }
  public abrirCatalogo() {
    this.utilitario.setListaProductos(this.listaProductos);
    this.utilitario.abrirPaginaPublica('catalogo');
  }
}

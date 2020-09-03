import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/private/inicio',
    pathMatch: 'full',
  },
  { path: 'usuarios', loadChildren: './usuarios/usuarios.module#UsuariosPageModule' },
  { path: 'crear-usuario', loadChildren: './usuarios/crear-usuario/crear-usuario.module#CrearUsuarioPageModule' },
  { path: 'modificar-usuario/:id', loadChildren: './usuarios/modificar-usuario/modificar-usuario.module#ModificarUsuarioPageModule' },
  { path: 'productos', loadChildren: './productos/productos.module#ProductosPageModule' },
  { path: 'crear-producto', loadChildren: './productos/crear-producto/crear-producto.module#CrearProductoPageModule' },
  { path: 'modificar-producto/:id', loadChildren: './productos/modificar-producto/modificar-producto.module#ModificarProductoPageModule' },
  { path: 'empresa', loadChildren: './sistema/empresa/empresa.module#EmpresaPageModule' },
  { path: 'parametros', loadChildren: './sistema/parametros/parametros.module#ParametrosPageModule' },
  { path: 'perfiles', loadChildren: './sistema/perfiles/perfiles.module#PerfilesPageModule' },
  { path: 'opciones', loadChildren: './sistema/opciones/opciones.module#OpcionesPageModule' },
  { path: 'categorias', loadChildren: './productos/categorias/categorias.module#CategoriasPageModule' },
  { path: 'unidades', loadChildren: './productos/unidades/unidades.module#UnidadesPageModule' },
  { path: 'crear-perfil', loadChildren: './sistema/perfiles/crear-perfil/crear-perfil.module#CrearPerfilPageModule' },
  { path: 'modificar-perfil/:id', loadChildren: './sistema/perfiles/modificar-perfil/modificar-perfil.module#ModificarPerfilPageModule' },
  { path: 'permisos', loadChildren: './sistema/permisos/permisos.module#PermisosPageModule' },
  { path: 'crear-opcion', loadChildren: './sistema/opciones/crear-opcion/crear-opcion.module#CrearOpcionPageModule' },
  { path: 'modificar-opcion/:id', loadChildren: './sistema/opciones/modificar-opcion/modificar-opcion.module#ModificarOpcionPageModule' },
  { path: 'modificar-parametro/:id', loadChildren: './sistema/parametros/modificar-parametro/modificar-parametro.module#ModificarParametroPageModule' },
  { path: 'crear-categoria', loadChildren: './productos/categorias/crear-categoria/crear-categoria.module#CrearCategoriaPageModule' },
  { path: 'modificar-categoria/:id', loadChildren: './productos/categorias/modificar-categoria/modificar-categoria.module#ModificarCategoriaPageModule' },
  { path: 'clientes', loadChildren: './clientes/clientes.module#ClientesPageModule' },
  { path: 'crear-cliente', loadChildren: './clientes/crear-cliente/crear-cliente.module#CrearClientePageModule' },
  { path: 'modificar-cliente/:id', loadChildren: './clientes/modificar-cliente/modificar-cliente.module#ModificarClientePageModule' },
  { path: 'archivos', loadChildren: './productos/archivos/archivos.module#ArchivosPageModule' },
  { path: 'inicio', loadChildren: './inicio/inicio.module#InicioPageModule' },
  { path: 'cotizaciones', loadChildren: './cotizaciones/cotizaciones.module#CotizacionesPageModule' },
  { path: 'mis-cotizaciones', loadChildren: './cotizaciones/mis-cotizaciones/mis-cotizaciones.module#MisCotizacionesPageModule' },
  { path: 'tipo-cotizacion', loadChildren: './cotizaciones/tipo-cotizacion/tipo-cotizacion.module#TipoCotizacionPageModule' },
  { path: 'validez-cotizacion', loadChildren: './cotizaciones/validez-cotizacion/validez-cotizacion.module#ValidezCotizacionPageModule' },
  { path: 'condicion-cotizacion', loadChildren: './cotizaciones/condicion-cotizacion/condicion-cotizacion.module#CondicionCotizacionPageModule' },
  { path: 'graficos', loadChildren: './cotizaciones/graficos/graficos.module#GraficosPageModule' },
  { path: 'formulario', loadChildren: './cotizaciones/formulario/formulario.module#FormularioPageModule' },
  { path: 'modificar', loadChildren: './cotizaciones/modificar/modificar.module#ModificarPageModule' },
  { path: 'crear-unidad', loadChildren: './productos/unidades/crear-unidad/crear-unidad.module#CrearUnidadPageModule' },
  { path: 'modificar-unidad', loadChildren: './productos/unidades/modificar-unidad/modificar-unidad.module#ModificarUnidadPageModule' },
  ];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forChild(routes)]
  ],
  exports: [
    RouterModule
  ]
})
export class PrivateRoutingModule { }

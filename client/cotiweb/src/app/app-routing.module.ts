import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'catalogo',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './pages/public/login/login.module#LoginPageModule'
  },
  {
    path: 'private',
    //canLoad: [AuthGuardService],
    //runGuardsAndResolvers: 'always',
    loadChildren: './pages/private/private-routing.module#PrivateRoutingModule'
  },
  { path: 'catalogo', loadChildren: './pages/public/catalogo/catalogo.module#CatalogoPageModule' },
  { path: 'info-producto/:id', loadChildren: './pages/public/info-producto/info-producto.module#InfoProductoPageModule' },
  { path: 'cotizar', loadChildren: './pages/public/cotizar/cotizar.module#CotizarPageModule' },
  { path: 'mi-lista', loadChildren: './pages/public/mi-lista/mi-lista.module#MiListaPageModule' },
 ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

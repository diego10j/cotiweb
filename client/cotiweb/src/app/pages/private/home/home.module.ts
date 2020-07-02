import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../../components/components.module';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
  },
  {
    path: '',
    component: HomePage,
    children: [
      { path: 'inicio', loadChildren: './inicio/inicio.module#InicioPageModule' },
      { path: 'notificaciones', loadChildren: './notificaciones/notificaciones.module#NotificacionesPageModule' },
      { path: 'usuario', loadChildren: './usuario/usuario.module#UsuarioPageModule' },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    FontAwesomeModule,
    RouterModule.forChild(routes),
  ],
  declarations: [HomePage],
})
export class HomePageModule {}

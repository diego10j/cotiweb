import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import { ConfiguracionPage } from '../../modal/configuracion/configuracion.page';
import { ConfiguracionPageModule } from '../../modal/configuracion/configuracion.module';
import { ComponentsModule } from '../../../components/components.module';


const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  entryComponents: [
    ConfiguracionPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    ConfiguracionPageModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}

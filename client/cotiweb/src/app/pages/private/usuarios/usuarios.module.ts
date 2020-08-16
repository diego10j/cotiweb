import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UsuariosPage } from './usuarios.page';
import { TableModule } from 'primeng/table';
import { ComponentsModule } from '../../../components/components.module';
import { ToastModule } from 'primeng/toast';
const routes: Routes = [
  {
    path: '',
    component: UsuariosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToastModule,
    TableModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UsuariosPage]
})
export class UsuariosPageModule {}

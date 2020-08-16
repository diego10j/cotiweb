import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CategoriasPage } from './categorias.page';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ComponentsModule } from '../../../../components/components.module';
import { CheckboxModule } from 'primeng/checkbox';

const routes: Routes = [
  {
    path: '',
    component: CategoriasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToastModule,
    TableModule,
    CheckboxModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CategoriasPage]
})
export class CategoriasPageModule {}

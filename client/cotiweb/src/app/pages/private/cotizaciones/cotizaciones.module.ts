import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CotizacionesPage } from './cotizaciones.page';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ComponentsModule } from '../../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: CotizacionesPage
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
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CotizacionesPage]
})
export class CotizacionesPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CondicionCotizacionPage } from './condicion-cotizacion.page';

const routes: Routes = [
  {
    path: '',
    component: CondicionCotizacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CondicionCotizacionPage]
})
export class CondicionCotizacionPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TipoCotizacionPage } from './tipo-cotizacion.page';

const routes: Routes = [
  {
    path: '',
    component: TipoCotizacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TipoCotizacionPage]
})
export class TipoCotizacionPageModule {}

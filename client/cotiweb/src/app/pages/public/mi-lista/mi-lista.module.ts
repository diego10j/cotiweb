import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MiListaPage } from './mi-lista.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';

const routes: Routes = [
  {
    path: '',
    component: MiListaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    ButtonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MiListaPage]
})
export class MiListaPageModule {}

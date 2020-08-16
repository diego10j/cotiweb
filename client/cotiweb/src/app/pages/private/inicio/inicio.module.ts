import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InicioPage } from './inicio.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from '../../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: InicioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {}

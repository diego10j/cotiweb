import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClientesPage } from './clientes.page';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ComponentsModule } from '../../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: ClientesPage
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
  declarations: [ClientesPage]
})
export class ClientesPageModule {}

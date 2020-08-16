import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProductosPage } from './productos.page';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

const routes: Routes = [
  {
    path: '',
    component: ProductosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TableModule,
    ToastModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductosPage]
})
export class ProductosPageModule {}

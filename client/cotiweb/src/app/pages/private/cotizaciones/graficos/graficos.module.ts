import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {ListboxModule} from 'primeng/listbox';
import { IonicModule } from '@ionic/angular';
import {ChartModule} from 'primeng/chart';
import { GraficosPage } from './graficos.page';
import { TableModule } from 'primeng/table';
import { ComponentsModule } from '../../../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: GraficosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TableModule,
    ComponentsModule,
    ChartModule,
    ListboxModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GraficosPage]
})
export class GraficosPageModule {}

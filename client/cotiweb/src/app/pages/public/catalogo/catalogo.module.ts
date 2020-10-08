import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CatalogoPage } from './catalogo.page';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {PaginatorModule} from 'primeng/paginator';
import { PipesModule } from '../../../pipes/pipes.module';
const routes: Routes = [
  {
    path: '',
    component: CatalogoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataViewModule,
    PanelModule,
    TableModule,
    DialogModule,
    InputTextModule,
    FontAwesomeModule,
    PipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CatalogoPage]
})
export class CatalogoPageModule {}

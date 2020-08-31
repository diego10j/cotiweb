import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaComponent } from './mapa/mapa.component';
import { IonicModule } from '@ionic/angular';
import { NotaComponent } from './nota/nota.component';
import { ComboComponent } from './combo/combo.component';
import { FormsModule } from '@angular/forms';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { ResultadoVacioComponent } from './resultado-vacio/resultado-vacio.component';
import { AcordionComponent } from './acordion/acordion.component';
import {DropdownModule} from 'primeng/dropdown';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
  declarations: [
    MapaComponent,
    NotaComponent,
    ComboComponent,
    AvatarSelectorComponent,
    ResultadoVacioComponent,
    AcordionComponent,
  ],
  exports: [
    MapaComponent,
    NotaComponent,
    ComboComponent,
    AvatarSelectorComponent,
    ResultadoVacioComponent,
    AcordionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DropdownModule,
    BreadcrumbModule,
  ]
})
export class ComponentsModule { }

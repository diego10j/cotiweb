import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPipe } from './filtro.pipe';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';
import { ImagenPipe } from './imagen.pipe';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
@NgModule({
  declarations: [FiltroPipe, ImageSanitizerPipe, ImagenPipe, DomSanitizerPipe],
  imports: [
    CommonModule
  ],
  exports: [ FiltroPipe, ImageSanitizerPipe,ImagenPipe,DomSanitizerPipe]

})
export class PipesModule { }

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarUnidadPage } from './modificar-unidad.page';

describe('ModificarUnidadPage', () => {
  let component: ModificarUnidadPage;
  let fixture: ComponentFixture<ModificarUnidadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarUnidadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarUnidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

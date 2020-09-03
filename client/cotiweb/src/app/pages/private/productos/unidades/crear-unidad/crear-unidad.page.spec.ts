import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearUnidadPage } from './crear-unidad.page';

describe('CrearUnidadPage', () => {
  let component: CrearUnidadPage;
  let fixture: ComponentFixture<CrearUnidadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearUnidadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearUnidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

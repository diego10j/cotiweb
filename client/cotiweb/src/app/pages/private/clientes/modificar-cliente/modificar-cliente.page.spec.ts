import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarClientePage } from './modificar-cliente.page';

describe('ModificarClientePage', () => {
  let component: ModificarClientePage;
  let fixture: ComponentFixture<ModificarClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarClientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

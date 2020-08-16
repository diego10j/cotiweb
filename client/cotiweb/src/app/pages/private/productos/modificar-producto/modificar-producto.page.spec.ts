import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarProductoPage } from './modificar-producto.page';

describe('ModificarProductoPage', () => {
  let component: ModificarProductoPage;
  let fixture: ComponentFixture<ModificarProductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarProductoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

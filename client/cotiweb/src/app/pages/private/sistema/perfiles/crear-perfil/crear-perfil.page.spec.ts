import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPerfilPage } from './crear-perfil.page';

describe('CrearPerfilPage', () => {
  let component: CrearPerfilPage;
  let fixture: ComponentFixture<CrearPerfilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearPerfilPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosPage } from './permisos.page';

describe('PermisosPage', () => {
  let component: PermisosPage;
  let fixture: ComponentFixture<PermisosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermisosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

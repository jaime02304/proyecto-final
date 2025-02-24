import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarUsuarioPerfilComponent } from './modificar-usuario-perfil.component';

describe('ModificarUsuarioPerfilComponent', () => {
  let component: ModificarUsuarioPerfilComponent;
  let fixture: ComponentFixture<ModificarUsuarioPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarUsuarioPerfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarUsuarioPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

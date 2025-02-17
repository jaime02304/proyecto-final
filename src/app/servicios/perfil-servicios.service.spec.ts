import { TestBed } from '@angular/core/testing';

import { PerfilServiciosService } from './perfil-servicios.service';

describe('PerfilServiciosService', () => {
  let service: PerfilServiciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilServiciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

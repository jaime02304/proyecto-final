import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ServicioUsuariosService } from '../servicios/servicio-usuarios.service';

export const isLoginGuard: CanActivateFn = (route, state) => {
  const servicioUsuario = inject(ServicioUsuariosService);
  const router = inject(Router);

  if (servicioUsuario.usuarioPerfil$) {
    return true;
  }
  router.navigate(['/inicio-sesion'])
  return false;
};

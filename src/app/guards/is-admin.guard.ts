import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ServicioUsuariosService } from '../servicios/servicio-usuarios.service';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const usuarioServicio = inject(ServicioUsuariosService);
  const router = inject(Router);

  let usuarioPerfilrol = usuarioServicio.usuarioPerfil?.rolUsu;

  if ((usuarioPerfilrol = 'user')) {
    return true;
  }

  router.navigate(['/']);
  return false;
};

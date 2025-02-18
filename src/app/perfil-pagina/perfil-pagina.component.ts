import { NgFor, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../modelos/usuario';
import { ServicioUsuariosService } from '../servicios/servicio-usuarios.service';
import { PerfilServiciosService } from '../servicios/perfil-servicios.service';
import { listadoGrupos } from '../modelos/grupos';

@Component({
  selector: 'app-perfil-pagina',
  standalone: true,
  imports: [NgIf, RouterModule, NgFor],
  templateUrl: './perfil-pagina.component.html',
  styleUrl: './perfil-pagina.component.css',
})
export class PerfilPaginaComponent {
  usuario?: Usuario | null;
  listadoGruposUsuario: listadoGrupos[] = [];
  hayMensaje = false;

  constructor(
    private servicioUsuario: ServicioUsuariosService,
    private servicioPerfil: PerfilServiciosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Intentar recuperar el usuario desde localStorage
    const usuarioGuardado = localStorage.getItem('usuario');

    if (usuarioGuardado) {
      // Convertimos la cadena a objeto Usuario
      const usuarioParseado = JSON.parse(usuarioGuardado) as Usuario;
      this.usuario = usuarioParseado;
      // Con el usuario disponible, obtenemos sus grupos
      this.obtenerGrupos(usuarioParseado);
    } else {
      // Si no hay usuario en localStorage, nos suscribimos al observable
      this.servicioUsuario.usuarioPerfil$.subscribe((user: Usuario | null) => {
        if (user) {
          this.usuario = user;
          // Guardamos el usuario en localStorage
          localStorage.setItem('usuario', JSON.stringify(user));
          // Obtenemos los grupos del usuario
          this.obtenerGrupos(user);
        }
      });
    }
  }

  // Método para obtener los grupos del usuario
  private obtenerGrupos(usuario: Usuario): void {
    // Intentar recuperar los grupos desde localStorage
    const gruposGuardados = localStorage.getItem('gruposUsuario');

    if (gruposGuardados) {
      const parsed = JSON.parse(gruposGuardados);
      // Si no es un array, conviértelo en uno
      console.log(JSON.parse(gruposGuardados).mensaje);
      if (JSON.parse(gruposGuardados).mensaje) {
        this.hayMensaje = true;
        console.log(this.hayMensaje);
      }

      this.listadoGruposUsuario = Array.isArray(parsed)
        ? parsed
        : Object.values(parsed);
      console.log(this.listadoGruposUsuario);
    } else {
      // Si no existen en localStorage, llamamos al servicio para obtenerlos
      this.servicioPerfil
        .obtenerGrupo(usuario)
        .subscribe((grupos: listadoGrupos[]) => {
          this.listadoGruposUsuario = grupos;
          // Si prefieres, también puedes guardar aquí los grupos:
          //localStorage.setItem('gruposUsuario', JSON.stringify(grupos));
        });
    }

    // // Recuperar comentario si existe en localStorage
    // const comentarioGuardado = localStorage.getItem('comentarioUsuario');
    // if (comentarioGuardado) {
    //   this.comentario = JSON.parse(comentarioGuardado);
    // } else {
    //   this.servicioUsuario
    //     .obtenerComentarioUsuario()
    //     .subscribe((comentario) => {
    //       this.comentario = comentario;
    //       if (comentario) {
    //         localStorage.setItem(
    //           'comentarioUsuario',
    //           JSON.stringify(comentario)
    //         ); // Guardar comentario en localStorage
    //       }
    //     });
    // }
  }

  cerrarSesion() {
    this.servicioUsuario.cerrarSesion();
    localStorage.removeItem('usuario');
    localStorage.removeItem('gruposUsuario');
    localStorage.removeItem('comentarioUsuario');
    this.router.navigate(['/']); // Redirige al inicio de sesión
  }

  openFormularioModal() {
    console.log('Abrir modal para crear grupo');
  }

  alertaDelPremium() {
    alert('Funcionalidad de premium aún no implementada');
  }
}

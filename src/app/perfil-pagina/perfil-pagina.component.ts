import { NgFor, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../modelos/usuario';
import { ServicioUsuariosService } from '../servicios/servicio-usuarios.service';
import { PerfilServiciosService } from '../servicios/perfil-servicios.service';
import { listadoGrupos } from '../modelos/grupos';
import { comentariosPerfilDto } from '../modelos/comentarios';

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
  comentarioPerfil?: comentariosPerfilDto;
  hayMensaje = false;
  hayMensajeComentario = false;

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
      this.obtenerComentarios(usuarioParseado);
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
      if (JSON.parse(gruposGuardados).mensaje) {
        this.hayMensaje = true;
        console.log(this.hayMensaje);
      }
      console.log(parsed);
      
      this.listadoGruposUsuario = Array.isArray(parsed.gruposPerfil)
        ? parsed.gruposPerfil
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
  }
  private obtenerComentarios(usuario: Usuario): void {
    // // Recuperar comentario si existe en localStorage
    const comentarioGuardado = localStorage.getItem('comentarioUsuario');

    if (comentarioGuardado) {
      const parsed = JSON.parse(comentarioGuardado);
      // Si el comentario contiene una propiedad "mensaje", activamos una bandera
      if (parsed.mensaje) {
        this.hayMensajeComentario = true;
        console.log(this.hayMensajeComentario);
      }

      this.comentarioPerfil = parsed.comentarios;
      console.log(this.comentarioPerfil);
    } else {
      // Si no existe en localStorage, llamamos al servicio para obtenerlo
      this.servicioPerfil
        .obtenerComentario(usuario)
        .subscribe((comentario: comentariosPerfilDto) => {
          this.comentarioPerfil = comentario;
          // Guardar comentario en localStorage si se obtiene
          if (comentario) {
            localStorage.setItem(
              'comentarioUsuario',
              JSON.stringify(comentario)
            );
          }
        });
    }
  }

  cerrarSesion() {
    this.servicioUsuario.cerrarSesion();
    localStorage.removeItem('usuario');
    localStorage.removeItem('gruposUsuario');
    localStorage.removeItem('comentarioUsuario');
    this.router.navigate(['/']); // Redirige al inicio de sesión
  }


  alertaDelPremium() {
    alert('Funcionalidad de premium aún no implementada');
  }
}

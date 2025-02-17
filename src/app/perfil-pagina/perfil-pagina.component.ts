import { NgFor, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../modelos/usuario';
import { ServicioUsuariosService } from '../servicios/servicio-usuarios.service';
import { PerfilServiciosService } from '../servicios/perfil-servicios.service';

@Component({
  selector: 'app-perfil-pagina',
  standalone: true,
  imports: [NgIf, NgFor, RouterModule],
  templateUrl: './perfil-pagina.component.html',
  styleUrl: './perfil-pagina.component.css',
})
export class PerfilPaginaComponent {
  usuario?: Usuario | null;
  // listadoGruposUsuario: Grupo[] = [];
  // comentario?: Comentario | null;

  constructor(
    private servicioUsuario: ServicioUsuariosService,
    private router: Router
  ) {}

  ngOnInit() {
    // Recuperar usuario de localStorage si existe
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
    } else {
      this.servicioUsuario.usuarioPerfil$.subscribe((user) => {
        this.usuario = user;
        if (user) {
          localStorage.setItem('usuario', JSON.stringify(user)); // Guardar usuario en localStorage
        }
      });
    }

    // Recuperar grupos del usuario si existen en localStorage
    // const gruposGuardados = localStorage.getItem('gruposUsuario');
    // if (gruposGuardados) {
    //   this.listadoGruposUsuario = JSON.parse(gruposGuardados);
    // } else {
    //   this.servicioUsuario.obtenerGruposUsuario().subscribe((grupos) => {
    //     this.listadoGruposUsuario = grupos;
    //     localStorage.setItem('gruposUsuario', JSON.stringify(grupos)); // Guardar grupos en localStorage
    //   });
    // }

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

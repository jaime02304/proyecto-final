import { inject, Injectable } from '@angular/core';
import { listadoGrupos } from '../modelos/grupos';
import { Usuario } from '../modelos/usuario';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { comentariosPerfilDto } from '../modelos/comentarios';

@Injectable({
  providedIn: 'root',
})
export class PerfilServiciosService {
  private apiUrl = 'http://localhost:8081/api';
  private http = inject(HttpClient);
  private grupoSubject = new BehaviorSubject<listadoGrupos[] | null>(
    this.cargarGrupoDesdeLocalStorage()
  );
  private comentarioSubject = new BehaviorSubject<comentariosPerfilDto | null>(
    this.cargarComentarioDesdeLocalStorage()
  );

  obtenerGrupo(datos: Usuario): Observable<listadoGrupos[]> {
    return this.http
      .post<listadoGrupos[]>(`${this.apiUrl}/perfil/grupos`, datos)
      .pipe(
        tap((grupo: listadoGrupos[]) => {
          console.log(grupo);
          this.setGrupo(grupo);
        })
      );
  }

  obtenerComentario(datos: Usuario): Observable<comentariosPerfilDto> {
    return this.http
      .post<comentariosPerfilDto>(`${this.apiUrl}/perfil/comentario`, datos)
      .pipe(
        tap((comentario: comentariosPerfilDto) => {
          this.setComent(comentario);
        })
      );
  }

  modificarUsuario(datos: Usuario): Observable<Usuario> {
    return this.http
      .post<Usuario>(`${this.apiUrl}/ModificarUsuario`, datos)
      .pipe(
        tap((usuario: Usuario) => {
          if (usuario && usuario.idUsu) {
            this.setUser(usuario);
            this.obtenerGrupo(usuario).subscribe((grupoResponse) => {
              console.log(grupoResponse);
              this.obtenerComentario(usuario).subscribe(
                (comentarioResponse) => {
                  console.log(comentarioResponse);
                }
              );
            });
          } else {
            throw new Error('Mensaje de error'); // Lanzar un error si no es un usuario válido
          }
        })
      );
  }

  // Guarda el usuario en BehaviorSubject y localStorage
  private setUser(usuario: Usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario)); // Guarda en localStorage
  }

  // Cargar usuario desde localStorage
  private cargarUsuarioDesdeLocalStorage(): Usuario | null {
    const usuarioGuardado = localStorage.getItem('usuario');
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  }

  // Guarda el grupo en BehaviorSubject y localStorage
  private setComent(comentario: comentariosPerfilDto) {
    this.comentarioSubject.next(comentario);
    localStorage.setItem('comentarioUsuario', JSON.stringify(comentario)); // Guarda en localStorage
  }

  // Cargar grupo desde localStorage
  private cargarComentarioDesdeLocalStorage(): comentariosPerfilDto | null {
    const comentarioGuardado = localStorage.getItem('comentarioUsuario');
    return comentarioGuardado ? JSON.parse(comentarioGuardado) : null;
  }

  // Guarda el grupo en BehaviorSubject y localStorage
  private setGrupo(grupo: listadoGrupos[]) {
    this.grupoSubject.next(grupo);
    localStorage.setItem('gruposUsuario', JSON.stringify(grupo)); // Guarda en localStorage
  }

  // Cargar grupo desde localStorage
  private cargarGrupoDesdeLocalStorage(): listadoGrupos[] | null {
    const grupoGuardado = localStorage.getItem('gruposUsuario');
    return grupoGuardado ? JSON.parse(grupoGuardado) : null;
  }
}

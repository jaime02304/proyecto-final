import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginUsuario, RegistroUsuario, Usuario } from '../modelos/usuario';
import { PerfilServiciosService } from './perfil-servicios.service';

@Injectable({
  providedIn: 'root',
})
export class ServicioUsuariosService {
  private apiUrl = 'http://localhost:8081/api'; // URL base de la API
  private userSubject = new BehaviorSubject<Usuario | null>(
    this.cargarUsuarioDesdeLocalStorage()
  );
  usuarioPerfil$ = this.userSubject.asObservable();

  private http = inject(HttpClient);
  private servicioPerfil = inject(PerfilServiciosService);

  constructor() {}

  // Método para iniciar sesión
  obtenerUsuario(datos: LoginUsuario): Observable<Usuario> {
    return this.http
      .post<Usuario>(`${this.apiUrl}/usuario/inicioSesion`, datos)
      .pipe(
        tap((usuario) => {
          this.setUser(usuario);
          this.servicioPerfil.obtenerGrupo(usuario).subscribe((response) => {
            console.log(response);
            this.servicioPerfil
              .obtenerComentario(usuario)
              .subscribe((response2) => {
                console.log(response2);
              });
          });
        })
      );
  }

  // Método para registrar usuario
  registro(datos: RegistroUsuario): Observable<Usuario> {
    return this.http
      .post<Usuario>(`${this.apiUrl}/usuario/registro`, datos)
      .pipe(
        tap((usuario) => {
          this.setUser(usuario);
        })
      );
  }
  // Guarda el usuario en BehaviorSubject y localStorage
  private setUser(usuario: Usuario) {
    this.userSubject.next(usuario);
    localStorage.setItem('usuario', JSON.stringify(usuario)); // Guarda en localStorage
  }

  // Cargar usuario desde localStorage
  private cargarUsuarioDesdeLocalStorage(): Usuario | null {
    const usuarioGuardado = localStorage.getItem('usuario');
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  }

  // Método para cerrar sesión
  cerrarSesion() {
    this.userSubject.next(null);
    localStorage.removeItem('usuario'); // Elimina el usuario de localStorage
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginUsuario, RegistroUsuario, Usuario } from '../modelos/usuario';

@Injectable({
  providedIn: 'root',
})
export class ServicioUsuariosService {
  private userSubject = new BehaviorSubject<any | null>(null);
  private apiUrl = 'http://localhost:8081/api/usuario'; // URL base de la API
  usuarioPerfil$?: Observable<Usuario | null> = this.userSubject.asObservable();

  private http = inject(HttpClient);

  // Método para iniciar sesión
  obtenerUsuario(datos: LoginUsuario) {
    this.http
      .post(`${this.apiUrl}/inicioSesion`, datos)
      .subscribe((usuario) => {
        this.setUser(usuario);
      });
  }

  // Método para registrar un nuevo usuario
  registro(datos: RegistroUsuario) {
    return this.http
      .post(`${this.apiUrl}/registro`, datos)
      .subscribe((usuario) => {
        this.setUser(usuario);
      });
  }

  setUser(dataUsuario: any) {
    this.userSubject.next(dataUsuario);
  }
}

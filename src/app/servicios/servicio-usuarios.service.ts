import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { LoginUsuario, RegistroUsuario, Usuario } from '../modelos/usuario';

@Injectable({
  providedIn: 'root',
})
export class ServicioUsuariosService {
  private apiUrl = 'http://localhost:8081/api/usuario'; // URL base de la API
  usuarioPerfil?: Usuario;

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  inicioSesion(datos: LoginUsuario): Observable<Usuario> {
    return this.http.post(
      `${this.apiUrl}/inicioSesion`,
      datos
    ) as Observable<Usuario>;
  }

  obtenerUsuario(datos: LoginUsuario): Promise<any> {
    return lastValueFrom(this.http.post(`${this.apiUrl}/inicioSesion`, datos));
  }

  // Método para registrar un nuevo usuario
  registro(datos: RegistroUsuario): Observable<Usuario> {
    return this.http.post(
      `${this.apiUrl}/registro`,
      datos
    ) as Observable<Usuario>;
  }
}

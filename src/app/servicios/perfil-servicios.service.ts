import { inject, Injectable } from '@angular/core';
import { listadoGrupos } from '../modelos/grupos';
import { Usuario } from '../modelos/usuario';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PerfilServiciosService {
  private apiUrl = 'http://localhost:8081/api';
  private http = inject(HttpClient);
  private grupoSubject = new BehaviorSubject<listadoGrupos[] | null>(
    this.cargarGrupoDesdeLocalStorage()
  );

  obtenerGrupo(datos: Usuario): Observable<listadoGrupos[]> {
    return this.http
      .post<listadoGrupos[]>(`${this.apiUrl}/perfil/grupos`, datos)
      .pipe(
        tap((grupo:listadoGrupos[]) => {
          this.setGrupo(grupo);
        })
      );
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

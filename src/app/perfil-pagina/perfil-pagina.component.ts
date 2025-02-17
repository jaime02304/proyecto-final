import { NgFor, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
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
private servicioUsuario = inject(ServicioUsuariosService);
private servicioPerfil = inject(PerfilServiciosService);

  @Input() usuario?: Usuario;
  @Input() listadoGruposUsuario: any[]=[];
  @Input() comentario: any;

  constructor() {}

  ngOnIniti(){
   // this.usuario=this.servicioUsuario.usuarioPerfil$;
  }

  openFormularioModal(): void {
    // Aquí podrías emitir un evento o llamar a un servicio para abrir el modal de edición del perfil.
    console.log('Abrir modal de edición del perfil.');
  }

  openCreacionGrupoModal(): void {
    // Llama al componente de modales o emite un evento para abrir el modal de creación de grupo.
    console.log('Abrir modal de creación de grupo.');
  }

  alertaDelPremium(): void {
    // Emite un evento o llama a un servicio para mostrar la alerta.
    console.log('Mostrar alerta de Premium.');
  }
}

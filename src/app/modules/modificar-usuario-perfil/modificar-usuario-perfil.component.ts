import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-usuario-perfil',
  standalone: true,
  imports: [],
  templateUrl: './modificar-usuario-perfil.component.html',
  styleUrl: './modificar-usuario-perfil.component.css',
})
export class ModificarUsuarioPerfilComponent {
  router = inject(Router);

  
  closeFormularioModal() {
    const modal = document.getElementById('formularioModal');
    if (modal) {
      modal.style.display = 'none'; // Ocultar el modal
      this.router.navigate(['pagina-perfil']);    }
  }
}

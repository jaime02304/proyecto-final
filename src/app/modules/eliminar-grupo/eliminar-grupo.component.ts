import { NgIf } from '@angular/common';
import { DeleteItem } from '../../modelos/grupos';
import { PerfilServiciosService } from './../../servicios/perfil-servicios.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-eliminar-grupo',
  standalone: true,
  imports: [NgIf],
  templateUrl: './eliminar-grupo.component.html',
  styleUrl: './eliminar-grupo.component.css',
})
export class EliminarGrupoComponent {
  deleteItem: DeleteItem = {
    idElementoEliminar: 0,
    elementoEliminar: '',
    esUsuarioEliminar: false,
  };

  isProcessing = false; // Estado para deshabilitar botón mientras se envía la solicitud
  isModalOpen = true; // Controla la visibilidad del modal

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicioPerfil: PerfilServiciosService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const nombreParam = this.route.snapshot.paramMap.get('nombre');

    this.deleteItem = {
      idElementoEliminar: idParam ? +idParam : 0,
      elementoEliminar: nombreParam ?? '',
      esUsuarioEliminar: false,
    };
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.router.navigate(['/pagina-perfil']);
  }

  onSubmit(): void {
    if (!this.deleteItem.elementoEliminar) {
      alert('No se encontró el elemento a eliminar.');
      return;
    }
    console.log('hola');

    this.isProcessing = true; // Deshabilitar botón mientras se procesa la eliminación

    this.servicioPerfil.eliminarElemento(this.deleteItem).subscribe({
      next: () => {
        alert('Elemento eliminado correctamente. Se actualizará la página.');
        this.closeModal();
      },
      error: (error) => {
        console.error('Error al eliminar:', error);
        alert('Hubo un problema al eliminar el elemento. Intente nuevamente.');
      },
      complete: () => {
        this.isProcessing = false; // Habilitar botón tras finalizar la operación
      },
    });
  }
}

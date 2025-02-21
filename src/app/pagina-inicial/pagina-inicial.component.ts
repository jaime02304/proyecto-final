import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ServicioUsuariosService } from '../servicios/servicio-usuarios.service';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css'
})
export class PaginaInicialComponent {
}

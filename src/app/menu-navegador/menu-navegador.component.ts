import {
  Component,
  ElementRef,
  ViewChild,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServicioUsuariosService } from '../servicios/servicio-usuarios.service';

@Component({
  selector: 'app-menu-navegador',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-navegador.component.html',
  styleUrl: './menu-navegador.component.css',
})
export class MenuNavegadorComponent {
  @ViewChild('menuToggle') menuToggle!: ElementRef;
  @ViewChild('menuOpciones') menuOpciones!: ElementRef;
  menuVisible = false;
  usuarioServicio = inject(ServicioUsuariosService);
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (
      this.menuOpciones &&
      this.menuToggle &&
      !this.menuOpciones.nativeElement.contains(event.target) &&
      !this.menuToggle.nativeElement.contains(event.target)
    ) {
      this.menuVisible = false;
    }
  }

  // ngOnInit() {
  //   this.usuarioServicio.
  // }
}

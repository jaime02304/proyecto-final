import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-navegador',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './menu-navegador.component.html',
  styleUrl: './menu-navegador.component.css'
})
export class MenuNavegadorComponent {
  @ViewChild('menuToggle') menuToggle!: ElementRef;
  @ViewChild('menuOpciones') menuOpciones!: ElementRef;
  menuVisible = false;

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
}

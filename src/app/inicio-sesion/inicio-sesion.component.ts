import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css',
})
export class InicioSesionComponent {
  isFlipped: boolean = false;
  isSignUpActive: boolean = false; // Controla el estado de la vista

  toggleForm(): void {
    this.isSignUpActive = !this.isSignUpActive;
    console.log(this.isSignUpActive);
    
  }
  flipForm(): void {
    this.isFlipped = !this.isFlipped;
  }
}

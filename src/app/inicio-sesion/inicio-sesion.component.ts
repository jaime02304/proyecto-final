import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoginUsuario, RegistroUsuario, Usuario } from '../modelos/usuario';
import { ServicioUsuariosService } from '../servicios/servicio-usuarios.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'], // Corregido: styleUrls (plural)
})
export class InicioSesionComponent {
  private usuarioServicio = inject(ServicioUsuariosService);
  router = inject(Router);
  user$?: Observable<Usuario | null>;

  // Variables para el efecto de la tarjeta
  isFlipped: boolean = false;
  isSignUpActive: boolean = false;

  toggleForm(): void {
    this.isSignUpActive = !this.isSignUpActive;
    console.log(this.isSignUpActive);
  }
  flipForm(): void {
    this.isFlipped = !this.isFlipped;
  }

  // Propiedad para almacenar la información del usuario (opcional aquí)
  usuarioPerfil?: Usuario;

  // Inicio de sesión
  usuarioLogin: LoginUsuario = {
    correoElectronicoUsu: '',
    contraseniaUsu: '',
  };

  inicioSesion2() {
    this.usuarioServicio.obtenerUsuario(this.usuarioLogin).subscribe(
      (usuario) => {
        if (typeof usuario === 'string') {
          alert(usuario);
        } else {
          console.log(usuario);
          this.router.navigate(['/']);
        }
      },
      (error) => {
        alert('Error en el inicio de sesión');
      }
    );
  }

  // Registro de usuario
  usuarioRegistro: RegistroUsuario = {
    nombreCompletoUsu: '',
    aliasUsu: '',
    correoElectronicoUsu: '',
    contraseniaUsu: '',
  };

  registrar() {
    if (!this.usuarioRegistro.correoElectronicoUsu.includes('@')) {
      alert('Ingrese un correo válido');
      return;
    }

    if (this.usuarioRegistro.contraseniaUsu.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (this.usuarioRegistro.aliasUsu.length > 10) {
      alert('El alias no puede tener más de 10 caracteres');
      return;
    }
    // this.usuarioRegistro.contraseniaUsu;

    this.usuarioServicio.registro(this.usuarioRegistro).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (error) => {
        alert('Error en el registro');
      }
    );
  }
}

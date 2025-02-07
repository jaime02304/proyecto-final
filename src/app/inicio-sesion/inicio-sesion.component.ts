import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoginUsuario, RegistroUsuario, Usuario } from '../modelos/usuario';
import { ServicioUsuariosService } from '../servicios/servicio-usuarios.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css',
})
export class InicioSesionComponent {
  private usuarioServicio = inject(ServicioUsuariosService);
  router = inject(Router);

  // Metodos de javascript en typescript
  isFlipped: boolean = false;
  isSignUpActive: boolean = false; // Controla el estado de la vista

  toggleForm(): void {
    this.isSignUpActive = !this.isSignUpActive;
    console.log(this.isSignUpActive);
  }
  flipForm(): void {
    this.isFlipped = !this.isFlipped;
  }

  usuarioPerfil?: Usuario;

  // Parte del inicio de sesion del usuario
  usuarioLogin: LoginUsuario = {
    correoElectronicoUsu: '',
    contraseniaUsu: '',
  };

  iniciarSesion() {
    this.usuarioServicio.inicioSesion(this.usuarioLogin).subscribe(
      (response: Usuario) => {
        console.log('Inicio de sesión exitoso', response);

        // Guardar los datos del usuario en la variable
        this.usuarioPerfil = response;

        // Opcional: Guardar en el localStorage para que persista tras recargas
        localStorage.setItem('usuario', JSON.stringify(response));

        // Redirigir a la página principal o dashboard
        this.router.navigate(['']);
      },
      (error) => {
        console.error('Error al iniciar sesión', error);
      }
    );
  }

  async inicioSesion2() {
    try {
      const perfilUsuario = await this.usuarioServicio.obtenerUsuario(
        this.usuarioLogin
      );
      console.log(perfilUsuario);
    } catch {
      console.error('error');
    }
  }

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

    // if (this.usuarioRegistro.contraseniaUsu.length < 6) {
    //   alert('La contraseña debe tener al menos 6 caracteres');
    //   return;
    // }

    if (this.usuarioRegistro.aliasUsu.length > 10) {
      alert('El alias no puede tener más de 10 caracteres');
      return;
    }

    this.usuarioServicio.registro(this.usuarioRegistro).subscribe(
      (response: Usuario) => {
        console.log('Registro exitoso', response);

        // Guardar los datos del usuario
        this.usuarioPerfil = response;

        // Opcional: Guardar en localStorage para persistencia
        localStorage.setItem('usuario', JSON.stringify(response));

        // Redirigir al dashboard o página de bienvenida
        this.router.navigate(['']);
      },
      (error) => {
        console.error('Error al registrar usuario', error);
      }
    );
  }
}

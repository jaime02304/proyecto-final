import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilServiciosService } from '../../servicios/perfil-servicios.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Usuario } from '../../modelos/usuario';

@Component({
  selector: 'app-modificar-usuario-perfil',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modificar-usuario-perfil.component.html',
  styleUrl: './modificar-usuario-perfil.component.css',
})
export class ModificarUsuarioPerfilComponent {
  servicioPerfil = inject(PerfilServiciosService);
  router = inject(Router);
  formulario!: FormGroup;
  selectedFile: File | null = null;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Inicializa el formulario con controles vacíos o con valores por defecto
    this.formulario = this.fb.group({
      aliasInput: ['', Validators.required],
      nombreCompletoInput: ['', Validators.required],
      movilInput: ['', Validators.required],
    });

    // Recupera el usuario del localStorage y lo parsea
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      // Asigna los valores al formulario. Asegúrate de que las propiedades coincidan con las del objeto usuario.
      this.formulario.patchValue({
        aliasInput: usuario.aliasUsu, // o la propiedad correspondiente
        nombreCompletoInput: usuario.nombreCompletoUsu,
        movilInput: usuario.movilUsu,
      });
    }
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  closeFormularioModal() {
    const modal = document.getElementById('formularioModal');
    if (modal) {
      modal.style.display = 'none'; // Ocultar el modal
      this.router.navigate(['pagina-perfil']);
    }
  }

  enviarFormulario(): void {
    const usuarioData: Usuario = JSON.parse(localStorage.getItem('usuario')!);
    console.log(usuarioData);
    usuarioData.aliasUsu = this.formulario.get('aliasInput')?.value;
    usuarioData.nombreCompletoUsu = this.formulario.get(
      'nombreCompletoInput'
    )?.value;
    usuarioData.movilUsu = this.formulario.get('movilInput')?.value;
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result as string;
        // Separa el contenido en líneas, teniendo en cuenta los saltos de línea
        const arrayOfStrings = fileContent.split(/\r\n|\n/);
        // Asigna el arreglo resultante a la propiedad que necesites
        usuarioData.fotoUsu = arrayOfStrings;
        console.log(usuarioData.fotoUsu);
      };
      reader.readAsText(this.selectedFile);
    }
    this.servicioPerfil.modificarUsuario(usuarioData).subscribe(
      // Llamada al servicio que se encarga de la petición HTTP
      (response: any) => {
        // Manejo de la respuesta: puede ser un mensaje o un objeto usuario
        if (response.message) {
          alert(response.message);
        } else if (response.usuario) {
          console.log('Usuario modificado:', response.usuario);
        }
        // Cierra el modal luego de enviar la información
        this.closeFormularioModal();
      },
      (error) => {
        console.error('Error al modificar usuario', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    );
  }
}

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ServicioUsuariosService } from '../../servicios/servicio-usuarios.service';
import { Router } from '@angular/router';
import { PerfilServiciosService } from '../../servicios/perfil-servicios.service';
import { Usuario } from '../../modelos/usuario';
import { CommonModule } from '@angular/common';
import { Grupos } from '../../modelos/grupos';

@Component({
  selector: 'app-crear-grupos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-grupos.component.html',
  styleUrl: './crear-grupos.component.css',
})
export class CrearGruposComponent {
  grupoForm!: FormGroup;
  isModalOpen = false;
  subcategorias: { value: string; text: string }[] = [];

  // Definición de las subcategorías por categoría
  subcategoriasPorCategoria: {
    [key: string]: { value: string; text: string }[];
  } = {
    anime: [
      { value: 'isekai', text: 'Isekai - Mundos paralelos o alternativos' },
      { value: 'shonen', text: 'Shonen - Para público juvenil masculino' },
      { value: 'shojo', text: 'Shojo - Para público juvenil femenino' },
    ],
    videojuegos: [
      {
        value: 'shooters',
        text: 'Shooters - Disparos en primera o tercera persona',
      },
      { value: 'aventuras', text: 'Aventuras - Exploración y narrativas' },
      { value: 'deportes', text: 'Deportes - Juegos deportivos' },
    ],
  };

  constructor(
    private fb: FormBuilder,
    private usuarioService: ServicioUsuariosService,
    private perfilServicio: PerfilServiciosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Se obtiene el usuario actual (por ejemplo, desde localStorage o un servicio)
    const usuarioString = localStorage.getItem('usuario');
    const usuario: Usuario | null = usuarioString
      ? (JSON.parse(usuarioString) as Usuario)
      : null;
    this.grupoForm = this.fb.group({
      aliasCreador: [usuario ? usuario.aliasUsu : ''],
      nombreGrupoNuevo: ['', Validators.required],
      categoriaGrupoNuevo: ['anime', Validators.required],
      subCategoriaGrupoNuevo: ['', Validators.required],
    });
    // Se inicializan las subcategorías según la categoría por defecto
    this.updateSubcategorias();
  }

  // Función para abrir el modal
  openModal(): void {
    this.isModalOpen = true;
    // Se puede restablecer la categoría por defecto y actualizar subcategorías
    this.grupoForm.patchValue({ categoriaGrupoNuevo: 'anime' });
    this.updateSubcategorias();
  }

  // Función para cerrar el modal
  closeModal(): void {
    const modal = document.getElementById('formularioCreacionGrupoModal');
    if (modal) {
      modal.style.display = 'none';
      this.router.navigate(['pagina-perfil']);
    }
  }

  // Actualiza las opciones de subcategorías en función de la categoría seleccionada
  updateSubcategorias(): void {
    const categoria = this.grupoForm.get('categoriaGrupoNuevo')?.value;
    this.subcategorias = this.subcategoriasPorCategoria[categoria] || [];
    // Establece la primera subcategoría como valor por defecto si existe
    if (this.subcategorias.length > 0) {
      this.grupoForm
        .get('subCategoriaGrupoNuevo')
        ?.setValue(this.subcategorias[0].value);
    } else {
      this.grupoForm.get('subCategoriaGrupoNuevo')?.setValue('');
    }
  }

  // Envío del formulario de creación de grupo
  onSubmit(): void {
    if (this.grupoForm.invalid) {
      return;
    }

    // Se crea un FormData con los datos del formulario
    const grupo: Grupos = {
      nombreGrupo: this.grupoForm.get('nombreGrupoNuevo')?.value,
      aliasCreadorUString: this.grupoForm.get('aliasCreador')?.value,
      categoriaNombre: this.grupoForm.get('categoriaGrupoNuevo')?.value,
      subCategoriaNombre: this.grupoForm.get('subCategoriaGrupoNuevo')?.value,
    };

    // Se invoca el servicio para crear el grupo
    this.perfilServicio.crearGrupo(grupo).subscribe(
      (response) => {
        this.closeModal();
        // Se muestra un mensaje de éxito
        alert(
          'Grupo creado correctamente. Dale a aceptar para observar los cambios.'
        );
        // Opcional: redirigir o actualizar la vista de grupos
      },
      (error) => {
        this.closeModal();
        console.error('Error al crear grupo', error);
        alert(
          'El grupo ya existe o ocurrió un error. Inténtalo con otro nombre.'
        );
      }
    );
  }
}

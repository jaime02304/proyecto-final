import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-grupos',
  standalone: true,
  imports: [],
  templateUrl: './crear-grupos.component.html',
  styleUrl: './crear-grupos.component.css',
})
export class CrearGruposComponent {
  fb = inject(FormBuilder);
  formularioCreacionGrupo = this.fb.group(){
    nombreGrupo:['', [Validators.required]];
        categoriaGrupo:['', [Validators.required]];
    subCategoriaGrupo: ['', [Validators.required]];
    aliasCreador: ['', [Validators.required]];
    subCategorias: { value: string; text: string }[] = [];
  }

  categorias = {
    anime: [
      { value: 'isekai', text: 'Isekai - Mundos paralelos o alternativos' },
      { value: 'shonen', text: 'Shonen - Para público juvenil masculino' },
      { value: 'shojo', text: 'Shojo - Para público juvenil femenino' },
    ],
    videojuegos: [
      { value: 'shooters', text: 'Shooters - Disparos en primera o tercera persona' },
      { value: 'aventuras', text: 'Aventuras - Exploración y narrativas' },
      { value: 'deportes', text: 'Deportes - Juegos deportivos' },
    ],
  };

 

  openModal() {
    document.getElementById('formularioCreacionGrupoModal')!.style.display = 'flex';
    this.actualizarSubcategorias();
  }

  closeModal() {
    document.getElementById('formularioCreacionGrupoModal')!.style.display = 'none';
  }

  actualizarSubcategorias() {
    if(c)
    if (this.subCategorias.length > 0) {
      this.subCategoriaGrupo = this.subCategorias[0].value;
    }
  }

  enviarCreacionGrupo(event: Event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('nombreGrupo', this.nombreGrupo);
    formData.append('categoriaNombre', this.categoriaGrupo);
    formData.append('subCategoriaNombre', this.subCategoriaGrupo);
    formData.append('aliasCreadorUString', this.aliasCreador);

  
  }
}

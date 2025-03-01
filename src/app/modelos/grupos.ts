export interface Grupos {
  idGrupo?: number;
  nombreGrupo: string;
  creadorUsuId?: number;
  aliasCreadorUString: string;
  numeroUsuarios?: number;
  fechaGrupo?: Date;
  categoriaNombre: string;
  subCategoriaNombre: string;
}

export interface listadoGrupos {
  idGrupo: number;
  nombreGrupo: string;
  categoriaNombre: string;
  subCategoriaNombre: string;
}

export interface DeleteItem {
  idElementoEliminar: number;
  elementoEliminar: string;
  esUsuarioEliminar: boolean; // siempre será false
}

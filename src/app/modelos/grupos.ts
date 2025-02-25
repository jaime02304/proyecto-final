export interface Grupos {
  idGrupo: number;
  nombreGrupo: string;
  creadorUsuId: number;
  aliasCreadorUString: string;
  numeroUsuarios: number;
  fechaGrupo: string;
  categoriaNombre: string;
  subCategoriaNombre: string;
}

export interface listadoGrupos {
  idGrupo: number;
  nombreGrupo: string;
  categoriaNombre: string;
  subCategoriaNombre: string;
}

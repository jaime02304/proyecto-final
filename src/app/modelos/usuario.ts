export interface Usuario {
  idUsu: number;
  nombreCompletoUsu: string;
  aliasUsu: string;
  correoElectronicoUsu: string;
  movilUsu: number;
  fotoUsu?: string[];
  esPremium: boolean;
  rolUsu: string;
  esVerificadoEntidad: boolean;
  contraseniaUsu?: string;
}

export interface LoginUsuario {
  correoElectronicoUsu: string;
  contraseniaUsu: string;
}

export interface RegistroUsuario {
  nombreCompletoUsu: string;
  aliasUsu: string;
  correoElectronicoUsu: string;
  contraseniaUsu: string;
}


export interface Comprador {
  CodigoOrganismo: string;
  NombreOrganismo: string;
  RutUnidad?: string;
  CodigoUnidad?: string;
  NombreUnidad?: string;
  DireccionUnidad?: string;
  ComunaUnidad?: string;
  RegionUnidad?: string;
  CodigoUsuario?: string;
  NombreUsuario?: string;
  CargoUsuario?: string;
}

export interface LicitacionFechas {
  FechaCreacion?: string;
  FechaCierre?: string;
  FechaInicio?: string;
  FechaFinal?: string;
  FechaPubRespuestas?: string;
  FechaActoAperturaTecnica?: string;
  FechaActoAperturaEconomica?: string;
  FechaPublicacion?: string;
  FechaAdjudicacion?: string;
  FechaEstimadaAdjudicacion?: string;
}

export interface LicitacionItem {
  Correlativo: number;
  CodigoCategoria: string;
  Categoria: string;
  CodigoProducto: number;
  NombreProducto: string;
  Descripcion: string;
  UnidadMedida: string;
  Cantidad: number;
  Adjudicacion?: unknown;
}

export interface Licitacion {
  CodigoExterno: string;
  Nombre: string;
  CodigoEstado: number;
  Estado?: string;
  Descripcion?: string;
  FechaCierre?: string;
  Comprador?: Comprador;
  CodigoTipo?: number;
  Tipo?: string;
  TipoConvocatoria?: string;
  Moneda?: string;
  MontoEstimado?: number;
  Etapas?: number;
  Fechas?: LicitacionFechas;
  FuenteFinanciamiento?: string;
  Tiempo?: string;
  UnidadTiempo?: string;
  Items?: {
    Cantidad: number;
    Listado: LicitacionItem[];
  };
  Adjudicacion?: unknown;
  CantidadReclamos?: number;
}

export interface LicitacionResponse {
  Cantidad: number;
  FechaCreacion: string;
  Version: string;
  Listado: Licitacion[];
}

export interface OrdenCompra {
  Codigo: string;
  Nombre: string;
  Estado: string;
  FechaEnvio?: string;
  FechaAceptacion?: string;
  TipoMoneda?: string;
  Total?: number;
  Descuento?: number;
  Cargo?: number;
  TotalNeto?: number;
  Comprador?: {
    CodigoOrganismo: string;
    NombreOrganismo: string;
  };
  Proveedor?: {
    Codigo: string;
    Nombre: string;
  };
}

export interface OrdenCompraResponse {
  Cantidad: number;
  FechaCreacion: string;
  Version: string;
  Listado: OrdenCompra[];
}

export interface Organismo {
  CodigoEmpresa: string;
  NombreEmpresa: string;
}

export type EstadoLicitacion =
  | 'activas'
  | 'adjudicada'
  | 'cerrada'
  | 'desierta'
  | 'publicada'
  | 'revocada'
  | 'suspendida'
  | 'todos';

export type EstadoOrden =
  | 'aceptada'
  | 'cancelada'
  | 'enviadaproveedor'
  | 'pendienterecepcion'
  | 'recepcionconforme'
  | 'todos';

export interface FiltrosLicitacion {
  estado?: EstadoLicitacion;
  fecha?: string;
  busqueda?: string;
  region?: string;
}

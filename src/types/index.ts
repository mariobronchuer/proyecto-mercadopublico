export interface Licitacion {
  CodigoExterno: string;
  Nombre: string;
  CodigoEstado: number;
  Descripcion?: string;
  FechaCierre: string;
  FechaPublicacion?: string;
  FechaInicio?: string;
  FechaFinal?: string;
  FechaAdjudicacion?: string;
  MontoEstimado?: number;
  Moneda?: string;
  CodigoOrganismo?: string;
  NombreOrganismo?: string;
  Estado?: string;
  Tipo?: number;
  TipoConvocatoria?: string;
  Items?: LicitacionItem[];
}

export interface LicitacionItem {
  Correlativo: number;
  CodigoCategoria: number;
  Categoria: string;
  CodigoProducto: number;
  NombreProducto: string;
  Descripcion: string;
  UnidadMedida: string;
  Cantidad: number;
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
  | 'suspendida';

export type EstadoOrden =
  | 'aceptada'
  | 'cancelada'
  | 'enviadaproveedor'
  | 'pendienterecepcion'
  | 'recepcionconforme'
  | 'todos';

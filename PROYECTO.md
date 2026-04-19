# Proyecto MercadoPublico

## Descripcion
Aplicacion web para consultar y gestionar licitaciones publicas de Chile usando la API de MercadoPublico. Desplegado en Vercel.

## Stack Tecnologico
- **Frontend:** Next.js 14 (App Router)
- **Estilos:** Tailwind CSS
- **Deploy:** Vercel
- **API:** MercadoPublico Chile

---

## API MercadoPublico - Documentacion Completa

### Obtener Ticket (API Key)
1. Ir a: https://api.mercadopublico.cl/modules/IniciarSesion.aspx
2. Iniciar sesion con **Clave Unica**
3. El codigo API llega automaticamente por email
4. **Limite:** 1 ticket por persona

### URL Base
```
https://api.mercadopublico.cl/servicios/v1/publico/[recurso].[formato]?[parametros]&ticket=[CODIGO]
```

### Formatos soportados
- `.json`
- `.jsonp`
- `.xml`

---

## Endpoints Disponibles

### 1. LICITACIONES

**URL:** `/Licitaciones.json?`

| Parametro | Descripcion | Ejemplo |
|-----------|-------------|---------|
| `codigo` | Codigo de licitacion | `1509-5-L114` |
| `fecha` | Fecha formato ddmmyyyy | `02022014` |
| `estado` | Estado de licitacion | ver abajo |
| `CodigoOrganismo` | Codigo del comprador | `6945` |
| `CodigoProveedor` | Codigo del proveedor | `17793` |

**Estados disponibles:**
- `activas`
- `adjudicada`
- `cerrada`
- `desierta`
- `publicada`
- `revocada`
- `suspendida`

**Ejemplos:**
```
# Licitaciones activas
/Licitaciones.json?estado=activas&ticket=XXX

# Licitaciones por fecha
/Licitaciones.json?fecha=19042026&ticket=XXX

# Licitacion especifica
/Licitaciones.json?codigo=1509-5-L114&ticket=XXX

# Por organismo
/Licitaciones.json?CodigoOrganismo=6945&ticket=XXX
```

---

### 2. ORDENES DE COMPRA

**URL:** `/OrdenesDeCompra.json?`

| Parametro | Descripcion | Ejemplo |
|-----------|-------------|---------|
| `codigo` | Codigo de orden | `2097-241-SE14` |
| `fecha` | Fecha formato ddmmyyyy | `02022014` |
| `estado` | Estado de orden | ver abajo |
| `CodigoOrganismo` | Codigo del comprador | `6945` |
| `CodigoProveedor` | Codigo del proveedor | `17793` |

**Estados disponibles:**
- `aceptada`
- `cancelada`
- `enviadaproveedor`
- `pendienterecepcion`
- `recepcionconforme`
- `todos`

---

### 3. CODIGOS DE ENTIDADES

**Buscar Proveedor (por RUT):**
```
/Empresas/BuscarProveedor.json?rutempresaproveedor=70.017.820-k&ticket=XXX
```
- RUT con puntos, guion y digito verificador
- Retorna: `CodigoEmpresa`, `NombreEmpresa`

**Listar Organismos Publicos:**
```
/Empresas/BuscarComprador.json?ticket=XXX
```
- Retorna lista de todos los organismos publicos
- Retorna: `CodigoEmpresa`, `NombreEmpresa`

---

## Limites y Condiciones

| Limite | Valor |
|--------|-------|
| Peticiones diarias | **10,000 por ticket** |
| Horario recomendado (alto volumen) | 22:00 - 07:00 hrs |
| Monitoreo | Por IP |

**Condiciones:**
- Datos publicos y gratuitos
- Obligatorio indicar "ChileCompra" como fuente
- Servicio puede ser modificado/suspendido
- Soporte: max 3 dias habiles

---

## Estructura del Proyecto
```
proyecto-mercadopublico/
├── app/
│   ├── page.tsx                    # Dashboard
│   ├── licitaciones/
│   │   └── page.tsx                # Lista de licitaciones
│   ├── ordenes/
│   │   └── page.tsx                # Ordenes de compra
│   └── api/
│       └── mercadopublico/
│           ├── licitaciones/route.ts
│           └── ordenes/route.ts
├── components/
│   ├── LicitacionCard.tsx
│   ├── FilterBar.tsx
│   └── Header.tsx
├── lib/
│   └── mercadopublico.ts           # Cliente API
├── types/
│   └── index.ts                    # Tipos TypeScript
├── .env.local
└── package.json
```

## Variables de Entorno
```
MERCADOPUBLICO_API_KEY=tu_ticket_aqui
```

---

## Tareas

### Fase 1: Investigacion
- [x] Revisar documentacion de la API
- [x] Identificar endpoints disponibles
- [x] Documentar parametros y formatos
- [ ] Obtener API key (ticket) - EN PROCESO

### Fase 2: Configuracion
- [ ] Crear proyecto Next.js
- [ ] Configurar Tailwind CSS
- [ ] Configurar variables de entorno

### Fase 3: Desarrollo
- [ ] Implementar cliente API (lib/mercadopublico.ts)
- [ ] Crear API routes (proxy para ocultar ticket)
- [ ] Crear pagina de licitaciones
- [ ] Crear filtros (fecha, estado, monto)
- [ ] Crear pagina de ordenes de compra
- [ ] Dashboard con mejores oportunidades

### Fase 4: Deploy
- [ ] Configurar Vercel
- [ ] Configurar variables de entorno en Vercel
- [ ] Desplegar aplicacion

---

## Notas
- Fecha inicio: 2026-04-19
- Esperando ticket/API key de ChileCompra (solicitud enviada)

## Recursos
- API ChileCompra: https://www.chilecompra.cl/api/
- Login API: https://api.mercadopublico.cl/modules/IniciarSesion.aspx
- Vercel: https://vercel.com
- Next.js: https://nextjs.org

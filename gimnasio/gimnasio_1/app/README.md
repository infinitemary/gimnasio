# Cosmos Gym - Sistema de Gestión

Este proyecto es un sistema de gestión para el gimnasio Cosmos, que permite administrar miembros, asistencias, pagos y más.

## Módulo de Gestión de Miembros

El módulo de gestión de miembros permite administrar toda la información relacionada con los miembros del gimnasio, incluyendo:

- Listado de miembros con filtros y búsqueda
- Visualización detallada de la información de cada miembro
- Creación de nuevos miembros
- Edición de información de miembros existentes
- Eliminación de miembros
- Regeneración de códigos QR para control de acceso

### Estructura del Módulo

El módulo sigue una arquitectura basada en características (Feature-based) y está organizado de la siguiente manera:

```
/features/members/
  /components/         # Componentes de UI específicos para miembros
    MemberCard.tsx     # Tarjeta para mostrar información resumida de un miembro
    MemberDetail.tsx   # Vista detallada de un miembro
    MemberForm.tsx     # Formulario para crear/editar miembros
    MemberList.tsx     # Lista de miembros con filtros y búsqueda
  /hooks/              # Hooks personalizados para la gestión de miembros
    useMembersData.ts  # Hook para manejar datos de miembros (filtrado, paginación, etc.)
  /services/           # Servicios para interactuar con la API
    members.service.ts # Servicio para operaciones CRUD de miembros
  /types/              # Definiciones de tipos
    member.types.ts    # Interfaces y tipos relacionados con miembros
```

### Páginas

El módulo incluye las siguientes páginas:

- `/dashboard/members`: Lista de todos los miembros con opciones de filtrado y búsqueda
- `/dashboard/members/[id]`: Detalles de un miembro específico
- `/dashboard/members/create`: Formulario para crear un nuevo miembro
- `/dashboard/members/edit/[id]`: Formulario para editar un miembro existente

### Características Principales

#### Listado de Miembros
- Visualización en formato de tarjetas
- Filtrado por rol, estado y plan de membresía
- Búsqueda por nombre, cédula, email o teléfono
- Paginación para manejar grandes cantidades de miembros

#### Detalles de Miembro
- Información personal completa
- Información de contacto
- Detalles de membresía
- Código QR para control de acceso
- Opciones para editar o eliminar el miembro

#### Formulario de Miembro
- Validación de campos requeridos
- Manejo de información de contacto de emergencia
- Selección de plan de membresía
- Soporte para modo de creación y edición

### Tecnologías Utilizadas

- React con Next.js para el frontend
- TypeScript para tipado estático
- Tailwind CSS para estilos
- React Hooks para manejo de estado

## Próximos Pasos

- Integración con backend real para persistencia de datos
- Implementación de carga de imágenes para fotos de perfil
- Generación real de códigos QR
- Implementación de módulos adicionales (asistencias, pagos, etc.)

## Instalación y Ejecución

1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Ejecutar en modo desarrollo: `npm run dev`
4. Acceder a la aplicación en: `http://localhost:3002` 
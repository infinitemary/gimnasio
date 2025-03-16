# 🏋️‍♂️ Cosmos Gym - Sistema de Gestión

## 📝 Descripción
Este es un proyecto moderno para gestionar Cosmos Gym, un gimnasio de estilo Old School. Permite registrar diferentes tipos de miembros (clientes, entrenadores, administradores), controlar asistencias mediante un sistema de QR, gestionar rutinas de ejercicios, llevar un seguimiento del progreso de los usuarios y administrar pagos y promociones, utilizando tecnologías actuales tanto en el frontend como en el backend.

## 🎯 Objetivos del Proyecto
- Aprender desarrollo web moderno con React y TypeScript
- Crear una aplicación web completa con arquitectura frontend y backend
- Entender cómo manejar datos de usuarios con bases de datos
- Practicar el desarrollo de interfaces de usuario con componentes
- Implementar principios de diseño de software como SOLID
- Desarrollar un sistema de autenticación con diferentes métodos (QR, email, cédula)
- Crear una experiencia de usuario totalmente responsive y adaptable a cualquier dispositivo

## 🛠️ Tecnologías que Usaremos

### Frontend
- **Next.js**: Framework de React para renderizado del lado del servidor y generación de sitios estáticos
- **React**: Biblioteca para construir interfaces de usuario con componentes
- **TypeScript**: Superset de JavaScript que añade tipado estático
- **Tailwind CSS**: Framework CSS utility-first para diseño rápido y responsivo
- **TanStack Query**: Para gestión eficiente de estado del servidor y caché
- **Arquitectura de Vertical Slicing**: Organización del código por funcionalidades en lugar de por capas técnicas
- **QR Code Scanner**: Biblioteca para escanear códigos QR
- **Notificaciones Push**: Para alertas en tiempo real

### Backend
- **Nest.js**: Framework para construir aplicaciones del lado del servidor eficientes y escalables
- **TypeScript**: Para un backend con tipado fuerte
- **Prisma**: ORM para interactuar con la base de datos
- **PostgreSQL**: Base de datos relacional
- **JWT**: Para autenticación y autorización
- **Principios SOLID**: Para un diseño de software mantenible y escalable
- **Nodemailer**: Para envío de correos electrónicos
- **Twilio**: Para envío de mensajes WhatsApp

## 📂 Convenciones de Código y Estructura del Proyecto

### Nomenclatura de Archivos
Utilizamos kebab-case para todos los nombres de archivos, con sufijos que indican el tipo de archivo. Esto mejora la legibilidad y facilita la búsqueda de archivos específicos.

#### Ejemplos:

- **Componentes**: `nombre-componente.component.tsx`
  ```
  member-card.component.tsx
  member-list.component.tsx
  member-detail.component.tsx
  ```

- **Hooks**: `use-nombre-hook.hook.ts`
  ```
  use-members-data.hook.ts
  use-auth.hook.ts
  use-form.hook.ts
  ```

- **Servicios**: `nombre.service.ts`
  ```
  members.service.ts
  auth.service.ts
  payments.service.ts
  ```

- **Tipos**: `nombre.types.ts`
  ```
  member.types.ts
  auth.types.ts
  common.types.ts
  ```

- **Utilidades**: `nombre.util.ts`
  ```
  date.util.ts
  format.util.ts
  validation.util.ts
  ```

- **Contextos**: `nombre-context.context.tsx`
  ```
  auth-context.context.tsx
  theme-context.context.tsx
  ```

- **Constantes**: `nombre.constants.ts`
  ```
  api.constants.ts
  routes.constants.ts
  ```

### Estructura de Carpetas
Seguimos una arquitectura de Vertical Slicing, organizando el código por funcionalidades:

```
app/
├── components/           # Componentes compartidos
├── features/             # Funcionalidades principales
│   ├── members/          # Módulo de gestión de miembros
│   │   ├── components/   # Componentes específicos de miembros
│   │   ├── hooks/        # Hooks específicos de miembros
│   │   ├── services/     # Servicios para miembros
│   │   └── types/        # Tipos y interfaces de miembros
│   ├── auth/             # Módulo de autenticación
│   ├── payments/         # Módulo de pagos
│   └── ...
├── hooks/                # Hooks compartidos
├── lib/                  # Utilidades y configuraciones
├── pages/                # Páginas de Next.js
└── styles/               # Estilos globales
```

## 📁 Estructura Completa del Proyecto
```
gimnasio/
│
├── gimnasio_1/                # Aplicación principal
│   ├── app/                   # Aplicación Next.js
│   │   ├── features/          # Características organizadas por dominio (Vertical Slicing)
│   │   │   ├── gym/           # Dominio principal del gimnasio
│   │   │   │   ├── components/    # Componentes específicos del gimnasio
│   │   │   │   │   ├── member-card.component.tsx
│   │   │   │   │   ├── routine-list.component.tsx
│   │   │   │   │   ├── attendance-scanner.component.tsx
│   │   │   │   │   └── payment-reminder.component.tsx
│   │   │   │   │
│   │   │   │   ├── containers/    # Componentes contenedores (páginas)
│   │   │   │   │   ├── member-dashboard.container.tsx
│   │   │   │   │   ├── trainer-dashboard.container.tsx
│   │   │   │   │   └── admin-dashboard.container.tsx
│   │   │   │   │
│   │   │   │   ├── hooks/         # Custom hooks específicos
│   │   │   │   │   ├── use-member.hook.ts
│   │   │   │   │   ├── use-attendance.hook.ts
│   │   │   │   │   └── use-routine.hook.ts
│   │   │   │   │
│   │   │   │   ├── utils/         # Utilidades y helpers
│   │   │   │   │   ├── date-formatter.util.ts
│   │   │   │   │   ├── qr-generator.util.ts
│   │   │   │   │   └── workout-calculator.util.ts
│   │   │   │   │
│   │   │   │   ├── services/      # Servicios para comunicación con API
│   │   │   │   │   ├── member.service.ts
│   │   │   │   │   ├── attendance.service.ts
│   │   │   │   │   └── payment.service.ts
│   │   │   │   │
│   │   │   │   ├── types/         # Tipos y interfaces
│   │   │   │   │   ├── member.type.ts
│   │   │   │   │   ├── routine.type.ts
│   │   │   │   │   └── payment.type.ts
│   │   │   │   │
│   │   │   │   └── constants/     # Constantes y configuración
│   │   │   │       ├── routes.constant.ts
│   │   │   │       └── api-endpoints.constant.ts
│   │   │   │
│   │   │   ├── members/           # Feature de gestión de miembros (completa)
│   │   │   │   ├── components/    # Componentes UI específicos de miembros
│   │   │   │   ├── containers/    # Páginas y contenedores
│   │   │   │   ├── hooks/         # Hooks específicos de miembros
│   │   │   │   ├── services/      # Servicios de comunicación con API
│   │   │   │   ├── types/         # Tipos e interfaces
│   │   │   │   └── utils/         # Utilidades específicas
│   │   │   │
│   │   │   ├── routines/          # Feature de rutinas de entrenamiento
│   │   │   ├── attendance/        # Feature de control de asistencia
│   │   │   ├── payments/          # Feature de pagos y suscripciones
│   │   │   ├── promotions/        # Feature de promociones
│   │   │   ├── events/            # Feature de eventos especiales
│   │   │   └── admin/             # Feature de administración
│   │   │
│   │   ├── auth/              # Feature de autenticación
│   │   ├── shared/            # Componentes y utilidades compartidas
│   │   └── pages/             # Páginas de Next.js (App Router)
│   │
│   ├── public/                # Archivos estáticos
│   ├── styles/                # Estilos globales
│   ├── next.config.js         # Configuración de Next.js
│   ├── tailwind.config.js     # Configuración de Tailwind CSS
│   ├── tsconfig.json          # Configuración de TypeScript
│   └── package.json           # Dependencias y scripts
│
├── backend/                   # Aplicación Nest.js
│   ├── src/
│   │   ├── modules/           # Módulos organizados por funcionalidad
│   │   ├── common/            # Código compartido
│   │   ├── config/            # Configuración de la aplicación
│   │   ├── infrastructure/    # Capa de infraestructura
│   │   └── main.ts            # Punto de entrada
│   │
│   ├── prisma/                # Esquema y migraciones de Prisma
│   ├── test/                  # Pruebas
│   ├── nest-cli.json          # Configuración de Nest.js
│   ├── tsconfig.json          # Configuración de TypeScript
│   └── package.json           # Dependencias y scripts
│
└── docs/                      # Documentación adicional
```

## 🚀 Instalación y Ejecución

### Requisitos Previos

- Node.js (v14 o superior)
- npm (v6 o superior)
- PostgreSQL (v12 o superior)

### Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/tu-usuario/cosmos-gym.git
   cd cosmos-gym
   ```

2. Instala las dependencias del frontend:
   ```
   cd gimnasio_1
   npm install
   ```

3. Instala las dependencias del backend:
   ```
   cd ../backend
   npm install
   ```

4. Configura la base de datos:
   - Crea una base de datos PostgreSQL llamada `cosmos_gym`
   - Configura las variables de entorno en el archivo `.env` del backend

5. Ejecuta las migraciones de la base de datos:
   ```
   cd backend
   npx prisma migrate dev
   ```

### Ejecución en Desarrollo

Para ejecutar la aplicación en modo desarrollo:

1. Frontend (Next.js):
   ```
   cd gimnasio_1
   npm run dev
   ```
   La aplicación estará disponible en http://localhost:3000

2. Backend (NestJS):
   ```
   cd backend
   npm run start:dev
   ```
   La API estará disponible en http://localhost:3001

### Ejecución en Producción

Para ejecutar la aplicación en modo producción:

1. Construye el frontend:
   ```
   cd gimnasio_1
   npm run build
   npm run start
   ```

2. Construye el backend:
   ```
   cd backend
   npm run build
   npm run start:prod
   ```

### Usuarios de Prueba

Para probar la aplicación, puedes usar los siguientes usuarios:

- **Administrador**: admin@cosmosgym.com / password
- **Entrenador**: trainer@cosmosgym.com / password
- **Cliente**: client@cosmosgym.com / password

## 📋 Funcionalidades Principales

### 1. Gestión de Miembros
- **Tipos de Miembros**:
  - **Clientes**: Usuarios que asisten al gimnasio para entrenar
  - **Entrenadores**: Personal que guía a los clientes
  - **Administradores**: Gestores del sistema y del gimnasio

- **Registro y Autenticación**:
  - Clientes: Login mediante escaneo de código QR en carnet
  - Entrenadores: Login con correo electrónico y contraseña
  - Administradores: Login con credenciales seguras
  - Entrenadores pueden registrar clientes usando su número de cédula (8-10 dígitos)

### 2. Sistema de Asistencia
- Registro automático al escanear QR
- Historial de asistencias
- Estadísticas de asistencia
- Notificaciones de última actividad semanal al ingresar

### 3. Gestión de Pagos
- Sistema de recordatorios de pagos próximos
- Notificaciones automáticas cuando se acerca la fecha de pago
- Historial de pagos realizados
- Gestión de planes y tarifas
- Promociones especiales:
  - Promociones de mensualidad por inauguración
  - Planes trimestrales (3 meses de entrenamiento)
  - Planes anuales (1 año de entrenamiento)
  - Precios promocionales en cualquier época del año para captar nuevos clientes

### 4. Gestión de Rutinas
- Biblioteca de rutinas prediseñadas
- Creación de rutinas personalizadas por clientes
- Asignación de rutinas por entrenadores
- Seguimiento de progreso en cada rutina

### 5. Interacción Cliente-Entrenador
- Selección de entrenadores disponibles en tiempo real
- Solicitud de asesoramiento
- Comunicación directa cliente-entrenador
- Valoraciones y feedback

### 6. Seguimiento de Progreso
- Registro de medidas corporales
- Gráficos de evolución
- Logros y metas
- Comparativas de rendimiento

### 7. Marketing y Promociones
- Envío de promociones por correo electrónico
- Notificaciones por WhatsApp
- Creación y gestión de grupos de entrenamiento
- Campañas personalizadas según perfil del cliente

### 8. Información del Gimnasio
- **Nombre**: Cosmos Gym
- **Estilo**: Old School
- **Colores emblemáticos**: Azul rey y negro
- **Horarios**:
  - Lunes a viernes: 6:30 am a 8:00 pm
  - Sábados y feriados: 7:00 am a 1:00 pm
- **Ubicación**: C.C. Cosmos, Piso 4 / Local 4A-20
- **Contacto**: (+58) 412 2731575
- **Redes sociales**: 
  - Instagram: [@cosmosgymbqto](https://www.instagram.com/cosmosgymbqto?igsh=MXQxbjF1MnBoamltNQ==)

### 9. Experiencia Multiplataforma
- Acceso desde cualquier dispositivo: computadoras de escritorio, portátiles, tablets y smartphones
- Interfaz adaptable a diferentes tamaños de pantalla
- Experiencia de usuario optimizada según el dispositivo
- Funcionalidades completas independientemente del dispositivo utilizado

### 10. Panel de Administración
- **Gestión de Promociones**
- **Gestión de Miembros**
- **Gestión de Estilos de Entrenamiento**
- **Reportes y Analíticas**

### 11. Gestión de Eventos Especiales y Clases Grupales
- **Creación y Programación de Eventos**
- **Inscripción y Reservas**
- **Promoción de Eventos**
- **Seguimiento y Evaluación**

## 🔍 Módulos Implementados

### Módulo de Gestión de Miembros

Este módulo permite administrar toda la información relacionada con los miembros del gimnasio y es el primero en ser implementado completamente. Incluye las siguientes características:

#### Estructura del Módulo
```
/features/members/
  /components/         # Componentes de UI específicos para miembros
    member-card.component.tsx     # Tarjeta para mostrar información resumida de un miembro
    member-detail.component.tsx   # Vista detallada de un miembro
    member-form.component.tsx     # Formulario para crear/editar miembros
    member-list.component.tsx     # Lista de miembros con filtros y búsqueda
  /hooks/              # Hooks personalizados para la gestión de miembros
    use-members-data.hook.ts  # Hook para manejar datos de miembros (filtrado, paginación, etc.)
  /services/           # Servicios para interactuar con la API
    members.service.ts # Servicio para operaciones CRUD de miembros
  /types/              # Definiciones de tipos
    member.types.ts    # Interfaces y tipos relacionados con miembros
```

#### Páginas Implementadas
- `/dashboard/members`: Lista de todos los miembros con opciones de filtrado y búsqueda
- `/dashboard/members/[id]`: Detalles de un miembro específico
- `/dashboard/members/create`: Formulario para crear un nuevo miembro
- `/dashboard/members/edit/[id]`: Formulario para editar un miembro existente

#### Características Específicas

##### Listado de Miembros
- Visualización en formato de tarjetas
- Filtrado por rol, estado y plan de membresía
- Búsqueda por nombre, cédula, email o teléfono
- Paginación para manejar grandes cantidades de miembros

##### Detalles de Miembro
- Información personal completa
- Información de contacto
- Detalles de membresía
- Código QR para control de acceso
- Opciones para editar o eliminar el miembro

##### Formulario de Miembro
- Validación de campos requeridos
- Manejo de información de contacto de emergencia
- Selección de plan de membresía
- Soporte para modo de creación y edición

#### Estado Actual y Próximos Pasos
- ✅ Interfaz de usuario completa
- ✅ Gestión de estado local
- ✅ Validación de formularios
- ⏳ Integración con backend real para persistencia de datos
- ⏳ Implementación de carga de imágenes para fotos de perfil
- ⏳ Generación real de códigos QR

## 💡 Consideraciones Técnicas de Implementación

### Sistema de Autenticación y Usuarios
- **Generación de Códigos QR**
- **Seguridad en la Autenticación**
- **Gestión de Roles y Permisos**

### Sistema de QR y Control de Asistencia
- **Lectura de QR en Tiempo Real**
- **Registro de Asistencia**
- **Análisis de Patrones de Asistencia**

### Sistema de Notificaciones
- **Notificaciones en Tiempo Real**
- **Notificaciones Push**
- **Correo Electrónico y WhatsApp**

### Gestión de Rutinas y Ejercicios
- **Biblioteca de Ejercicios**
- **Creación de Rutinas**
- **Seguimiento de Progreso**

### Interacción Cliente-Entrenador
- **Sistema de Presencia**
- **Comunicación Directa**

### Sistema de Pagos
- **Gestión de Suscripciones**
- **Recordatorios de Pago**

### Marketing y Promociones
- **Segmentación de Usuarios**
- **Automatización de Marketing**
- **Gestión de Promociones Especiales**

### Diseño e Identidad Visual
- **Implementación de Colores Corporativos**
- **Estilo Old School**

### Diseño Responsive y Multiplataforma
- **Estrategia Mobile-First con Tailwind**
- **Optimización de Componentes con Tailwind**
- **Consideraciones de Usabilidad**
- **Testing Multiplataforma**

### Arquitectura y Escalabilidad
- **Vertical Slicing**
- **Principios SOLID**
- **Escalabilidad**

## 🧠 Conceptos de Programación que Aprenderás
- Desarrollo basado en componentes con React
- Tipado estático con TypeScript
- Arquitectura de aplicaciones con vertical slicing
- Principios SOLID en el desarrollo de software
- Gestión de estado del cliente y servidor
- Desarrollo API RESTful con Nest.js
- Modelado de datos y relaciones
- Autenticación y autorización con diferentes métodos
- Integración de servicios externos (email, WhatsApp)
- Generación y lectura de códigos QR
- Sistema de notificaciones en tiempo real
- Diseño responsive y desarrollo multiplataforma
- Despliegue de aplicaciones full-stack

## 📚 Recursos para Aprender

### Frontend
- [Documentación oficial de Next.js](https://nextjs.org/docs)
- [Documentación de React](https://react.dev/)
- [Documentación de TypeScript](https://www.typescriptlang.org/docs/)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [TanStack Query (React Query)](https://tanstack.com/query/latest)
- [React QR Reader](https://www.npmjs.com/package/react-qr-reader)

### Backend
- [Documentación oficial de Nest.js](https://docs.nestjs.com/)
- [Documentación de Prisma](https://www.prisma.io/docs/)
- [Principios SOLID explicados](https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design)
- [Nodemailer](https://nodemailer.com/)
- [API de Twilio para WhatsApp](https://www.twilio.com/docs/whatsapp/api)

### Plataformas de Aprendizaje
- [freeCodeCamp](https://www.freecodecamp.org/)
- [Codecademy](https://www.codecademy.com/)
- [Udemy](https://www.udemy.com/)
- [Egghead.io](https://egghead.io/)

## 🤝 Contribuir
¡Este es un proyecto de aprendizaje! Si tienes ideas para mejorarlo, no dudes en:
1. Hacer un fork del repositorio
2. Crear una nueva rama (`git checkout -b mi-nueva-funcionalidad`)
3. Hacer commit de tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Hacer push a la rama (`git push origin mi-nueva-funcionalidad`)
5. Abrir un Pull Request

## 📝 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles. 
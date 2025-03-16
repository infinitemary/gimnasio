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
- **Gestión de Promociones**:
  - Interfaz para crear, editar y eliminar promociones
  - Configuración de fechas de inicio y fin para promociones temporales
  - Establecimiento de descuentos y condiciones especiales
  - Vista previa de cómo se mostrará la promoción a los clientes

- **Gestión de Miembros**:
  - Registro completo de nuevos miembros con toda su información personal
  - Generación automática de códigos QR únicos para cada miembro
  - Capacidad de regenerar códigos QR en caso de extravío o deterioro
  - Historial de modificaciones en perfiles de miembros

- **Gestión de Estilos de Entrenamiento**:
  - Creación de nuevos estilos de entrenamiento con campos detallados:
    - Nombre del estilo de entrenamiento
    - Objetivo principal (hipertrofia, fuerza, resistencia, etc.)
    - Ejercicios típicos recomendados
    - Rango de repeticiones sugerido
    - Tiempo de descanso entre series
    - Enfoque principal y descripción detallada
  - Edición y actualización de estilos existentes
  - Asignación de estilos a rutinas predefinidas
  - Biblioteca de referencia para entrenadores y clientes

- **Reportes y Analíticas**:
  - Dashboard con métricas clave del negocio
  - Informes de asistencia y retención de clientes
  - Análisis de efectividad de promociones
  - Estadísticas de uso de diferentes estilos de entrenamiento

### 11. Gestión de Eventos Especiales y Clases Grupales
- **Creación y Programación de Eventos**:
  - Configuración de clases especiales (salsa casino, zumba, yoga, etc.)
  - Establecimiento de fechas, horarios y duración de los eventos
  - Asignación de instructores especializados
  - Definición de capacidad máxima de participantes

- **Inscripción y Reservas**:
  - Sistema de registro para miembros interesados
  - Gestión de listas de espera cuando se alcanza el límite de capacidad
  - Recordatorios automáticos para los participantes
  - Posibilidad de cancelar inscripción con antelación

- **Promoción de Eventos**:
  - Publicación automática en el feed de la aplicación
  - Notificaciones push a miembros con intereses relacionados
  - Envío de invitaciones por correo electrónico y WhatsApp
  - Compartir eventos en redes sociales del gimnasio

- **Seguimiento y Evaluación**:
  - Registro de asistencia a eventos especiales
  - Sistema de feedback post-evento
  - Análisis de popularidad de diferentes tipos de clases
  - Recomendaciones para futuros eventos basadas en datos históricos

## 💡 Consideraciones Técnicas de Implementación

### Sistema de Autenticación y Usuarios
- **Generación de Códigos QR**:
  - Implementar un algoritmo para generar códigos QR únicos para cada usuario
  - Incluir información encriptada en el QR (ID de usuario, timestamp, firma digital)
  - Renovación periódica de códigos para evitar duplicaciones
  - Considerar el uso de bibliotecas como `qrcode` para Node.js

- **Seguridad en la Autenticación**:
  - Implementar JWT con tiempos de expiración cortos para sesiones
  - Utilizar refresh tokens para mantener la sesión activa
  - Almacenar contraseñas con hash y salt usando bcrypt
  - Implementar autenticación de dos factores para administradores

- **Gestión de Roles y Permisos**:
  - Diseñar un sistema de control de acceso basado en roles (RBAC)
  - Implementar middleware de autorización en rutas protegidas
  - Separar claramente las capacidades de cada tipo de usuario
  - Considerar el uso de Casl o AccessControl para gestionar permisos

### Sistema de QR y Control de Asistencia
- **Lectura de QR en Tiempo Real**:
  - Utilizar la API de MediaDevices para acceder a la cámara
  - Implementar la biblioteca `react-qr-reader` para escaneo en el frontend
  - Considerar alternativas como `@zxing/library` para decodificación de QR
  - Manejar errores de permisos de cámara y dispositivos no compatibles

- **Registro de Asistencia**:
  - Implementar un sistema de timestamps precisos
  - Diseñar una estructura de base de datos optimizada para consultas frecuentes
  - Implementar un sistema de caché para mejorar el rendimiento

- **Análisis de Patrones de Asistencia**:
  - Utilizar bibliotecas como `date-fns` para manipulación de fechas
  - Implementar algoritmos para detectar patrones de asistencia
  - Considerar el uso de herramientas de análisis de datos como `d3.js`
  - Diseñar un sistema de alertas para identificar cambios en patrones

### Sistema de Notificaciones
- **Notificaciones en Tiempo Real**:
  - Implementar WebSockets con Socket.io para comunicación bidireccional
  - Considerar el uso de Server-Sent Events para notificaciones unidireccionales
  - Diseñar un sistema de colas para gestionar notificaciones masivas
  - Implementar un mecanismo de retry para notificaciones fallidas

- **Notificaciones Push**:
  - Utilizar el Web Push API para navegadores compatibles
  - Implementar Service Workers para recibir notificaciones en segundo plano
  - Considerar Firebase Cloud Messaging como alternativa multiplataforma
  - Gestionar permisos de notificaciones y preferencias de usuario

- **Correo Electrónico y WhatsApp**:
  - Implementar Nodemailer con plantillas HTML responsivas
  - Utilizar la API de Twilio para mensajes de WhatsApp
  - Diseñar un sistema de plantillas reutilizables para diferentes tipos de mensajes
  - Implementar un sistema de seguimiento de entregas y aperturas

### Gestión de Rutinas y Ejercicios
- **Biblioteca de Ejercicios**:
  - Crear una base de datos de ejercicios con descripciones, imágenes y videos
  - Implementar categorización por grupos musculares, equipamiento y nivel
  - Considerar el uso de CDN para almacenamiento y entrega de medios
  - Diseñar un sistema de búsqueda y filtrado eficiente

- **Creación de Rutinas**:
  - Implementar un constructor de rutinas con interfaz drag-and-drop
  - Utilizar bibliotecas como React DnD o react-beautiful-dnd
  - Diseñar un sistema para validar la efectividad y balance de las rutinas
  - Implementar algoritmos para sugerir ejercicios complementarios

- **Seguimiento de Progreso**:
  - Diseñar un esquema de base de datos para almacenar métricas de progreso
  - Implementar gráficos interactivos con bibliotecas como Chart.js o Recharts
  - Considerar el uso de algoritmos para detectar plateaus y sugerir cambios
  - Implementar gamificación para motivar la consistencia

### Interacción Cliente-Entrenador
- **Sistema de Presencia**:
  - Implementar un sistema de estados de disponibilidad para entrenadores
  - Utilizar WebSockets para actualizar la disponibilidad en tiempo real
  - Considerar el uso de geolocalización para verificar presencia física
  - Diseñar un sistema de reservas para sesiones con entrenadores

- **Comunicación Directa**:
  - Implementar un sistema de chat en tiempo real con Socket.io
  - Considerar el almacenamiento de mensajes para historial
  - Diseñar un sistema de notificaciones para mensajes nuevos
  - Implementar funcionalidades para compartir rutinas y ejercicios

### Sistema de Pagos
- **Gestión de Suscripciones**:
  - Integrar con proveedores de pago como Stripe o PayPal
  - Implementar webhooks para procesar eventos de pago
  - Diseñar un sistema para manejar diferentes planes y ciclos de facturación
  - Considerar aspectos legales y fiscales para Venezuela

- **Recordatorios de Pago**:
  - Implementar un sistema de programación de tareas (cron jobs)
  - Diseñar una lógica para enviar recordatorios escalonados
  - Considerar diferentes canales de comunicación según urgencia
  - Implementar un dashboard para administradores con alertas de morosidad

### Marketing y Promociones
- **Segmentación de Usuarios**:
  - Diseñar un sistema de etiquetas y categorías para usuarios
  - Implementar algoritmos para identificar patrones de comportamiento
  - Considerar el uso de análisis de datos para personalización
  - Diseñar campañas específicas basadas en objetivos y asistencia

- **Automatización de Marketing**:
  - Implementar un sistema de flujos de trabajo para campañas
  - Utilizar cron jobs para programar envíos automáticos
  - Diseñar un sistema de A/B testing para optimizar campañas
  - Implementar análisis de efectividad con métricas de conversión

- **Gestión de Promociones Especiales**:
  - Desarrollar un sistema flexible para crear y modificar promociones en cualquier momento
  - Implementar un calendario de promociones estacionales y especiales
  - Diseñar un sistema de descuentos para planes trimestrales y anuales
  - Crear mecanismos para medir la efectividad de cada promoción

### Diseño e Identidad Visual
- **Implementación de Colores Corporativos**:
  - Utilizar azul rey y negro como colores principales en toda la interfaz
  - Crear un sistema de diseño coherente basado en estos colores
  - Implementar variaciones de estos colores para diferentes estados y componentes
  - Considerar la accesibilidad al implementar este esquema de colores

- **Estilo Old School**:
  - Reflejar la estética Old School en elementos visuales
  - Utilizar tipografías y elementos gráficos que evoquen este estilo
  - Implementar una galería de imágenes que muestre el ambiente del gimnasio
  - Crear iconos personalizados que reflejen este enfoque de entrenamiento

### Diseño Responsive y Multiplataforma
- **Estrategia Mobile-First con Tailwind**:
  - Desarrollar primero para dispositivos móviles y luego escalar a pantallas más grandes
  - Utilizar las clases responsive de Tailwind CSS (sm:, md:, lg:, xl:, 2xl:)
  - Implementar media queries estratégicas para puntos de quiebre específicos
  - Probar en múltiples dispositivos y tamaños de pantalla

- **Optimización de Componentes con Tailwind**:
  - Diseñar componentes que se adapten fluidamente a diferentes tamaños usando clases flex y grid de Tailwind
  - Implementar layouts flexibles utilizando las utilidades de Flexbox y Grid de Tailwind
  - Crear versiones alternativas de componentes complejos para pantallas pequeñas
  - Utilizar imágenes y recursos optimizados para cada tipo de dispositivo

- **Consideraciones de Usabilidad**:
  - Asegurar que todos los elementos interactivos sean accesibles en pantallas táctiles
  - Implementar gestos táctiles para mejorar la experiencia en dispositivos móviles
  - Adaptar menús y navegación según el tamaño de pantalla
  - Considerar limitaciones de ancho de banda en dispositivos móviles

- **Testing Multiplataforma**:
  - Implementar pruebas automatizadas para diferentes tamaños de pantalla
  - Utilizar herramientas como Playwright o Cypress para testing cross-browser
  - Crear un conjunto de dispositivos de prueba que representen el espectro de usuarios
  - Implementar analytics para identificar problemas en dispositivos específicos

### Arquitectura y Escalabilidad
- **Vertical Slicing**:
  - Organizar el código por funcionalidades completas en lugar de capas técnicas
  - Implementar límites de contexto claros entre diferentes dominios
  - Considerar el uso de monorepo con herramientas como Nx o Turborepo
  - Diseñar interfaces claras entre diferentes slices

- **Principios SOLID**:
  - Aplicar Single Responsibility Principle en todos los componentes y servicios
  - Implementar Open/Closed Principle para facilitar extensiones
  - Utilizar Dependency Inversion para desacoplar módulos
  - Considerar el uso de inyección de dependencias en NestJS

- **Escalabilidad**:
  - Diseñar la arquitectura para soportar múltiples instancias
  - Implementar estrategias de caché en diferentes niveles
  - Considerar el uso de bases de datos con sharding para grandes volúmenes
  - Diseñar un sistema de logs centralizado para monitoreo

### Sistema de Administración
- **Gestión de Promociones**:
  - Implementar un CRUD completo para promociones con validaciones
  - Diseñar un modelo de datos flexible para diferentes tipos de promociones
  - Crear un sistema de previsualización en tiempo real
  - Implementar lógica para evitar conflictos entre promociones simultáneas

- **Generación y Gestión de Códigos QR**:
  - Desarrollar algoritmo para generar códigos QR únicos basados en información del usuario
  - Implementar encriptación para proteger la información contenida en el QR
  - Crear un sistema de regeneración que invalide códigos anteriores
  - Diseñar un proceso de impresión de carnets con códigos QR

- **Sistema de Estilos de Entrenamiento**:
  - Diseñar un esquema de base de datos para almacenar todos los campos requeridos
  - Implementar un editor rico para la descripción del enfoque principal
  - Crear un sistema de categorización y etiquetado para facilitar la búsqueda
  - Desarrollar una API para consumir esta información desde diferentes partes de la aplicación

### Gestión de Eventos Especiales
- **Modelado de Datos para Eventos**:
  - Diseñar un esquema flexible para diferentes tipos de eventos y clases
  - Implementar relaciones entre eventos, instructores y participantes
  - Considerar campos para requisitos especiales (equipamiento, espacio, etc.)
  - Crear un sistema de categorización de eventos

- **Sistema de Reservas**:
  - Implementar un algoritmo de gestión de capacidad y listas de espera
  - Desarrollar lógica para evitar conflictos de horarios
  - Crear un sistema de confirmaciones y recordatorios automáticos
  - Diseñar un proceso para manejar cancelaciones y reasignaciones

- **Interfaz de Usuario para Eventos**:
  - Desarrollar un calendario interactivo para visualizar eventos programados
  - Implementar filtros para diferentes tipos de clases y actividades
  - Crear tarjetas de evento con toda la información relevante
  - Diseñar un flujo de inscripción intuitivo y rápido

- **Análisis de Datos de Eventos**:
  - Implementar métricas para evaluar el éxito de diferentes tipos de eventos
  - Crear dashboards específicos para análisis de participación
  - Desarrollar algoritmos para recomendar eventos basados en preferencias de usuarios
  - Diseñar reportes para la toma de decisiones sobre futuros eventos

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
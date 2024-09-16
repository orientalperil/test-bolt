# BoltGroup

Este proyecto tiene como objetivo cubrir la prueba técnica de full stack.

## Tecnologías Utilizadas

- Gestión de paquetes: `pnpm`
- Frontend: `Next JS`, `Tailwind CSS`
- Backend: `Prisma`, `Postgres`

## Configuración

### Instalación de Dependencias

Para instalar el gestor de paquetes a utilizar en este proyecto:

```
https://pnpm.io/installation
```
Para instalar las dependencias del proyecto, ejecuta:

```
$ pnpm install
```

### Ejecutar la Aplicación en Modo Desarrollo

Para correr la aplicación en modo desarrollo, utiliza:

```
$ pnpm dev
```

### Configuración de Postgres

Para configurar Postgres, sigue las instrucciones en [Neon Tech](https://neon.tech/). La versión gratuita es suficiente para el despliegue del proyecto.

### Diseño

El diseño se basa en los esquemas proporcionados en Figma. Puedes encontrar los diseños en este enlace: [Prueba - BoltGroup](https://www.figma.com/file/aEwwRtbRTvxM3XOTkzjPp0/Prueba---CondorSoft?type=design&node-id=0%3A1&mode=design&t=foVYWASJ0CruJwTT-1). **Nota Importante:** Este diseño es informativo para seguir los diseños y colores principales. No tiene que ser exacto al 100%, pero la idea debe ser similar.

### Despliegue

Una vez finalizado el proyecto, debe ser desplegado utilizando los servicios de [Vercel](https://vercel.com/).

## Estructura del Proyecto

### Modificación del Esquema Prisma

Deberás modificar el archivo `schema.prisma` para agregar tu propia definición de modelo basada en la problemática dada en este ejercicio.

### Ejemplo de Conexión Frontend-Backend

Un ejemplo de la conexión entre el frontend y el backend se encuentra dentro de `pages/api/pokemon.ts`. Este manejador se utiliza en `index.tsx` en la línea: `const result = await fetch("/api/pokemon");`

### Libertad para Agregar Librerías

Puedes agregar cualquier librería extra para gestionar la funcionalidad de la aplicación, por ejemplo, `react-query` para gestionar solicitudes o `react-hook-form` para manejar el estado de los formularios. Tienes la libertad de configurar tus propias definiciones.

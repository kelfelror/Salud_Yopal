# Salud Yopal - CSYOP

Sistema web para la gestión de citas médicas en Yopal, Colombia.

## Descripción

Salud Yopal es una aplicación web desarrollada para permitir a los usuarios gestionar sus citas médicas de manera sencilla.

El sistema permite:

- Crear una cuenta de usuario.
- Iniciar sesión.
- Solicitar citas médicas.
- Consultar las citas propias.
- Modificar citas.
- Cancelar citas.
- Cerrar sesión.

El proyecto está desarrollado utilizando una arquitectura monolítica, donde el frontend, la lógica de negocio, la API y la persistencia forman parte de una única aplicación Spring Boot.

## Tecnologías utilizadas

### Backend

- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven
- API REST

### Frontend

- HTML5
- CSS3
- JavaScript

### Base de datos

- PostgreSQL

### Herramientas

- Visual Studio Code
- PostgreSQL / pgAdmin
- Postman
- Git
- GitHub

## Arquitectura

El sistema utiliza una arquitectura monolítica organizada en diferentes capas:

```text
Usuario
   │
   ▼
Frontend HTML / CSS / JavaScript
   │
   │ HTTP / REST
   ▼
Spring Boot
   │
   ├── Controller
   ├── Service
   ├── Repository
   └── Model
   │
   ▼
PostgreSQL

Todos los componentes se ejecutan como parte de una única aplicación Spring Boot.
Estructura del proyecto
src/
└── main/
    ├── java/
    │   └── saludyopal/
    │       └── salud/
    │           └── yopal/
    │               ├── controller/
    │               ├── model/
    │               ├── repository/
    │               ├── service/
    │               └── Application.java
    │
    └── resources/
        ├── static/
        │   ├── index.html
        │   ├── login.html
        │   ├── registro.html
        │   ├── solicitar-cita.html
        │   ├── mis-citas.html
        │   ├── css/
        │   │   └── style.css
        │   └── js/
        │       └── app.js
        │
        └── application.properties

Funcionalidades
Registro

Los usuarios pueden crear una cuenta proporcionando sus datos personales y credenciales de acceso.

Inicio de sesión

Los usuarios pueden iniciar sesión mediante su correo electrónico y contraseña.

Solicitud de citas

El usuario puede seleccionar:

EPS
Especialidad
Médico
Fecha
Hora
Estado

La cita queda asociada automáticamente al usuario que inició sesión.

Mis citas

Cada usuario puede consultar únicamente las citas asociadas a su cuenta.

Modificación

El usuario puede modificar los datos de una cita propia, incluyendo fecha y hora.

Cancelación

El usuario puede cancelar una cita propia.

Base de datos

El proyecto utiliza PostgreSQL.

Crear una base de datos llamada: salud_yopal
La estructura de las tablas es generada y actualizada mediante JPA/Hibernate.

Las entidades principales son:
Usuario
   │
   │ 1:N
   ▼
Cita
Un usuario puede tener múltiples citas y cada cita pertenece a un único usuario.

Configuración

La conexión con PostgreSQL se encuentra en: src/main/resources/application.properties
Ejemplo:
spring.datasource.url=jdbc:postgresql://localhost:5432/salud_yopal
spring.datasource.username=postgres
spring.datasource.password=TU_CONTRASEÑA
spring.jpa.hibernate.ddl-auto=update
server.port=8080

La contraseña debe corresponder a la instalación local de PostgreSQL.

Requisitos

Para ejecutar el proyecto se necesita tener instalado:

Java JDK
Maven
PostgreSQL
Git
Ejecución del proyecto
1. Crear la base de datos

Desde PostgreSQL o pgAdmin crear:
CREATE DATABASE salud_yopal;

2. Configurar PostgreSQL

Verificar que application.properties tenga los datos correspondientes a la instalación local de PostgreSQL.

3. Ejecutar el proyecto

Desde la carpeta raíz del proyecto ejecutar: mvn spring-boot:run

4. Abrir la aplicación

En el navegador ingresar: http://localhost:8080

API REST
Usuarios

Registro: POST /api/usuarios/registro
Inicio de sesión: POST /api/usuarios/login
Citas

Crear: POST /api/citas?usuarioId={usuarioId}
Consultar todas: GET /api/citas
Consultar citas de un usuario: GET /api/citas/usuario/{usuarioId}
Consultar una cita: GET /api/citas/{id}
Modificar: PUT /api/citas/{id}?usuarioId={usuarioId}
Cancelar: DELETE /api/citas/{id}?usuarioId={usuarioId}

Estado del proyecto

Proyecto funcional en entorno local.

El alcance de esta versión corresponde a la gestión de citas médicas. No incluye:

Historias clínicas.
Diagnósticos.
Medicamentos.
Facturación.
Pagos.
Despliegue en Render.
Autor

Proyecto académico - Salud Yopal / CSYOP
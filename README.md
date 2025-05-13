# Proyecto3

## Autores:
Pablo Méndez, Karen Pineda

##
Este proyecto simula un sistema de administración de campañas de donaciones o voluntariados. La aplicación permite la generacion dinámica de reportes de donaciones y voluntariados extraidos en una base de datos, construida con Node.js, Express, PostgreSQL y una arquitectura fullstack JavaScript

## Características principales
**Frontend**
- Interfaz interactiva hecha con React
- Filtros dinámicos para generar reportes
- Uso de SWC para compilación rápida
- UI responsiva para enfoque minimalista

**Backend**
- Generación de reportes filtrados desde PostgreSQL
- Controladores modulares
- Respuestas JSON listas para consumir
- Validación de parámetros

## Requisitos Previos
Para ejecutar el programa, asegúrate de tener instalado en tu sistema:

| Tecnología    | Versión recomendada | Descripción                                                                            |
|---------------|---------------------|----------------------------------------------------------------------------------------|
| Node.js       | v18.x o superior    | Entorno de ejecución JavaScript. [Descargar Node.js](https://nodejs.org/)              |
| npm           | v9.x o superior     | Gestor de paquetes (viene con Node.js).                                                |
| PostgreSQL    | v16.x o superior    | Base de datos SQL. [Instalar PostgreSQL](https://www.postgresql.org/download/windows/) |
| Git           | Opcional            | Para clonar el repositorio. [Instalar Git](https://git-scm.com/downloads)              | 

## Tecnologías Utilizadas

| Área          | Tecnologías                        |
|---------------|------------------------------------|
| Frontend      | React, JavaScript, SWC, Fetch API  |
| Backend       | Node.js, Express, PostgreSQL, pq   |
| Otros         | dotenv, nodemoon, CORS, body-parser|

###  Verifica las versiones instaladas:
```bash
node -v
npm -v
postgres --version
```

### Configuración del Entorno
Variables de entorno:
Crea un archivo `.env` en la raíz del proyecto con:

```bash 
PORT=3000
DB_HOST=localhost
DB_USER=postgres (o tu usuario)
DB_PASSWORD= (tu contraseña)
DB_NAME=voluntariado
DB_PORT=5432

DATABASE_URL=postgres://postgres:tucontraseña@localhost:5432/voluntariado
```
- Cambia los campos con tu usuario y contraseña real

- El `PORT` puede cambiarse según necesidad.
## Instalación y ejecución

1. Clona este repositorio
``` bash
https://github.com/Paul-1511/Proyecto3
cd Proyecto3
```
2. Configura el Backend
``` bash
cd backend-donaciones
npm install
npm install express pdfkit body-parser cors
```
### Modo Desarrollo (con reinicio automático)
``` bash
npm run dev
```
Usa `nodemon` para detectar cambios en tiempo real

### Modo Producción
``` bash
npm start
```
3. Configura el Frontend
   
Desde otro símbolo de sistema ejecuta estos comandos
``` bash
cd front-donaciones
npm install
npm install react-router-dom antd axios
npm run dev
```


## Instrucciones de uso

1.  Selecciona si quieres ver donaciones o voluntarios
2.  Si seleccionas donaciones ve las fechas desde antes de 2023 (en la base de datos se usaron datos del año 2023)
3.  Si seleccionas voluntarios por campaña u horas de cambio selecciona el tipo de campaña voluntariado o donaciones


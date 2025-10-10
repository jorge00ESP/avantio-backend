
# Daily-Trends 🗞️
## Proyecto de Scraper con Arquitectura Hexagonal

### 📄 Breve Descripción del Proyecto

Este proyecto es un servicio de backend diseñado para raspar y persistir datos (artículos/noticias) de la pagina web de [ElPais](https://elpais.com). Está construido siguiendo los principios de la Arquitectura Hexagonal (Puertos y Adaptadores) para garantizar una clara separación de las responsabilidades, la independencia del dominio respecto a la infraestructura y una alta capacidad de prueba.

Su función principal es orquestar los procesos de raspado, limpieza, validación y almacenamiento de datos en una base de datos MongoDB.

### 🏗️ Diagrama de Arquitectura y Capas

El proyecto sigue el patrón de Arquitectura Hexagonal, donde el Dominio (Core) es independiente de la infraestructura (Express, Mongoose, Puppeteer).

![Diagrama de arquitectura y capas](./assets/image/diagrama%20arquitectura%20y%20capa.png)

Roles de las Capas:

    Core/Domain: Contiene las entidades y los Puertos. Es la capa de negocio, agnóstica a la tecnología.

    Core/Application: Contiene los Casos de Uso. Orquesta las llamadas entre puertos para satisfacer las peticiones de negocio.

    Infrastructure: Contiene los Adaptadores. Es la única capa que se comunica con las librerias externas del motor del framework.

### 📐 Modelado del Dominio

La entidad central del dominio es el Artículo. Esta interfaz define la estructura de datos que se mueve a través de las capas de Aplicación y Dominio, independientemente de cómo se almacene o se obtenga.

#### Articulo

| Propiedad | Tipo | Descripción |  
|---|---|---|
| id | string | Indentificador del dominio |
| title | string | Titulo del articulo |
| description | string | Breve descripción |
| body | string | El desarrollo de todos los hechos |
| url | string | Enlace directo a la pagina del articulo

### ⚙️ Tecnologías Utilizadas

| Categoría | Tecnología | Descripción |  
|---|---|---|
| Lenguaje | TypeScript | Lenguaje elegido para el proyecto. Ligera variante de Javascript.
| Arquitectura | Arquitectura Hexagonal | Diseño de desaclopamiento y alta capacidad de prueba.
| Motor | NodeJS | Entorno de ejecución del backend.
| Web Server | ExpressJS | Adaptador de entrada y manejo de las rutas API REST.
| Base de datos | MongoDB | Base de datos no relacional.
| ORM | Mongoose | Libreria para la comunicación y manipulación de datos para la base de datos.
| Scraping | Puppeter | Adaptador de salida para la recogida de información de la web externa.
| Configuración | dotoenv | Gestión de variables de entorno.

### 🚀 Instrucciones para Levantar el Entorno

Sigue estos pasos para poner el proyecto en funcionamiento.

Prerrequisitos:

1. NodeJSS
2. npm
3. Un servicio de MongoDB corriendo localmente o un URI de acceso a una base de datos remota.


#### Instalación de dependencias

Clona el repositorio e instala las dependencias:

    git clone https://github.com/jorge00ESP/Daily-Trends.git
    cd daily-trends
    npm install

#### Configuración de Variables de Entorno

Crea un archivo llamado .env en la raíz del proyecto y añade las siguientes variables, sustituyendo los valores de ejemplo:

    MONGO_URI=mongodb://user:pass@000.000.000.000:27017/avantio?authSource=admin
    PORT=3000

#### Endpoints de la API

| Método | Endpoint | Descripción |  
|---|---|---|
| GET | /api/article/elpais/fetch | Recoge las cinco primeras noticias de la web de [ElPais](https://elpais.com).
| GET | /api/article/ | Recoge las noticias almacenadas en la base de datos.
| GET | /api/article/:id | Recoge el articulo buscado por identificador.
| GET | /api/article/url?url | Recoge el articulo buscado por el link de la web.
| DELETE| /api/article/ | Borra todos los articulos de la base de datos.
| DELETE | /api/article/:id | Libreria para la comunicación y manipulación de datos para la base de datos.
| DELETE | /api/article/url?url | Adaptador de salida para la recogida de información de la web externa.
| POST | /api/article/elpais/save | Recoger y almacenar en la base de datos las primeras cinco noticias de la web de [ElPais](https://elpais.com).

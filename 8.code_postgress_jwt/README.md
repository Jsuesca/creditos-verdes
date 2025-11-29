1. Empezamos a usar promesas:

Como se debe hacer conexión a BD o a Event Broker (Apache Kafka, RabbitMQ, ActiveMQ, Nats, AWS EventBridges, etc.) y a la hora de inicializar todas estas conexiones pueden fallar, debemos saber cuál falló o cuál se conectó.
Debo asegurarme que:
- Levanto el servidor
- Que hay conexión a la BD
- Conexión con el Event Broker

Vamos a crear promesas; sirven para operaciones asíncronas y pueden tener tres estados:
- Pendiente (pending): La operación aún no ha terminado.
- Resuelta (fulfilled): La operación se completó exitosamente.
- Rechazada (rejected): Hubo un error en la operación.

Las promesas se utilizan para manejar tareas asíncronas como:
- Lectura y escritura de archivos.
- Consultas a bases de datos.
- Peticiones HTTP.

2. Async – await
3. Función clásica – flecha – autoinvocada





## **Explicación de cada sección**

1. **Archivo de configuración de entorno .env**:
- .env

2. Instalamos **dotenv** que es una dependencia de **Node.js** que nos permite cargar variables de entorno desde un archivo **.env** a **process.env**. Es recomendable usar cuando se trabaja con **datos sensibles**, como claves, tokens de API, credenciales de BD, puertos etc.

- npm install dotenv o npm i dotenv

3. **Joi** librería para validar **datos** o Se usa para definir y validar el **esquema de las variables de entorno**.

Instalación

- npm i joi


### **Explicación de cada sección**
1. **Configurar mysql**
- npm install typeorm mysql2
2. vamos a environment-vars.ts y reconfiguramos el archivo con las nuevas variables de entorno
3. Descomentamos en el tsconfig.ts las siguientes opciones:
- "experimentalDecorators": true,
- "emitDecoratorMetadata": true,


### **Explicación de cada sección**

1. **Cofigurar mysql**
   - npm install typeorm mysql2
2. vamos a environment-vars.ts y reconfiguramos el archivo con las nuevas variables
   de entorno
3. Descomentamos en el tsconfig.ts las siguientes opciones:
   - "experimentalDecorators": true,
   - "emitDecoratorMetadata": true,


   1. Desinstalar mysql
   - npm uninstall mysql mysql2

2. Instalar postgress
   - npm install pg

3. Actualizar las variables de entorno
   - Actualizaamos .env

PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=admin
DB_NAME=patterns_class

4. En el data-base.ts actualizamos en el AppDataSource
5. Actualizamos en el entities


### **Explicación de cada sección**

1. Instalar
- npm install bcryptjs
- npm install --save-dev @types/bcryptjs
- npm install jsonwebtoken
- npm install --save-dev @types/jsonwebtoken
* revisar "esModuleInterop": true,
- npm install cors
- npm install --save-dev @types/cors

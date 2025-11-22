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


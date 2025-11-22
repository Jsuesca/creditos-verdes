import app from "./app";
import { ServerBootstrap } from "./infraestructure/bootstrap/server.bootstrap";
import { connectDB } from "./infraestructure/config/data-base";

const serverBootstrap = new ServerBootstrap(app);

(async () => {
    try {
        const instances = [
            connectDB(), // Conexión a la BD
            serverBootstrap.initialize() // Inicialización del servidor
        ];

        await Promise.all(instances);
    } catch (error) {
        console.log("Error al iniciar la aplicación", error);
        process.exit(1);
    }
})();
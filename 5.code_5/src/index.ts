import app from "./app";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";

const serverBootstrap = new ServerBootstrap(app);


/**
 * Función tipo clásica
 */
async function startServer() {
    try {
        const instances = [serverBootstrap.initialize()];
        await Promise.all(instances);
    } catch (error) {
        console.log(error);
    }
}
/**
 * Función tipo flecha
 */
const startServerFlecha = async () => {
    try {
        const instances = [serverBootstrap.initialize()];
        await Promise.all(instances);
    } catch (error) {
        console.log(error);
    }
}
/**
 * invocacion de funciones
*/
startServer();

//startServerFlecha();

/**
 * Función autoinvocada
*/
(
    async () => {
        try {
            const instances = [serverBootstrap.initialize()];
            await Promise.all(instances);
        } catch (error) {
            console.log(error);
        }
    })(); 
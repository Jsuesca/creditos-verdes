import app from "./app";
import { ServerBootstrap } from "./bootstrap/server.boostrap";

const serverBootstrap = new ServerBootstrap(app);
serverBootstrap.initialize();

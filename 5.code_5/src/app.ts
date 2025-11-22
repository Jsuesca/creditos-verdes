import express, { type Request, type Response } from "express";

class app {
   private app: express.Application;

   constructor() {
      this.app = express();
      this.routes();
   }
   private routes(): void {
      this.app.get("/", (req: Request, res: Response) => res.send("Hello World"));
      this.app.get("/hello", (req: Request, res: Response) => res.send("Hello Students"));
   }

   getApp() {
      return this.app;
   }
}



export default new app().getApp();

import express from "express";
import cors from "cors";
import userActivityRoutes from "../routes/UserActivityRoutes";
import userRoutes from "../routes/UserRoutes";
import activityRoutes from "../routes/ActivityRoutes";
import testRoutes from "../routes/TestRoutes";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );

    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use("/api/users", userRoutes);
    this.app.use("/api/activities", activityRoutes);
    this.app.use("/api/user-activities", userActivityRoutes);
    this.app.use("/api/test", testRoutes);

    this.app.get("/api/health", (req, res) => {
      res.json({ status: "OK", message: "Backend funcionando" });
    });
  }
}

export default new App().app;

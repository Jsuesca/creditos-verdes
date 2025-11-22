import app from "./app";
import http from "http";


const server = http.createServer(app);
const PORT = Number (process.env.PORT ?? 4000);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
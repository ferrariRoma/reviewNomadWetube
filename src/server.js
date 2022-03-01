import express from "express";
import videoRouter from "./routers/videoRouter";
import rootRouter from "./routers/rootRouter";
import morgan from "morgan";
import res from "express/lib/response";

const app = express();
const logger = morgan("dev");

app.use(logger);

app.use("/", rootRouter);
app.use("/videos", videoRouter);

const handleListen = () => {
  console.log("Connected localhost:4000 ✅");
};

app.listen(4000, handleListen);

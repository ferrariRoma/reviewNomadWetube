import express from "express";
import videoRouter from "./routers/videoRouter";
import rootRouter from "./routers/rootRouter";
import morgan from "morgan";
import res from "express/lib/response";
import "./db";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use("/", rootRouter);
app.use("/videos", videoRouter);

const handleListen = () => {
  console.log("✅ Connected localhost:4000");
};

app.listen(4000, handleListen);

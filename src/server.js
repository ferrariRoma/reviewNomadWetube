import express from "express";
import videoRouter from "./routers/videoRouter";
import rootRouter from "./routers/rootRouter";
import morgan from "morgan";
import session from "express-session";
import res from "express/lib/response";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "Hello!", resave: true, saveUninitialized: true }));

app.use("/", rootRouter);
app.use("/videos", videoRouter);

export default app;

import express from "express";
import morgan from "morgan";
import path from "path";
import cors from "cors";
import appError from "./error.js";
import MenuRouter from "./Routes/menuRouter.js";
import UserRouter from "./Routes/userRouter.js";
import PaymentRouter from "./Routes/paymentRouter.js";
const __dirname = path.resolve(); // For ES modules, `__dirname` must be defined manually.

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/menu", MenuRouter);
app.use("/user", UserRouter);
app.use("/payment", PaymentRouter);

//Route for NOT defined routes
app.use("*", (req, res, next) => {
  next(new appError(`Can't find ${req.originalUrl} on this server`, 404));
});

export default app;

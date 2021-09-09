import express from "express";
import indexRouter from "./routes/index";
const app = express();
app.use(express.json())
app.use(indexRouter);
app.listen(3000, () => {
    console.log("The application is listening on port 3000!");
});

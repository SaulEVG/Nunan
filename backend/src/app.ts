import express from "express";
import cors from "cors";
import router from "./routes";

const PORT = process.env.PORT ?? 8080;
const app = express();

app.use(cors());
app.get("/", (req, res) => {
  res.status(200).send({ message: "Hola perro" });
});
app.use("/api", router);
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

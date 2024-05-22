import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Received GET");
  res.send("Hello World!");
});

app.post("/items", (req, res) => {
  const item = req.body;
  console.log("Received item:", item);
  res.status(201).send(item);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

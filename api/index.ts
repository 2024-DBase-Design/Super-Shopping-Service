import { PrismaClient } from "@prisma/client";
// requires = require("@prisma/client");
import express from "express";

const port = 5431;

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/", async (req, res) => {
  res.send("Hello World");
});

app.listen(port, () =>
  console.log("REST API server ready at: http://localhost:5431")
);

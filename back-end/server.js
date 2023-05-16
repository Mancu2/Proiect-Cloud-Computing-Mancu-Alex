const express = require("express");
const app = express();
const cors = require("cors");

const router = require("./routes");

const port = 8081;

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is online on port ${port}`);
  console.log(`http://localhost:${port}`);
});

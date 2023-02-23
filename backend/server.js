const path = require("path");
const express = require("express");
const unitRoute = require("./routes/unitRoute");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

console.log(__dirname);

//connect DB
connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/units", unitRoute);
// serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../", "frontend", "index.html"));
});
app.get("/customize-unit", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../", "frontend", "customize-unit.html")
  );
});
app.get("/virtual-tour", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../", "frontend", "virtual-tour.html"));
});
app.get("/unit-types", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../", "frontend", "unit-types.html"));
});
app.get("/book-now", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../", "frontend", "book-now.html"));
});

// app.use(notFound);
// app.use(errHandler);

app.listen(process.env.PORT, () =>
  console.log(`server is running on ${process.env.PORT}`)
);

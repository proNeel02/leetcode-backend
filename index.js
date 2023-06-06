const express = require("express");
const app = express();
const port = 5000;

app.post("/login", (req, res) => {
  res.send("Login!!");
});

app.post("/signup", (req, res) => {
  res.send("signup");
});

app.get("/questions", (req, res) => {
  res.send("Questions");
});

app.get("/submissions", (req, res) => {
    res.send("subs");
  });
  

app.listen(port, () => {
  console.log(`Server is Running at ${port}`);
});

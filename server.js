const express = require("express");
const app = express();
const port = 5000;
const fs = require("fs");

// Middleware to parse JSON data
app.use(express.json());

const fileContent = fs.readFileSync("users.json", "utf8");
const USERS = JSON.parse(fileContent);

const questionsFileContent = fs.readFileSync("questions.json", "utf8");
const QUESTIONS = JSON.parse(questionsFileContent);

app.post("/signup", (req, res) => {
  // Add Logic to Decode Body
  // body should have email and password
  // Store email and password in USERS array (only if the user with same email not exist)
  const userObj = req.body;

  if (USERS.find((obj) => obj.email === userObj.email)) {
    res.status(409).json({ error: "Email already registered" });
  } else {
    USERS.push(userObj);
    fs.writeFileSync("users.json", JSON.stringify(USERS));
    res.status(201).json({ message: "User Signup successful" });
  }
});

app.post("/login", (req, res) => {
  // Add Logic to Decode Body
  // body should have email and password
  // check user is present inside an USERS array with same email
  // and password

  // if exist send status code 200 to the client
  // also send back a token

  // if password is not same return back to status code 401 (incorrect password)
  // if email not found return 404 ("User Not Found");

  const currObj = req.body;

  USERS.find((obj) => obj.email === currObj.email)
    ? USERS.find((obj) => obj.password === currObj.password)
      ? res.status(200).json({ message: "User Found!!" })
      : res.status(401).json({ error: "Incorrect Password!" })
    : res.status(404).json({ error: "User Not Found!" });
});

app.get("/questions", (req, res) => {
  if (QUESTIONS.length === 0) {
    res.status(204).json({ message: "No Questions" });
  }
  res.status(200).json(QUESTIONS);
});

app.get("/question/:id", (req, res) => {
  // Get specific Question when USER cliked on
  const currId = Number(req.params.id);

  const questionObj = QUESTIONS?.find((obj) => {
    return obj.id === currId;
  });

  if (questionObj) {
    res.status(200).json(questionObj);
    return;
  }
  res.status(404).json({ error: "Invalid Question Id" });
});

app.post("/admin/addQuestion", (req, res) => {
  const currObj = req.body;
  if (QUESTIONS.find((obj) => obj.question.title === currObj.title)) {
    res.status(409).json({ error: "Question Already Exist" });
  } else {
    QUESTIONS.push({ question: currObj, id: QUESTIONS.length });
    fs.writeFileSync("questions.json", JSON.stringify(QUESTIONS));
    res.status(201).json({ message: "Questions is Created!!" });
  }
});

app.get("/submission/:id", (req, res) => {
  // return the submission of specific problem if submission is present
  // if not restun unsolved or unattempted
  
});

app.post("/submissions", (req, res) => {
  // let the user submmit a problem, randomly accept or reject the solution
  // Store the submission in the SUBMISSION array
});

app.listen(port, () => {
  console.log(`Server is Running at ${port}`);
});

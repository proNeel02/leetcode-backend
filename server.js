const express = require("express");
const app = express();
const port = 5000;

// Middleware to parse JSON data
app.use(express.json());


const USERS = [];

app.post("/login", (req, res) => {

  
  res.send("Login!!");
});

app.post("/signup", (req, res) => {

   // Add Logic to Decode Body
// body should have email and password
 // Store email and password in USERS array (only if the user with same email not exist)

    const userObj =  req.body;
     
   if(USERS.find((obj) => obj.email === userObj.email)){
    res.status(409).json({ error: 'Email already registered' });    
   }else{
     USERS.push(userObj);
    res.status(201).json({ message: 'User signup successful' });
   }
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

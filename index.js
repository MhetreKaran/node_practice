const express = require("express");
const app = express();
const db = require("./db")();
const passport = require("./auth");

const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const logRequest = (req, res, next) => {
  next();
};

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });
app.get("/", localAuthMiddleware, (req, resp) => {
  resp.send("Welcome to nodejs tutorials");
});
const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

app.listen(PORT, () => console.log("Server is start on port 3000"));

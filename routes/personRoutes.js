const express = require("express");
const Person = require("../models/person");
const { generateToken } = require("../jwt");
const router = express.Router();

router.get("/", async (req, resp) => {
  try {
    const data = await Person.find();
    resp.status(200).json(data);
  } catch (error) {
    resp.status(500).json({ error: "Internal server error" });
  }
});
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    const token = generateToken({email:response.email});
    console.log("token", token);
    res.status(200).json({ data: response, token: token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login Route
router.post('/login',async(req,res)=>{
  try {
    // Extract username and password from request body
    console.log('request',req.body);
    const {username,password}= req.body;
console.log('login',username,password);
    //Find the user by username
    const user = await Person.findOne({username:username});
    console.log(user);
    //If user does not exist or password does not match, return error
    if(!user || !( await user.comparePassword(password))){
      return res.status(401).json({error:'Invalid username or password'});
    }

    //generate token
    const payload = {
      id:user.id,
      username: user.username, 
    }
    const token = generateToken(payload)
    res.json({token})
  } catch (error) {
    console.error(error);
    res.status(500).json({err:'Invalid server error'});
  }
})

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatePersonData = req.body;
    const response = await Person.findByIdAndUpdate(
      personId,
      updatePersonData,
      { new: true, runValidators: true }
    );
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data updated");
    res.status(200).json({ message: "Person deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:workType", async (req, resp) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetch");
      resp.status(200).json(response);
    } else {
      resp.status(404).json({ error: "Invalid work type" });
    }
  } catch (error) {
    resp.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

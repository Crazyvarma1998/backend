const express = require('express');
const User = require('../db/user'); // Import the User model

const router = express.Router();
const {addUser,getUsers, updateUser, deleteUser, getUser} = require("../handler/userHandle");
// Middleware to parse JSON request bodies
router.use(express.json());

router.post('/users', (req, res) => {
  const { name, email, age, address, password } = req.body; 

  // 1. Check if data is received correctly:
  console.log("Received data:", req.body);

  // 2. Database interaction (example using MongoDB):
  const newUser = new User({ name, email, age, address, password });
  newUser.save()
    .then(() => res.status(201).json({ message: 'User created!' }))
    .catch(error => {
      console.error("Error saving user:", error);
      res.status(500).json({ error: 'Failed to create user' });
    });
});

// ... rest of your backend code ...

router.get("/users", async(req,res) =>{
  let users=  await getUsers()
    res.send(users);
})
router.get("/users/:id", async(req,res) =>{
    let users=  await getUser(req.params["id"])
      res.send(users);
  })
  router.put("/users/:id", async(req,res) =>{
    console.log("id",req.params["id"])

    await updateUser(req.params["id"],req.body);
  })
  router.delete("/users/:id", async (req, res) => { 
    console.log("id", req.params["id"]);
  
    try {
      await deleteUser(req.params["id"]);
      res.status(204).send(); 
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).send("Error deleting user"); 
    }
  });
  
  
module.exports = router;
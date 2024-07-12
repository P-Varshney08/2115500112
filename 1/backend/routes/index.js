const router = require("express").Router();
const userRouter = require('./user.route.js');

router.use('/user',userRouter)

router.get('/', (req, res) => {
  res.send('Hello World!');
})

router.get("/api/user", (req, res) => {
  res.send("Welcome to  Afford Medical");
});



module.exports = router; 

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const logger = require("morgan");
const db=require("./DB/index")
const routes=require("./routes/index")
dotenv.config();
const app = express();
db().then(() => {
  console.log("start ur work🏹");
}).catch((error) => {
  console.error("Error connecting to the database:", error);
  process.exit(1); 
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use((req, res, next) => { 
    console.log('Request Origin:', req.headers.origin);
    next();
  });
app.use('/api/v1',routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.listen(8080, () => {
  console.log(`Server is running on port ${8080}`);
});
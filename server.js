require('dotenv').config(); //load .env variables
const express = require('express'); 
const app = express();
const cors = require('cors');
const PORT = process.env.PORT;
const sudoku = require("./routes/sudoku");
const leaderBoard = require("./routes/leaderBoard");

app.use(express.json()); // add req.body
app.use(cors()); // allow cross-origin resource sharing
app.use((req, res, next) => {
    console.log(new Date(Date.now()).toLocaleString(), req.originalUrl);
    next();
  })

app.use("/warehouses", sudoku);
app.use("/leaderboard", leaderBoard);

app.listen(PORT, () => {
    console.log(`Server Started on ${process.env.PORT}`);
});
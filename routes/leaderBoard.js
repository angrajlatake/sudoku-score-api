const express = require("express");
const router = express.Router();
const fs = require("fs");
//gets top 5 player names and scores
router.get("/", (req, res) => {
    fs.readFile("./data/leaderBoard.json", "utf8", (err, data) => {
        const leaderBoard = JSON.parse(data);
        console.log(data)
        const topFive = leaderBoard.slice(0, 5);
        if (err){
            res.status(400).send("Error reading file");
        } else {
            res.json(topFive);
        }   
    })
})
//post new player name and score
router.post("/", (req, res) => {
    fs.readFile("./data/leaderBoard.json", "utf8", (err, data) => {
        const leaderBoard = JSON.parse(data);
        const newPlayer = {
            name: req.body.name,
            time: req.body.time
        }
        leaderBoard.push(newPlayer);
        leaderBoard.sort((a, b) => {
            return (new Date (new Date().toDateString() + ' ' + a.time))  - (new Date (new Date().toDateString() + ' ' + b.time));
        })
        const topFive = leaderBoard.slice(0, 5);
        fs.writeFile("./data/leaderBoard.json", JSON.stringify(leaderBoard), (err) => {
            if (err){
                res.status(400).send("Error writing to file");
            } else {

                res.json(topFive);
            }
        })
    })
})
module.exports = router;
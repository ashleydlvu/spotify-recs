/**
 * Ashley Vu
 * Date: 5/15/21
 * Section: AF/TA: Shriya Kurpad
 * This is the app.jss that acts as the backend that sends information
 * about different music recommendations back to the client side code to
 * be display back to the user in the browser.
 */
'use strict';
const express = require('express');
const fs = require('fs').promises;
const app = express();
const SERVER_SIDE_ERROR = 500;
const CLIENT_SIDE_ERROR = 400;
const PORT_NUM = 8000;

const GENRES = ["pop", "rap", "edm", "r&b", "throwback"];

app.use(express.static('public'));

/**
 * GET request for all the available genres names. Upon success it will return text containing
 * a text file of all the genre names. Otherwise a 500 server error will return.
 */
app.get("/genre", async function(req, res) {
  try {
    let genre = await fs.readFile("genre.txt", "utf-8");
    res.type("text").send(genre);
  } catch (error) {
    res.status(SERVER_SIDE_ERROR).send("Server error. Try again later.");
  }
});

/**
 * GET request for specific genre. Upon success it will return JSON containing information
 * about the inputted genre including an array of artists, songs, and description to pull from
 * to create a random recommendation for the user. If a user puts in an invalid genre a 400 error
 * will occur and send an error specifying the genre is not found.
 */
app.get("/getRecs/:genre", async function(req, res) {
  try {
    let genre = req.params["genre"];
    if (GENRES.includes(genre)) {
      let contents = await fs.readFile(genre + ".json", "utf-8");
      res.json(JSON.parse(contents));
    } else {
      res.status(CLIENT_SIDE_ERROR).send("Invalid request. Genre not found please try another.");
    }
  } catch (error) {
    res.status(SERVER_SIDE_ERROR).send("Server error. Please try again later.");
  }
});

const PORT = process.env.PORT || PORT_NUM;
app.listen(PORT);

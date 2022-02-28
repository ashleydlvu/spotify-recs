/**
 * Ashley Vu
 * Date: 5/15/21
 * Section: AF/TA: Shriya Kurpad
 * This is the index.jss that changes the appearance of the
 * browser so it displays a new recommendation everytime the
 * button is pushed.
 */

"use strict";
(function() {

  /**
   * Calls the init function when the window first loads
   */
  window.addEventListener("load", init);

  /**
   * Sets up functionality of recommendations button and clears any
   * existing recommendations displayed
   */
  function init() {
    let getRecBtn = id("recs-btn");
    getRecBtn.addEventListener("click", requestGenre);
  }

  /**
   * Grabs all the available genre names and sends the info
   * to the setUpSelection function to display available choices for the user.
   */
  function requestGenre() {
    let url = "/genre";
    fetch(url)
      .then(statusCheck)
      .then(resp => resp.text())
      .then(setUpSelection)
      .catch(handleError);
  }

  /**
   * Sets up the buttons of the different genres users can request a recommendation from.
   * @param {text} data - text of all the available genre names
   */
  function setUpSelection(data) {
    let genres = data.split("\n");
    genres.forEach(genre => {
      let button = gen("button");
      button.id = genre;
      button.textContent = genre;
      button.addEventListener("click", getRecs);
      id("genres").appendChild(button);
    });
  }

  /**
   * Grabs the information of the requested genre and sends the info
   * to the displayRecs function to display the data
   */
  function getRecs() {
    let genre = this.textContent.toLowerCase();
    let url = "/getRecs/" + genre;
    fetch(url)
      .then(statusCheck)
      .then(resp => resp.json())
      .then(displayRecs)
      .catch(handleError);
  }

  /**
   * Clears the existing recommendation
   */
  function clearRec() {
    let genre = qs(".genre");
    let genreDescription = qs("#genres h2");
    let recommendation = qs("#genres p");
    if (genre !== null && genreDescription !== null && recommendation !== null) {
      genre.remove();
      genreDescription.remove();
      recommendation.remove();
    }
  }

  /**
   * Creates and displays a random recommendation by parsing through the
   * specific genre info sent from the server.
   * @param {JSON} data - JSON object of the requested genre information fetched from the server
   */
  function displayRecs(data) {
    clearRec();
    let genreName = data.name;
    let numArtists = data.artist.length;
    let randIndex = getRandomInt(numArtists);
    let artist = data.artist[randIndex];
    let song = data.song[randIndex];
    let description = data.description;
    let genre = gen("h1");
    let genreDescription = gen("h2");
    let recommendation = gen("p");
    genre.textContent = genreName;
    genreDescription.textContent = description;
    recommendation.textContent = "'" + song + "', " + artist;
    id("genres").appendChild(genre);
    id("genres").appendChild(genreDescription);
    id("genres").appendChild(recommendation);
    genre.classList.add("genre");
    genreDescription.classList.add("genre-description");
    recommendation.classList.add("recommendation");
  }

  /**
   * Handles the errors passed from the .then chain when fetching data
   * from the API. Displays error message to the user.
   * @param {object} err - error
   */
  function handleError(err) {
    if (err) {
      let errMessage = gen("p");
      id("genres").appendChild(errMessage);
      errMessage.textContent = "Error Occurred. Try again later.";
    }
  }

  /**
   * Generates a random number between a 0 and (max - 1)
   * @param {number} max - Maximum value that the number can be generated up to (exclusive)
   * @return {number} - random number from 0 to given max (exclusive)
   */
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  function statusCheck(res) {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res;
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns first element matching selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} - DOM object associated selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Generates and returns new element
   * @param {object} tagName - HTML element.
   * @returns {object} - DOM element.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

})();
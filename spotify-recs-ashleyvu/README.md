# Spotify Rec Specification
## Overview
Creating a Node.js web service that is available for use with AJAX and fetch. The project fetches data and sends back information to the client side code to display music recommendations back to the user. The project is meant to replicate the Spotify aesthetic and gives music recommendations based on the user's interaction. This project was inspired by my passion for music, love for Spotify, and interest in front-end development. 

## External Requirements
* Your project includes the following six files:
  * `index.html` - main page of application
  * `styles.css` - file to style Spotify themed page
  * `index.js` - containing client-side JavaScript code
  *  a `app.js` web service the .js file fetches from with using a combination of GET/POST.
  * a `APIDOC.md` file to document your `app.js` web service.
  * Project's `package.json` file generated using `npm init` and including any dependencies used (`express`).


* `index.js` makes AJAX requests to my Node.js web service which responds with information.
* Client-Side JavaScript: Website dynamically loads information from the web API implemented and presenst information from that response on the page. 
  * Handle any errors caused in the fetch request/response process by displaying a helpful message to the user on the page

```

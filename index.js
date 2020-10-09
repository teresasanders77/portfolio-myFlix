const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const uuid = require('uuid');
const mongoose = require("mongoose");
const Models = require("./models.js");
const cors = require("cors");
const { check, validationResult } = require("express-validator");
const passport = require("passport");
require("./passport");
require('dotenv').config()

const Movies = Models.Movie;
const Users = Models.User;

//var allowedOrigins = ['http://localhost:1234', '*'];

app.use(cors());

//Imports auth.js file
var auth = require("./auth")(app);

/**
* @requires path
* @requires express
* @requires morgan
* @requires body-parser
* @requires uuid
* @requires mongoose
* @requires Models from './models.js'
* @requires cors
* @requires epress-validator
* @requires passport
*/

mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/client", express.static(path.join(__dirname, "client", "dist")));
app.get("/client/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});


app.use(morgan("common"));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!')
});

//GET requests
app.get("/documentation.html", (req, res) => {
  res.sendFile("documentation.html");
});

/**
 * This endpoint returns a list of all movies 
 * Method: GET
 * Endpoint URL: /movies
 * Example response: 
 * @param {string} Title
 * @param {string} Description
 */

app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * This endpoint returns data about a single movie by title to the user
 * Method: GET
 * Endpoint URL: /movies/:Title
 * Example response: 
 * @param {object} Genre: Name, Description
 * @param {object} Director: Name, Bio, Birth, Death
 * @param {array} Actors
 * @param {string} _id
 * @param {string} Title
 * @param {string} Description
 * @param {string} ImagePath
 * @param {boolean} Featured
 */
app.get(
  "/movies/:Title",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then((movie) => {
        res.json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * This endpoint returns data about a genre by name/title
 * Method: GET
 * Endpoint URL: /movies/genres/:Name
 * Example response: 
 * @param {string} Name
 * @param {string} Description
 */
app.get(
  "/movies/genres/:Name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ "Genre.Name": req.params.Name })
      .then((movies) => {
        res.json(movies.Genre);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * This endpoint returns data about a director by name
 * Method: GET
 * Endpoint URL: /movies/directors/:Name
 * Example response: 
 * @param {string} Name
 * @param {string} Bio
 * @param {date} Birth
 * @param {date} Death
 */
app.get(
  "/movies/directors/:Name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ "Director.Name": req.params.Name })
      .then((movies) => {
        res.json(movies.Director);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * This endpoint allows a new user to register (Username, password, email, date of birth).
 * Method: POST
 * Endpoint URL: /users
 * Example response: 
 * @param {array} Favorites
 * @param {string} _id
 * @param {string} Username
 * @param {string} Password
 * @param {string} Email
 * @param {date} Birthday
 */
app.post(
  "/users",
  //Validation logic here for request
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ],
  (req, res) => {
    // check the validation for errors
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username }) //Search to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + "already exists");
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
          })
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send("Error: " + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);
/**
 * This endpoint allows current users to update their info (Username, password, email, date of birth).
 * Method: PUT
 * Endpoint URL: /users/:Username
 * Example response: 
 * @param {array} Favorites
 * @param {string} _id
 * @param {string} Username
 * @param {string} Password
 * @param {string} Email
 * @param {date} Birthday
 */
app.put("/users/:Username", (req, res) => {
  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
    },
    { new: true }, //makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

/**
 * This endpoint allows a user to add a specific movie to their list of favorites.
 * Method: POST
 * Endpoint URL: /users/:Username/Movies/:MovieID
 * Example response: 
 * @param {array} Favorites
 * @param {string} _id
 * @param {string} Username
 * @param {string} Password
 * @param {string} Email
 * @param {date} Birthday
 */
app.post(
  "/users/:Username/Movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $push: { Favorites: req.params.MovieID },
      },
      { new: true }, //Makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

/**
 * This endpoint allows a user to remove a movie from their list of favorites.
 * Method: DELETE
 * Endpoint URL: /users/:Username/Movies/:MovieID
 * Example response: 
 * @param {array} Favorites
 * @param {string} _id
 * @param {string} Username
 * @param {string} Password
 * @param {string} Email
 * @param {date} Birthday
 */
app.delete(
  "/users/:Username/Movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $pull: { Favorites: req.params.MovieID },
      },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error: " + err);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);

/**
 * This endpoint allows a current user to de-register their information.
 * Method: DELETE
 * Endpoint URL: /users/:Username
 * Example response: 
 * User was deleted 
 */
//Delete a user by username
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + " was not found");
        } else {
          res.status(200).send(req.params.Username + " was deleted.");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

//listen for requests
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port 3000");
});

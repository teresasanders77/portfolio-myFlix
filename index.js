const express = require("express");
const app = express();

//uses Morgan to log requests
morgan = require("morgan");
app.use(morgan("common"));

let topTenMovies = [
  {
    title: "The Godfather",
    year: "1972",
  },
  {
    title: "The Shawshank Redemption",
    year: "1994",
  },
  {
    title: "Schindler's List",
    year: "1993",
  },
  {
    title: "Raging Bull",
    year: "1980",
  },
  {
    title: "Casablanca",
    year: "1942",
  },
  {
    title: "Citizen Kane",
    year: "1941",
  },
  {
    title: "Gone with the Wind",
    year: "1939",
  },
  {
    title: "The Wizard of Oz",
    year: "1939",
  },
  {
    title: "One Flew Over the Cuckoo's Nest",
    year: "1975",
  },
  {
    title: "Lawrence of Arabia",
    year: "1962",
  },
];

//GET requests
app.get("/movies", function (req, res) {
  res.json(topTenMovies);
});

app.get("/", function (req, res) {
  res.send("This is a test.");
});

//serves "documentation.html" file from the public folder
app.use(express.static("public"));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});

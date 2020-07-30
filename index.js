const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid"),
  app = express();

//List of Movies
let Movies = [
  {
    title: "The Godfather",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    genre: "Drama",
    director: "Francis Ford Coppola",
    image: "godfather.jpg",
  },
  {
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    genre: "Drama",
    director: "Frank Darabont",
    image: "shawshank.jpg",
  },
  {
    title: "Schindler's List",
    description:
      "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    genre: "Drama",
    director: "Steven Spielberg",
    image: "schindler.jpg",
  },
  {
    title: "Raging Bull",
    description:
      "The life of boxer Jake LaMotta, whose violence and temper that led him to the top in the ring destroyed his life outside of it.",
    genre: "Drama",
    director: "Martin Scorsese",
    image: "raging.jpg",
  },
  {
    title: "Casablanca",
    description:
      "A cynical American expatriate struggles to decide whether or not he should help his former lover and her fugitive husband escape French Morocco.",
    genre: "Drama",
    director: "Michael Curitz",
    image: "casablanca.jpg",
  },
  {
    title: "Citizen Kane",
    description:
      "Following the death of publishing tycoon Charles Foster Kane, reporters scramble to uncover the meaning of his final utterance; 'Rosebud'.",
    genre: "Drama",
    director: "Orson Welles",
    image: "citizen.jpg",
  },
  {
    title: "Gone with the Wind",
    description:
      "A manipulative woman and a roguish man conduct a turbulent romance during the American Civil War and Reconstruction periods.",
    genre: "Drama",
    director: "Victor Fleming",
    image: "gone.jpg",
  },
  {
    title: "The Wizard of Oz",
    description:
      "Dorothy Gale is swept away from a farm in Kansas to a magical land of Oz in a tornado and embarks on a quest with her new friends to see the Wizard who can help her return home to Kansas and help her friends as well.",
    genre: "Adventure",
    director: "Victor Fleming",
    image: "wizard.jpg",
  },
  {
    title: "One Flew Over the Cuckoo's Nest",
    description:
      "A criminal pleads insanity and is admitted to a mental institution, where he rebels against the oppressive nurse and rallies up the scared patients.",
    genre: "Drama",
    director: "Milos Forman",
    image: "cuckoo.jpg",
  },
  {
    title: "Lawrence of Arabia",
    description:
      "The story of T.E. Lawrence, the English officer who successfully united and led the diverse, often warring, Arab tribes during World War I in order to fight the Turks.",
    genre: "Adventure",
    director: "David Lean",
    image: "lawrence.jpg",
  },
];

//List of genres
let Genres = [
  {
    name: "Drama",
    description:
      "Serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature.",
  },
  {
    name: "Adventure",
    description:
      "Adventure films typically use their action scenes to display and explore exotic locations in an energetic way.",
  },
];

//List of directors
let Directors = [
  {
    name: "Francis Ford Coppola",
    bio:
      "An American retired film director, producer, and screenwriter. He was a central figure in the New Hollywood filmmaking movement of the 1960s and 1970s, and is widely considered to be one of the greatest filmmakers of all time.",
    birthYear: "April 7, 1939",
    deathYear: "Not Applicable",
  },
  {
    name: "Frank Darabont",
    bio:
      "A Hungarian-American film director, screenwriter and producer who has been nominated for three Academy Awards and a Golden Globe Award. In his early career, he was primarily a screenwriter for horror films such as A Nightmare on Elm Street 3: Dream Warriors, The Blob and The Fly II.",
    birthYear: "January 28, 1959",
    deathYear: "Not Applicable",
  },
  {
    name: "Steven Spielberg",
    bio:
      "An American film director, producer, and screenwriter. He is considered one of the founding pioneers of the New Hollywood era and one of the most popular directors and producers in film history. Spielberg started in Hollywood directing television and several minor theatrical releases.",
    birthYear: "December 18, 1946",
    deathYear: "Not Applicable",
  },
  {
    name: "Martin Scorsese",
    bio:
      "An American film director, producer, screenwriter, and actor. One of the major figures of the New Hollywood era, he is widely regarded as one of the most significant and influential directors in film history.",
    birthYear: "November 17, 1942",
    deathYear: "Not Applicable",
  },
  {
    name: "Michael Curitz",
    bio:
      "A Hungarian-born American film director, recognized as one of the most prolific directors in history. He directed classic films from the silent era and numerous others during Hollywood's Golden Age, when the studio system was prevalent.",
    birthYear: "December 24, 1886",
    deathYear: "April 11, 1962",
  },
  {
    name: "Orson Welles",
    bio:
      "An American actor, director, writer and producer who is remembered for his innovative work in radio, theatre and film. He is considered one of the greatest filmmakers of all time.",
    birthYear: "May 6, 1915",
    deathYear: "October 10, 1985",
  },
  {
    name: "Victor Fleming",
    bio:
      "An American film director, cinematographer, and producer. His most popular films were The Wizard of Oz and Gone with the Wind, for which he won an Academy Award for Best Director.",
    birthYear: "February 23, 1889",
    deathYear: "January 6, 1949",
  },
  {
    name: "Milos Forman",
    bio:
      "A Czech-American film director, screenwriter, actor, and professor who rose to fame in his native Czechoslovakia before emigrating to the United States in 1968. Forman was an important figure in the Czechoslovak New Wave.",
    birthYear: "February 18, 1932",
    deathYear: "April 13, 2018",
  },
  {
    name: "David Lean",
    bio:
      "An English film director, producer, screenwriter and editor. Widely considered one of the most influential directors of all time, Lean directed the large-scale epics The Bridge on the River Kwai, Lawrence of Arabia, Doctor Zhivago and A Passage to India.",
    birthYear: "March 25, 1908",
    deathYear: "April 16, 1991",
  },
];

//User info
let Users = [
  {
    id: 1,
    username: "moviebuff111",
    password: "ilovemovies222",
    email: "moviebuff111@gmail.com",
    dob: "July 29th, 2020",
    Favorites: {},
  },
];

//List of Favorites
let Favorites = [
  {
    title: "The Godfather",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    genre: "Drama",
    director: "Francis Ford Coppola",
    image: "godfather.jpg",
  },
];

//uses Morgan to log requests
app.use(morgan("common"));

//Using bodyParser
app.use(bodyParser.json());

//GET requests
//Returns a list of ALL movies to the user
app.get("/movies", function (req, res) {
  res.json(Movies);
});

//Returns data about a single movie by title to the user
app.get("/movies/:title", (req, res) => {
  res.json(
    Movies.find((movie) => {
      return movie.title === req.params.title;
    })
  );
});

//Returns a list of ALL genres to the user
app.get("/genres", function (req, res) {
  res.json(Genres);
});

//Returns data about a genre by name/title
app.get("/genres/:name", (req, res) => {
  res.json(
    Genres.find((genre) => {
      return genre.name === req.params.name;
    })
  );
});

//Returns a list of ALL directors to the user
app.get("/directors", function (req, res) {
  res.json(Directors);
});

//Returns data about a director by name
app.get("/directors/:name", (req, res) => {
  res.json(
    Directors.find((director) => {
      return director.name === req.params.name;
    })
  );
});

//Allows new users to register
app.post("/users", (req, res) => {
  let newUser = req.body;

  if (!newUser.username || !newUser.password) {
    const message = "Missing username or password in request body";
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    Users.push(newUser);
    res.status(201).send(newUser);
  }
});

//Allows users to update their user info
app.put("/users/:username", (req, res) => {
  res.send("User information has been updated");
});

//Allows users to add a movie to their list of favorites
app.post("/users/:name/favorites", (req, res) => {
  let newFavorite = req.body;

  if (!newFavorite.title) {
    const message = "Missing title in request body";
    res.status(400).send(message);
  } else {
    newFavorite.id = uuid.v4();
    Favorites.push(newFavorite);
    res.status(202).send(newFavorite);
  }
});

//Allows users to remove a movie from their list of favorites
app.delete("/users/:username/favorites/:title", (req, res) => {
  let favorite = Favorites.find((favorite) => {
    return favorite.title === req.params.title;
  });

  if (favorite) {
    Favorites.filter(function (obj) {
      return obj.title !== req.params.title;
    });
    res.status(201).send(req.params.title + " was removed from favorites.");
  }
});

//Allows existing users to deregister
app.delete("/users/:username", (req, res) => {
  res.status(201).send(req.params.username + " has been deregistered .");
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

const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

Movie.belongsToMany(Actor, {through: "movie_actor_pivot"})
Actor.belongsToMany(Movie, {through: "movie_actor_pivot"})

Movie.belongsToMany(Director,{through: "movie_director_pivot"})
Director.belongsToMany(Movie,{through: "movie_director_pivot"})

Movie.belongsToMany(Genre, {through: "movie_genre_pivot"})
Genre.belongsToMany(Movie, {through: "movie_genre_pivot"})



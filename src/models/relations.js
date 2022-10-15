import Character from "./Character.js";
import Genre from "./Genre.js";
import Movie_serie from "./Movie_serie.js";


// Aca vendrian las relaciones

Character.belongsToMany(Movie_serie,{through:"character_movie"})
Movie_serie.belongsToMany(Character,{through:"character_movie"})

Movie_serie.belongsToMany(Genre,{through:"movie_genre"})
Genre.belongsToMany(Movie_serie,{through:"movie_genre"})
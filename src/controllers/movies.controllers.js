import Genre from "../models/Genre.js"
import Movie_serie from "../models/Movie_serie.js"
import Character from "../models/Character.js";
import { Op } from "sequelize";

export const getAllMovies = async (name, genre, order) => {
    let findInDb;
    let attributes = ['id', 'title', 'image']
    let where = {};
    let searchConditions={};
    let includes= {}

    if (!name && !genre && !order) return await Movie_serie.findAll({attributes:['id', 'title', 'image']})

    if (name) where.title = {[Op.iLike]: `%${name}%`}
    if (genre) includes={where:{name : {[Op.iLike]: `%${genre}%`}}} 

    searchConditions ={
        attributes: [...attributes],
        where:{...where}, 
        include:{ model: Genre, attributes: ['id','name'],through:{attributes:[]}, ...includes}
    }

    findInDb = await Movie_serie.findAll(searchConditions)
    if (!findInDb.length) throw new Error('loading Movies...')

    return findInDb
}

export const getMovieById = async(id)=>{
    let findInDb = await Movie_serie.findByPk(id,{
        include:[
            {
                model: Genre,
                attributes:["id","name","image"],
                through: {
                    attributes: []
                }
            },{
                model: Character,
                attributes:["id","name","image"],
                through: {
                    attributes: []
                }
            }
        ]
    })
    return findInDb
}

export const createMovie = async (image, title, date, rating, genres) => {
    if (!title || !rating || !genres) throw new Error('Complete the required fields!')
    let findInDb = await Movie_serie.findOne({ where: { title } })

    if (findInDb) throw new Error('The Movie whith this name already exist!')
    let newMovie = await Movie_serie.create({ image, title, date, rating })
    let addgenres = await Genre.findAll({
        where: { name: genres }
    })

    newMovie.addGenre(addgenres)
    return 'Movie was created successfully!'
}

export const updateMovie = async (id, image, title, date, rating, genres) => {
    let data = { image, title, date, rating, genres }
    let newMovie = await Movie_serie.update(data, { where: { id } })
    let addgenres = await Genre.findAll({
        where: { name: genres }
    })

    newMovie.addGenre(addgenres)
    return 'Movie was updated successfully!'
}

export const deleteMovie = async (id) => {
    await Movie_serie.destroy({ where: { id } })
    return 'The movie was deleted!'
}
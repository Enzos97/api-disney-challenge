import Genre from "../models/Genre.js"
import Movie_serie from "../models/Movie_serie.js"

export const getAllMovies = async () => {
    let findInDb = await Movie_serie.findAll({
        include: {
            model: Genre,
            through: {
                attributes: [],
            },
        }
    })
    if (!findInDb.length) throw new Error('loading Movies...')
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
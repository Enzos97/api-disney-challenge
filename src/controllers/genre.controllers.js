import Genre from "../models/Genre.js"

export const getAllGenres = async () => {
    let findInDb = await Genre.findAll({})
    if (!findInDb.length) throw new Error('loading genres...')
    return findInDb
}

export const getGenreById = async (id)=>{
    let findInDb = await Genre.findByPk(id)
    return findInDb
}

export const createGenre = async (name, image) => {
    if (!name) throw new Error('Complete the required fields!')
    let findInDb = await Genre.findOne({ where: { name } })

    if (findInDb) throw new Error('The Genre whith this name already exist!')
    await Genre.create({ name, image })

    return 'Genre was created successfully!'
}

export const updateGenre = async (id, name, image) => {
    await Genre.update({ name, image }, { where: { id } })
    return 'Genre was updated successfully!'
}

export const deleteGenre = async (id) => {
    await Genre.destroy({ where: { id } })
    return 'the genre was deleted!'
}
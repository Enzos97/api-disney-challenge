import Character from "../models/Character.js"
import Movie_serie from '../models/Movie_serie.js';
import { Op } from "sequelize";

export const getAllCharacters = async (name, age, weight, movies) => {
    let findInDb;
    let attributes = ['id', 'name', 'image']
    let where = {};
    let searchConditions={};
    let includes= {}

    if(!name && !age && !weight && !movies) return await Character.findAll({attributes: ['id', 'name', 'image']})

    if(name) where.name = {[Op.iLike]: `%${name}%`}
    if(age){ where.years = {[Op.eq]: age}; attributes.push('years') }
    if(weight){ where.weight = {[Op.eq]: weight}; attributes.push('weight')}
    if(movies){
        includes={where:{id : movies}}; 
    }; 
    searchConditions ={
        attributes: [...attributes],
        where:{...where}, 
        include:{ model: Movie_serie, attributes: ['id','title'],through:{attributes:[]}, ...includes}
    }
    
    findInDb = await Character.findAll(searchConditions)

    if (!findInDb.length) throw new Error('loading characters...')

    return findInDb
}

export const createCharacter = async (image, name, years, weight, history, movies_series) => {
    if (!name || !years || !weight || !history || !movies_series) throw new Error('Complete the required fields!')

    let findInDb = await Character.findOne({ where: { name } })

    if (findInDb) throw new Error('The characte whith this name already exist!')

    let newCharacter = await Character.create({ image, name, years, weight, history })
    let movies = await Movie_serie.findAll({
        where: { title: movies_series }
    })

    newCharacter.addMovie_serie(movies)

    return 'Character was created successfully!'
}

export const updateCharacter = async (id, image, name, years, wight, history, movies_series) => {
    let data = { image, name, years, wight, history }

    await Character.update(data, { where: { id } })

    let findCharacter = await Character.findOne({ where: { id } })
    let movies = await Movie_serie.findAll({
        where: { title: movies_series }
    })

    findCharacter.addMovie_serie(movies)

    return 'Character was updated succesfully'
}

export const characteDetail = async (id) => {
    let findInDb = await Character.findByPk(id, { include: Movie_serie })
    return findInDb
}

export const deleteCharacter = async (id) => {
    await Character.destroy({ where: { id } })
    return 'The movie was deleted!'
}
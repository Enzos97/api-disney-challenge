import { Router } from 'express';
import { characteDetail, createCharacter, deleteCharacter, getAllCharacters, updateCharacter } from '../controllers/characters.controllers.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.get('/characters',auth,async(req,res)=>{
    try {
        let { name, age, weight, movies} = req.query
        let characters = await getAllCharacters(name, age, weight, movies)
        res.status(200).json(characters)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.get('/characters/:id',auth,async(req,res)=>{
    try {
        let{id}=req.params
        let detailCharacter = await characteDetail(id)
        res.status(200).json(detailCharacter)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.post('/createcharacter', auth, async(req,res)=>{
    try {
        let {image, name, years, weight, history, movies_series} = req.body
        let newCharacter = await createCharacter(image, name, years, weight, history, movies_series)
        res.status(200).json(newCharacter)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.put('/updatecharacter/:id', auth, async(req,res)=>{
    try {
        let {id} = req.params;
        let {image, name, years, weight, history, movies_series} = req.body;
        let characterUpdate = await updateCharacter(id, image, name, years, weight, history, movies_series)
        res.status(200).json(characterUpdate)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.delete('/deletecharacter/:id',auth, async(req,res)=>{
    try {
        let{id}=req.params
        let characterDelete = await deleteCharacter(id)
        res.status(200).json(characterDelete)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

export default router
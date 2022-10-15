import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { createGenre, deleteGenre, getAllGenres, getGenreById, updateGenre } from '../controllers/genre.controllers.js';

const router = Router();

router.get('/genres',auth,async(req,res)=>{
    try {
        let genres = await getAllGenres()
        res.status(200).json(genres)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.get('/genres/:id',auth,async(req,res)=>{
    try {
        let {id} = req.params
        let genres = await getGenreById(id)
        res.status(200).json(genres)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.post('/creategenre',auth,async(req,res)=>{
    try {
        let {name,image} = req.body;
        let newGenre = await createGenre(name,image)
        res.status(200).json(newGenre)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.put('/updategenre/:id',auth,async(req,res)=>{
    try {
        let{id}=req.params;
        let{name, image} = req.body
        let genreUpdate = await updateGenre(id,name,image)
        res.status(200).json(genreUpdate)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.delete('/deletegenre/:id',auth,async(req,res)=>{
    try {
        let{id}=req.params;
        let genreDelete = await deleteGenre(id)
        res.status(200).json(genreDelete)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

export default router
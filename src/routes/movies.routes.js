import { Router } from 'express';
import { createMovie, deleteMovie,  getAllMovies } from '../controllers/movies.controllers.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.get('/movies',auth,async(req,res)=>{
    try {
        let movies_series = await getAllMovies()
        res.status(200).json(movies_series)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.post('/createmovie', auth, async(req,res)=>{
    try {
        let {image, title, date, rating, genres} = req.body
        let newMovie = await createMovie(image, title, date, rating, genres)
        res.status(200).json(newMovie)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.put('/updatemovie/:id', auth, async(req,res)=>{
    try {
        let{id}=req.params
        let {image, title, date, rating, genres} = req.body
        let updateMovie = await updateMovie(id,image, title, date, rating, genres)
        res.status(200).json(updateMovie)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.delete('/deletemovie/:id',async(req,res)=>{
    try {
        let{id}=req.params
        let movieDelete = await deleteMovie(id)
        res.status(200).json(movieDelete)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

export default router
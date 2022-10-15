import { Router } from 'express';
import { createMovie, deleteMovie,  getAllMovies, getMovieById, updateMovie } from '../controllers/movies.controllers.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.get('/movies',auth,async(req,res)=>{
    try {
        let {name, genre, order}=req.query;
        let movies_series = await getAllMovies(name, genre, order)
        res.status(200).json(movies_series)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.get('/movies/:id',auth,async(req,res)=>{
    try {
        let {id} = req.params;
        let movies_series = await getMovieById(id)
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
        let movieUpdate = await updateMovie(id,image, title, date, rating, genres)
        res.status(200).json(movieUpdate)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.delete('/deletemovie/:id',auth,async(req,res)=>{
    try {
        let{id}=req.params
        let movieDelete = await deleteMovie(id)
        res.status(200).json(movieDelete)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

export default router
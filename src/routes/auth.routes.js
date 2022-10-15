import { Router } from 'express';
import { deleteUsers, getUsers, signIn, signUp } from '../controllers/auth.controllers.js';


const router = Router();

router.post('/auth/login', async(req,res)=>{
    try {
        let { email, password } = req.body;
        res.json(await signIn(email, password))
    } catch (error) {
        res.status(404).json(error.message)
    }
});

router.post('/auth/register',async (req,res)=>{
    try {
        let {name, email, password} = req.body
        res.json(await signUp(name, email, password))
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.get('/users',async(req,res)=>{
    try {
        res.status(200).json(await getUsers())
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.delete('/deleteuser/:id',async(req,res)=>{
    try {
        let {id} = req.params;
        res.status(200).json(await deleteUsers(id))
    } catch (error) {
        res.status(400).json(error.message)
    }
})
export default router



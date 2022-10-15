import { Router } from 'express';
import { signIn, signUp, refreshUser } from '../controllers/auth.controllers.js';
import auth from '../middlewares/auth.js';

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

router.post('/reload', auth, async (req,res) =>{
    try {
        let { id } = req.body;
        let user = refreshUser(id, req.user);
        res.json(user);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.get("/logout", (req, res) => {
    if (req.logout) req.logout();
    res.status(201).json({
      success: true
    })
  });

export default router



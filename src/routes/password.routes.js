import { Router } from 'express';
import { recoverPassword, updatePassword, changePassword } from '../controllers/password.controllers.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.post('/password', async(req,res)=>{
    try {
        let { email  } = req.body
        res.json(await recoverPassword(email))
    } catch(error){
        res.status(400).json(error.message)
    }
})

router.put('/password', async(req,res)=>{
    try {
        let { password, token } = req.body
        res.json(await updatePassword(password, token))
    } catch(error){
        res.status(400).json(error.message)
    }
})

router.put('/password/:id', auth, async(req,res)=>{
    try {
        let { oldPassword, newPassword } = req.body;
        let { id } = req.params;
        res.json(await changePassword(id, oldPassword, newPassword));
    } catch(error){
        res.status(401).json({ message : error.message })
    }
})

export default router;
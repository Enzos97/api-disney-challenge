import { compareSync, hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secret, expires, rounds } from '../auth.js';
import User from '../models/User.js';
import dotenv from "dotenv";
import sgMail from '@sendgrid/mail'

const image = 'https://res.cloudinary.com/techmarket/image/upload/v1665858102/share-default.14fadd993578b9916f855cebafb71e62_s05pm5.png'
const API_KEY = process.env.SENDGRID_API_KEY

sgMail.setApiKey(API_KEY)

dotenv.config()

export async function signIn(email, password) {
  let loginUser = await User.findOne({ where: { email } })

  if (!loginUser) throw new Error("Wrong password or email")
  if (!compareSync(password, loginUser.password)) throw new Error("wrong password or email")

  let token = jwt.sign({ User: loginUser }, secret, { expiresIn: expires });

  return { User: loginUser, token };
}


export async function signUp(name, email, password) {
  if (!name || !email || !password) throw new Error('You must complete the required fields')
  let findUser = await User.findAll({ where: { email } });

  if (findUser.length !== 0) throw new Error('There is already a User with this email')

  let hpassword = hashSync(password, Number.parseInt(rounds))
  let UserCreated = await User.create({ name, email, password: hpassword })
  let token = jwt.sign({ User: UserCreated }, secret, { expiresIn: expires });

  try{
    const msg={
      to: email,
      from: "techmarketpf@gmail.com",
      subject:"Successful Registration",
      text:"Welcome, you have successfully registered",
      html:`<h1>Welcome ${name} to Disney Api</h1><img src=${image} alt="" />`
    }
    await sgMail.send(msg);
    }catch(error){
      console.log(error)
  }

  return { User: UserCreated, token: token, msg: 'User create successfully' }
}

export async function getUsers(){
  let users = await User.findAll({})
  return users
}

export async function deleteUsers(id){
  let users = await User.destroy({where:{id}})
  return users
}
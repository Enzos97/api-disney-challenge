import { compareSync, hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secret, expires, rounds } from '../auth.js';
import User from '../models/User.js';
import dotenv from "dotenv";

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

  return { User: UserCreated, token: token, msg: 'User create successfully' }
}

export function refreshUser(id, User) {
  if (!User || User.id !== id) throw new Error("INVALID USER ID");
  if (!User.isactive) throw new Error("BANNED");
  else return User;
}
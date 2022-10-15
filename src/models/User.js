import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
const User = 
    sequelize.define('user', {
        name:{
            type: DataTypes.STRING,
            validate: {
                isAlpha: {
                  msg: "The name can only contain letters"
                },
                len: {
                  args: [2, 255],
                  msg: "The name must be at least two characters"
                }
            }
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                len: {
                  args: [6, 255],
                  msg: "The password must have at least 6 characters"
                }
            }
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                  msg: "The email must be a valid email"
                }
              }
        },
    })

    export default User
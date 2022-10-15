import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
const Movie_serie = 
    sequelize.define('movie_serie', {
        image:{
            type:DataTypes.STRING
        },
        title:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        date:{
            type:DataTypes.STRING
        },
        rating:{
            type:DataTypes.INTEGER,
            validate:{ min:1, max:5}
        }
    },{
        timestamps: false
})
export default Movie_serie
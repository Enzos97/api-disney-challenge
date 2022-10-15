import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
const Genre =
    sequelize.define('genre', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING
        }
    })

    export default Genre
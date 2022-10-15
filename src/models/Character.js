import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const Character =
  // defino el modelo
  sequelize.define('character', {
    image:{
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    years:{
      type: DataTypes.INTEGER
    },
    weight:{
      type: DataTypes.REAL
    },
    history:{
      type: DataTypes.TEXT
    },
  });

export default Character
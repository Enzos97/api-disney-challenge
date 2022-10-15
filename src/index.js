import app from './app.js';
import { sequelize } from './db.js'
import './models/Character.js'
import './models/Genre.js'
import './models/Movie_serie.js'
import './models/User.js' 
import './models/relations.js'

//setting
const PORT = process.env.PORT || 3001;

//Iniciamos Server
async function main() {
    try {
        await sequelize.sync({ force: false })
        app.listen(PORT, () => {
            console.log(`Server on port:${PORT}`)
        })
    } catch (error) {
        console.error('Unable to connect to the database', error.message)
    }
}
main()
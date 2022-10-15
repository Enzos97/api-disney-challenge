#Documentacion
--------------------------------------------------------------------------------------------------------------
En el .env se alojan los siguientes datos:

DB_USER=postgres
DB_PASSWORD=password
DB_DATABASE=apidisney
DB_DIALECT=postgres
DB_HOST=localhost
PORT=3001

Auth Config
AUTH_SECRET=authcodemaster
AUTH_EXPIRES=1d
AUTH_ROUNDS=10
SENDGRID_API_KEY=apikey

La key de sengrid no se puede subir a github por eso la omito.


A continuación, detallare el funcionamiento de cada endpoint con imágenes y compartiré el link del documento en Postman(esta informacion se encuentra mejor detallada en el pdf llamado documentacion api).
--------------------------------------------------------------------------------------------------------------
-Link al documento de Postman:  https://www.postman.com/technical-candidate-83856184/workspace/enzo/collection/20467146-a63ae1d6-899c-4442-bd99-9680e72934f1?action=share&creator=20467146

Endpoints:
----------
-AuthRoutes (rutas de autenticación para el usuario):
1- POST - ‘/auth/register’.
Permite crear usuarios, genera el token para poder utilizar el resto de endpoints y envia un mail de bienvenida.
Recibe por body “name”, “email”, “password”. Valida que no haya un usuario registrado con el mismo mail y encripta la password.

{
    "name":"enzo",
    "email":"enz997.ing.inf@gmail.com",
    "password": "123456"
}

Retorna en caso de éxito. 

{
    "User": {
        "id": 2,
        "name": "enzo",
        "email": "enz997.ing.inf@gmail.com",
        "password": "$2b$10$RNIFafZckS.0pkol96xKHOmtMDYpbB0VdUPZ2q2QyPG.IvVej9t/W",
        "updatedAt": "2022-10-15T18:38:33.048Z",
        "createdAt": "2022-10-15T18:38:33.048Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoyLCJuYW1lIjoiZW56byIsImVtYWlsIjoiZW56OTk3LmluZy5pbmZAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkUk5JRmFmWmNrUy4wcGtvbDk2eEtIT210TURZcGJCMFZkVVBaMnEyUXlQRy5JdlZlajl0L1ciLCJ1cGRhdGVkQXQiOiIyMDIyLTEwLTE1VDE4OjM4OjMzLjA0OFoiLCJjcmVhdGVkQXQiOiIyMDIyLTEwLTE1VDE4OjM4OjMzLjA0OFoifSwiaWF0IjoxNjY1ODU5MTEzLCJleHAiOjE2NjU5NDU1MTN9.OOAMgSiUgIwAfv4z3dD4W_b5KkzeQscsiflInVn2LA4",
    "msg": "User create successfully"
}

2- POST - ‘/auth/login’.
Permite loguear usuarios y genera token. 
Recibe por body ‘email’ y ‘password’. Valida la existencia del mail y compara la password recibida con la password encriptaba en la base de datos.

{
    "email":"enz997.ing.inf@gmail.com",
    "password":"123456"
}

Retorna en caso exitoso.

-Antes de seguir con el resto de enpoints es necesario autenticase con el token generado previamente:

-GenreRoutes (crud):
Permite crear, listar, editar y borrar géneros.
1- POST - ‘/creategenre’.
Permite crear géneros.
Recibe por body ‘name’ e ‘image’. Valida que el nombre no se repita.

{
    "name": "aventura",
    "image":"hola.jpeg"
}

Retorna en caso de éxito.

"Genre was created successfully!"

2- GET - ‘/genres’.
Permite listar géneros.
Si no hay géneros devuele un mensaje de ‘loading genres…’
Retorna en caso de éxito.

[
    {
        "id": 1,
        "name": "accion",
        "image": "hola.jpeg",
        "createdAt": "2022-10-15T00:10:37.276Z",
        "updatedAt": "2022-10-15T00:10:37.276Z"
    },
    {
        "id": 2,
        "name": "aventura",
        "image": "hola.jpeg",
        "createdAt": "2022-10-15T00:11:37.189Z",
        "updatedAt": "2022-10-15T00:11:37.189Z"
    },
    {
        "id": 3,
        "name": "terror",
        "image": "hola.jpeg",
        "createdAt": "2022-10-15T00:11:47.725Z",
        "updatedAt": "2022-10-15T00:11:47.725Z"
    },
    {
        "id": 4,
        "name": "comedia",
        "image": "hola.jpeg",
        "createdAt": "2022-10-15T00:12:07.945Z",
        "updatedAt": "2022-10-15T00:12:07.945Z"
    },
    {
        "id": 5,
        "name": "suspenso",
        "image": "hola.jpeg",
        "createdAt": "2022-10-15T00:13:02.635Z",
        "updatedAt": "2022-10-15T00:13:02.635Z"
    },
    {
        "id": 6,
        "name": "romantica",
        "image": "hola.jpeg",
        "createdAt": "2022-10-15T00:13:31.373Z",
        "updatedAt": "2022-10-15T00:13:31.373Z"
    },
    {
        "id": 7,
        "name": "animada",
        "image": "hola.jpeg",
        "createdAt": "2022-10-15T00:13:49.493Z",
        "updatedAt": "2022-10-15T00:13:49.493Z"
    },
    {
        "id": 8,
        "name": "fantasia",
        "image": "hola.jpeg",
        "createdAt": "2022-10-15T00:17:13.612Z",
        "updatedAt": "2022-10-15T18:56:31.748Z"
    }
]

3- GET - ‘/genres/:id’.
Permite buscar un género por id.
Recibe un ‘id’ por params. Si no hay géneros devuele un mensaje de ‘loading genres…’
Retorna en caso de éxito.

{
    "id": 2,
    "name": "aventura",
    "image": "hola.jpeg",
    "createdAt": "2022-10-15T00:11:37.189Z",
    "updatedAt": "2022-10-15T00:11:37.189Z"
}

3- PUT - ‘/updategenre/:id’.
Permite editar un género. Recibe params el ‘id’ del genero que se quiere editar y por body ‘name’ y ‘image’.

{
    "name": "fantasia",
    "image":"hola.jpeg"
}

Retorna en caso de éxito.

"Genre was updated successfully!"

4- DELETE - ‘/deletegenre/:id’.
Permite eliminar un genero. 
Recibe un ‘id’ por params.

"the genre was deleted!"

-MoviesRoutes (crud):
Permite crear, listar, buscar, filtrar, editar y borrar películas-series.
1- POST - ‘/createmovie’.
Permite crear Movies-seires.
Recibe por body ‘title’, ‘image’, ‘rating’, ‘date’ y ’genres’. Comprueba que no se repita el titulo ingresado y que exita el género.

{
    "title": "los vengadores",
    "image":"chau.jpeg",
    "rating": 5,
    "date": "2013",
    "genres": ["accion","aventura"]
}

"Movie was created successfully!"

2- GET - ‘/movies.
Devuelve el listado de películas solo con los atributos ‘id’, ‘title’, ‘image’.

[
    {
        "id": 2,
        "title": "alicia en el país de las maravillas",
        "image": "chau.jpeg"
    },
    {
        "id": 3,
        "title": "piratas del caribe 2",
        "image": "chau.jpeg"
    },
    {
        "id": 4,
        "title": "piratas del caribe 4",
        "image": "chau.jpeg"
    },
    {
        "id": 5,
        "title": "piratas del caribe 5",
        "image": "chau.jpeg"
    },
    {
        "id": 7,
        "title": "los vengadores",
        "image": "chau.jpeg"
    }
]

3- GET - ‘/movies/id’.
Devuelve el detalle de la película cuando se le envía un ‘id’ valido por params. Además, se muestran los modelos relacionados como Genres y Characters.

{
    "id": 2,
    "image": "chau.jpeg",
    "title": "alicia en el país de las maravillas",
    "date": null,
    "rating": 3,
    "genres": [
        {
            "id": 2,
            "name": "aventura",
            "image": "hola.jpeg"
        },
        {
            "id": 4,
            "name": "comedia",
            "image": "hola.jpeg"
        },
        {
            "id": 8,
            "name": "fantasia",
            "image": "hola.jpeg"
        }
    ],
    "characters": [
        {
            "id": 2,
            "name": "el sombrero",
            "image": "el_sombrero.jpeg"
        }
    ]
}

4- GET - ‘/movies?querys=querys’.
Busca por nombre, filtra por genero y ordena de manera ascendente o descendente según el date (año de creación). Los parametros son recibidos por query y son combinables, en caso de no recibir parámetros trae la lista de movies.

http://localhost:3001/movies?name=pi&genre=com&order=ASC

[
    {
        "id": 1,
        "title": "piratas del caribe",
        "image": "chau.jpeg",
        "date": "2003",
        "genres": [
            {
                "id": 4,
                "name": "comedia"
            }
        ]
    },
    {
        "id": 4,
        "title": "piratas del caribe 4",
        "image": "chau.jpeg",
        "date": "2015",
        "genres": [
            {
                "id": 4,
                "name": "comedia"
            }
        ]
    },
    {
        "id": 5,
        "title": "piratas del caribe 5",
        "image": "chau.jpeg",
        "date": "2017",
        "genres": [
            {
                "id": 4,
                "name": "comedia"
            }
        ]
    },
    {
        "id": 3,
        "title": "piratas del caribe 2",
        "image": "chau.jpeg",
        "date": null,
        "genres": [
            {
                "id": 4,
                "name": "comedia"
            }
        ]
    }
]

5- PUT - ‘/updatemovie’.
Permite editar Movies-seires.
Recibe por body ‘title’, ‘image’, ‘rating’, ‘date’ y ’genres’ e ‘id’ por params. 

{
    "title": "piratas del caribe 5",
    "image":"chau.jpeg",
    "rating": 2,
    "date": "2017",
    "genres": ["comedia","aventura"]
}

"Movie was updated successfully!"

6- DELETE - ‘/deletemovie’.
Permite borrar Movies-seires.
Recibe por params el ‘id’ y borra.

http://localhost:3001/deletegenre/9

"the genre was deleted!"

-CharacterRoutes (crud):

Permite crear, listar, buscar, filtrar, editar y borrar personajes.

1- POST - ‘/createcharacter’.
Permite crear permite crear personajes.
Recibe por body ‘name, ‘image’, ‘years, ‘weight’, ‘history’ y ‘movies_series’. Comprueba que no se repita el nombre ingresado y que exita la película o serie.

{
    "name": "capitan america",
    "image":"cap.jpeg",
    "years": 100,
    "weight": 75,
    "history":"ES el capitan de los vengadores",
    "movies_series":["los vengadores"]
}

2- GET - ‘/characters’.
Permite crear listar personajes solo con los atributos ‘name’ e ‘image’.

[
    {
        "id": 3,
        "name": "johnny depp",
        "image": "johnny_depp.jpeg"
    },
    {
        "id": 1,
        "name": "jack sparrow",
        "image": "jack_sparrow.jpeg"
    },
    {
        "id": 2,
        "name": "el sombrero",
        "image": "el_sombrero.jpeg"
    },
    {
        "id": 5,
        "name": "capitan america",
        "image": "cap.jpeg"
    }
]

3- GET - ‘/characters/:id’.
Permite mostrar el detalle del personaje, cuyo ‘id’ es requerido por params. Muestra todos los atributos incluyendo las relaciones con la tabla ‘Movie_serie’.

{
    "id": 2,
    "image": "el_sombrero.jpeg",
    "name": "el sombrero",
    "years": 65,
    "weight": 70,
    "history": "Este personaje también se conoce como el Sombrerero Loco",
    "createdAt": "2022-10-15T00:27:21.611Z",
    "updatedAt": "2022-10-15T21:35:54.739Z",
    "movie_series": [
        {
            "id": 2,
            "image": "chau.jpeg",
            "title": "alicia en el país de las maravillas",
            "date": "2015",
            "rating": 3
        }
    ]
}

4- GET - ‘/characters?querys=querys’.
Busca por nombre, filtra por años, por id de películas y por peso. Los parámetros son recibidos por query y son combinables, en caso de no recibir parámetros trae la lista de characters.

http://localhost:3001/characters?name=jo&age=59&movies=3&weight=70

[
    {
        "id": 3,
        "name": "johnny depp",
        "image": "johnny_depp.jpeg",
        "years": 59,
        "weight": 70,
        "movie_series": [
            {
                "id": 3,
                "title": "piratas del caribe 2"
            }
        ]
    }
]

5- PUT - ‘/updatecharacter/:id’.

Permite editar Chracters.
Recibe por body los datos que desea modificar, como por ejemplo ‘name’ y un ‘id’ por params. 

http://localhost:3001/updatecharacter/1

{
    "name": "jack sparrow",
    "image":"jack_sparrow.jpeg",
    "years": 59,
    "weight": 72,
    "history":"capitan del perla negra",
    "movies_series":["piratas del caribe"]
}

"Character was updated succesfully"

6- DELETE - ‘/deletecharacter/:id’.
Permite borrar Characters.
Recibe un ‘id’ por params.

http://localhost:3001/deletecharacter/4
 
"The character was deleted!"

----------------------------------------------------------------------------------------------------------------






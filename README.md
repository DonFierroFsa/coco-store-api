BackEnd para gestionar el control de stock y vendedores de una tienda Fisica, y anmpliable a convertirse en un e-Comerce.
Se a utilizado Node.js. express, mongoDb, ademas de diferentes librerias como bCrypt para la proteccion de contrseñas.
JWT se ha utlizado para la persistencia de los inicios de sesion de los diferentes vendedores o gerentes que cuentan con permisos especiales al asignarle un role:"Admin".
Los modelos de usuarios, asi como los del producto fueron creados con "mongoose"
La base de adtos conectada a MongoDb, asistiendo funcionalidades con express-session y connect-mongodb-session. Una base de datos no relacionales puede parecer un impedimento o desventaja, pero a favor, el que sea flexible permite la escalabilidad de los modelos, ademas de la adpatacion a las necesidades de cada CLIENTE.
Con express-validator se verifican o validan las entradas/carga de datos, para evitar accidentes o errores, que puedam devengar en algo mas complejo.

Como funcionalidad extra. se ha añadido la conexion a una API que ofrece datos actualizado del dolar CCL, para poder actulizar los precios de forma autmatica en caso de que el cliente asi lo prefiera.

Datos del admin alojado en MongoDb =>
{"role":
"Admin",
"password":
"Pasword1",
"cellPhone":
5493704094513,
"name":
"coco"}

"casinoData": [
{
"_id": "67006683a41ea4bc03cc7c5d",
"bonus": 50,
"nameCasino": "maxi casino",
"cashLoadLimit": 5000,
"createdAt": "2024-10-04T22:04:51.588Z",
"updatedAt": "2024-10-04T22:04:51.588Z",
"__v": 0
}
]
En la ruta principal se encuentra un pobre form, donde probar las funcionalidades login/logout

// server/models/todo.js

// Incluímos a Mongoose para poder interactuar con MongoDB
var mongoose =        require('mongoose')
    , Schema =          mongoose.Schema;

// Creamos el Schema, que vendría a ser la estructura de cada documento
var todoSchema = new Schema ({
    title: String,
    date: Date
});

// Compilamos el Schema
var Todo = mongoose.model('Todo', todoSchema);

// Creamos las acciones para interactuar con la base de datos
module.exports = {
    createTodo: function(todo, callback) {
        // Creamos un nuevo objeto que lleva como información 
        //el parametro "todo" de la función.
        var newTodo = new Todo(todo); 
        // Ahora guardemos en la base de datos el objeto.
        newTodo.save(function(err, response) {
            if(err) {
                // Si hay un error, devolvemos el callback 
                //con el error devuelto.
                callback(err, null);
            } else {
                 // Si no hay error, devolvemos el callback 
                 //sin errores y con la respuesta de la base de datos.
                callback(null, response)
            }
        });
    },
    readTodo: function(callback) {
        // Hacemos una búsqueda sin parametros para que nos devuelva todos los resultados.
        Todo.find().exec(function(err, response) {
            if(err) {
                callback(err, null); // Si hay un error, devolvemos el callback con el error devuelto.
            } else {
                callback(null, response) // Si no hay error, devolvemos el callback sin errores y con la respuesta de la base de datos.
            }
        });
    },
    updateTodo: function(id, todo, callback) {
        //Buscamos por ID y actualizamos la información con lo contenido en el parametro "todo".
        Todo.findByIdAndUpdate(id, todo, function(err, response) {
            if(err) {
                callback(err, null); // Si hay un error, devolvemos el callback con el error devuelto.
            } else {
                callback(null, response) // Si no hay error, devolvemos el callback sin errores y con la respuesta de la base de datos.
            }
        });
    },
    removeTodo: function(id, callback) {
        // Buscamos por ID, y si lo encuentra lo va a eliminar.
        Todo.findByIdAndRemove(id, function(err, response) {
            if(err) {
                callback(err, null); // Si hay un error, devolvemos el callback con el error devuelto.
            } else {
                callback(null, response) // Si no hay error, devolvemos el callback sin errores y con la respuesta de la base de datos.
            }
        });
    }
};
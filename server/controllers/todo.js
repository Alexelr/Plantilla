// server/controllers/todo.js

//Incluímos nuestro modelo para poder interactuar con él
var Todo = require('../models/todo'); // Nota: No necesitamos especificar extensión si es .js

// Escribimos nuestras funciones
module.exports = {

    newTodo: function(req, res, next) {
        if(!req.body.title) { // Validamos que nos hayan enviado el título del To-Do
            // Si no nos enviaron el título, regresamos un error 400
            res.json(400, {
                status: "ERR",
                message: "No se incluyó title para el To-Do"
            });
        } else {
            // Si todo está correcto, le pasamos los datos al Model para que lo inserte en la base de datos.
            Todo.createTodo(req.body, function(err, response) {
                if(err) { // Si tenemos un error, devolvemos al cliente el error.
                    res.json({
                        status: "ERR",
                        message: "Ha ocurrido un error",
                        error: err
                    });
                } else { // Si no tenemos errores, devolvemos un mensaje satisfactorio.
                    console.log('este es el body',req.body);
                    res.json({
                        
                        status: "OK",
                        message: "Se ha guardado con éxito"
                    });
                }
            });
        }
    },
    updateTodo: function(req, res, next) {
        if(!req.body.id) {
            res.json(400, {
                status: "ERR",
                message: "No se especificó el ID a modificar"
            });
        } else if (!req.body.title) {
            res.json(400, {
                status: "ERR",
                message: "No se incluyó title para el To-Do"
            });
        } else {
            // Si todo está correcto, le pasamos los datos al Model para que haga el update en la base de datos.
            Todo.updateTodo(req.body.id, req.body, function(err, response) {
                if(err) { // Si tenemos un error, devolvemos al cliente el error.
                    res.json({
                        status: "ERR",
                        message: "Ha ocurrido un error",
                        error: err
                    });
                } else { // Si no tenemos errores, devolvemos un mensaje satisfactorio.
                    res.json({
                        status: "OK",
                        message: "Se ha actualizado con éxito"
                    });
                }
            });
        }
    },
    listTodo: function(req, res, next) {
        Todo.readTodo(function(err, response) {
            if(err) { // Si tenemos un error, devolvemos al cliente el error.
                res.json({
                    status: "ERR",
                    message: "Ha ocurrido un error",
                    error: err
                });
            } else { // Si no tenemos errores, devolvemos un mensaje satisfactorio.
                res.json({
                    status: "OK",
                    data: response
                });
            }
        });
    },
    deleteTodo: function(req, res, next) {
        if(!req.params.id) {
            res.json(400, {
                status: "ERR",
                message: "No se especificó el ID a eliminar"
            });
        } else {
            Todo.removeTodo(req.params.id, function(err, response) {
                if(err) { // Si tenemos un error, devolvemos al cliente el error.
                    res.json({
                        status: "ERR",
                        message: "Ha ocurrido un error",
                        error: err
                    });
                } else { // Si no tenemos errores, devolvemos un mensaje satisfactorio.
                    res.json({
                        status: "OK",
                        message: "Se ha eliminado con éxito"
                    });
                }
            });
        }
    }

};
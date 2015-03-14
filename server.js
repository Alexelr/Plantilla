var express=require('express');//llamamos express
   
var bodyParser=require('body-parser');

//configuramos la app para use bdy-parser 
//para manejar peticiones POst
var app = module.exports = express();

app.use(bodyParser.json('application/json'));
//surtir archivs estaticos 
app.use(express.static(__dirname + '/public'));



var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/introduccionMean'); // Conexión a la base de datos


var port =  3000|| process.env.PORT ;



//definimos rutas 
var router=express.Router();//creamos instancias de router de express

//controlador Todo
var todo_controller=require('./server/controllers/todo');
//ruta principal

router.get('/',function(req,res){
	res.send('hello world');
});

// Si recibes una llamada en /api/todo realiza las siguientes acciones:
router.route('/todo')
	.get(todo_controller.listTodo)
	.post(todo_controller.newTodo)
	.put(todo_controller.updateTodo);

// Si te pasan un parametro vía GET después de /todo, realiza las siguientes acciones:
router.route('/todo/:id')

    .delete(todo_controller.deleteTodo);



//indicamos a express que trabajaremos con / como base 
//todo lo dinamico se servira con url base /api
app.use('/api',router);
//app.use('/',router);
//INICIAMOS EL SERVER


app.listen(port);

//DEBUG EN CONSOLA
//9139
console.log('ejecutamos en el puerto '+port);
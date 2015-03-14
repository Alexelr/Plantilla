var request = require('supertest');
var api = require('../server.js');
var host = process.env.API_TEST_HOST || api;
request = request(host);
describe('Prueba  al server ', function() {
	it('deberia conectar y obtener un ok con get ',function(){

	
	request
		.get('/api/todo')
		.set('Accept', 'application/json')
		.send()
		.expect(201)
		.expect('Content-Type', /application\/json/)
		.end();
	});

});

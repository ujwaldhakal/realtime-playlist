import express from 'express'
import PlayerController from './app/controllers/PlayerController'

let app = express();
let server = require('http').createServer(app);
let nunjucks = require('nunjucks');
let io = require('socket.io')(server);
let playerController = new PlayerController();
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.get('/', (req, res) => {
    playerController.index(req, res)
});

app.get('/add', (req, res) => {
    playerController.addMusicView(req, res)
});
app.get('/add/video', (req, res) => {
    playerController.addMusic(req, res)
});





app.get('/remove/video', (req, res) => {
    playerController.deleteMusic(req, res)
});
io.on('connection',function (client) {
    client.on('add',function (data) {
        io.emit('refreshList',data);
    });





    client.on('removeVideo',function (data) {
        io.emit('refreshList',data);
    });
});
server.listen(3000);







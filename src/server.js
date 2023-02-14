const ContenedorSql = require('./ContenedorSql.js');
const { mysql, sqlite3 } = require('../config/configSQL.js');
const product = new ContenedorSql(mysql);
const chat = new ContenedorSql(sqlite3);
const axios = require("axios"); 

crearTablas = async () => {
    await product.crearTabla();
    await chat.crearTablaMessage();
}

crearTablas();

const express = require('express');
const http = require('http');
const router = require('./router');
const app = express();

const { Server } = require('socket.io');
const { engine } = require('express-handlebars');
const Contenedor = require('./Contenedor.js')

const server = http.createServer(app);
const io = new Server(server);

//const product = new Contenedor("productos.json");
//const chat = new Contenedor("chat.json")

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.use("/", router);

app.set('views', './views');
app.set('view engine', 'hbs');

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: './views/layouts',
}))

io.on('connection', async (socket) => {
    console.log('🟢 Usuario conectado')
    
    //const productos = await product.getAllProducts();
    //socket.emit('bienvenidoLista', productos )
    
    await axios.get('http://localhost:8080/productos-test')
    .then(function (response) {
        socket.emit('bienvenidoLista', response.data)
    })
    .catch(function (error) {
        console.log(error);
    })
    
    const mensajes = await chat.getAllMessages();
    socket.emit('listaMensajesBienvenida', mensajes)
    
    socket.on('nuevoMensaje', async (data) => {
        await chat.saveMessage(data);
        io.sockets.emit('listaMensajesActualizada', await chat.getAllMessages())
    })

    socket.on('productoAgregado', async (data) => {
        console.log('Alguien presionó el click')
        await product.save(data);
        
        const productos = await product.getAllProducts();
        io.sockets.emit('listaActualizada', productos);
    })
    
    socket.on('disconnect', () => {
        console.log('🔴 Usuario desconectado')
    })
    
})

const PORT = 8080;
server.listen(PORT, () => {
    console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`)
})

server.on('error', (err) => console.log(err))
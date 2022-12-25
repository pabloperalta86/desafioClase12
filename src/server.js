const express = require('express');
const http = require('http');
const router = require('./router');
const app = express();

const { Server } = require('socket.io');
const { engine } = require('express-handlebars');
const Productos = require('./Productos.js')

const server = http.createServer(app);
const io = new Server(server);

//const contenedor = new Contenedor("productos.json");
//const chat = new Contenedor("chat.json")
const product = new Productos()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const chat = [];
app.use("/", router);

app.set('views', './views');
app.set('view engine', 'hbs');

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: './views/layouts',
    partialsDir: './views/partials'
}))

io.on('connection', (socket) => {
    console.log('🟢 Usuario conectado')
    
    const productos = product.getAll();
    socket.emit('bienvenidoLista', productos )
    
    const mensajes = chat;
    socket.emit('listaMensajesBienvenida', mensajes)
    
    socket.on('nuevoMensaje', (data) => {
        chat.push(data);
        io.sockets.emit('listaMensajesActualizada', chat)
    })

    socket.on('productoAgregado', (data) => {
        console.log('Alguien presionó el click')
        product.crear(data);
        
        const productos = product.getAll();
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
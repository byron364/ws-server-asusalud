const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Ruta para probar que el servidor está vivo
app.get('/', (req, res) => {
    res.send('Servidor WebSocket está activo 🚀');
});

// Manejo de conexiones WebSocket
wss.on('connection', (ws) => {
    console.log('Cliente conectado');
    ws.send('Conexión exitosa al servidor WebSocket 🎉');

    ws.on('message', (message) => {
        console.log('Mensaje recibido:', message);
        ws.send(`Servidor recibió: ${message}`);
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

// Usamos el puerto proporcionado por Render
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});

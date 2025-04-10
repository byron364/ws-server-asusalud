const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Inicializar Express
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Permitir todas las conexiones (puedes ajustar esto para más seguridad)
    }
});

// Cuando un cliente se conecta
io.on('connection', (socket) => {
    console.log('🔌 Cliente conectado:', socket.id);

    socket.on('llamar-cita', (data) => {
        console.log('📢 Evento recibido:', data);
        // Emitimos a todos los clientes conectados
        io.emit('cita-llamada', data);
    });

    socket.on('disconnect', () => {
        console.log('❌ Cliente desconectado:', socket.id);
    });
});

// Puerto del servidor
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`✅ Servidor WebSocket corriendo en http://localhost:${PORT}`);
});

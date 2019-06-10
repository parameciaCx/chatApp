const io = require('./server.js').io;

const users = {};
module.exports = function(socket) {
	console.log(socket.id);

	socket.on('new-user', (userName) => {
		users[socket.id] = userName;
		socket.broadcast.emit('user-joined', userName);
	});

	socket.on('send-message', (message) => {
		socket.broadcast.emit('append-message', { msg: message, id: users[socket.id] });
	});
};

const socket = io('http://localhost:3231');

const display = document.getElementById('root');
const cont = document.getElementById('msgContainer');
const inp = document.getElementById('msgInput');

const userName = prompt('Enter display name: ');
appendMsg('Connected to chatroom.');
socket.emit('new-user', userName);

socket.on('append-message', (data) => {
	appendMsg(`${data.id}: ${data.msg}`);
});

socket.on('user-joined', (user) => {
	appendMsg(`User ${user} connected.`);
});

cont.addEventListener('submit', (e) => {
	e.preventDefault();
	appendMsg(`${userName}: ${inp.value}`);
	socket.emit('send-message', inp.value);
	inp.value = '';
});

function appendMsg(message) {
	const msg = document.createElement('div');
	msg.innerText = message;
	display.append(msg);
}

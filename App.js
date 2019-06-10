const socket = io('http://localhost:3231');

const display = document.getElementById('root');
const cont = document.getElementById('msgContainer');
const inp = document.getElementById('msgInput');

const userName = prompt('Enter display name: ');
selfMsg('Connected to chatroom.');
socket.emit('new-user', userName);

socket.on('append-message', (data) => {
	appendMsg(`${data.id}: ${data.msg}`);
});

socket.on('user-joined', (user) => {
	appendMsg(`User ${user} connected.`);
});

cont.addEventListener('submit', (e) => {
	e.preventDefault();
	selfMsg(`${inp.value}`);
	socket.emit('send-message', inp.value);
	inp.value = '';
});

function appendMsg(message) {
	const msg = document.createElement('div');
	msg.innerText = message;
	display.append(msg);
}

function selfMsg(message) {
	const msg = document.createElement('div');
	msg.style.cssText = 'display: flex; justify-content: flex-end;background-color:aquamarine';
	msg.innerText = message;
	display.append(msg);
}

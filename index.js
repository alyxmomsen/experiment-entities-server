const EventEmitter = require('events'); 

const io = require("socket.io")(3003, {
	cors: {
		origin: [
			'http://85.234.106.173:3000',
		]
	}
});

// const eventMessageUpdated = new Event('message_updated');

// eventMessageUpdated.

const eventEmiter = new EventEmitter();


// console.log({eventMessageUpdated});

const db = (() => {

	const messages = [];
	
	const setMessage = function (Id, value) {
		
		console.log({ test: {Id , value} });

		if (Id === undefined || Id === null || Id === Infinity || value === undefined) return false;

		messages.push({
			Id,
			value
		});

		eventEmiter.emit('message_updated');

		return true;
	}

	const getMessages = function () {
		return [...messages];
	}

	return {
		setMessage,
		getMessages ,
	}
})();




console.log({messages:db.getMessages() , db});

io.on('connection', (socket) => {
	
	socket.on('message', (payload) => {
		console.log({payload});
		
		const reportWithMessagesId = [];
		
		console.log(typeof payload);
		
		payload.messages.map(message => {

			const result = db.setMessage(message.Id , message.value);
			
			if (result) {
				reportWithMessagesId.push(message.Id);	
			}
			
		})
		
		
		console.log(db.getMessages());
		socket.emit('message report', reportWithMessagesId);
		
	});

	eventEmiter.on('message_updated', () => {
		socket.emit('message_updated' , db.getMessages())
	});
	
});


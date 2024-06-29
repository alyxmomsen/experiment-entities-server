const express = require('express');

const app = express();



app.get('/' , async (res , req) => {

	
	req.send('hello world foo bar baz');
}
);


const PORT = 3030 ;

app.listen(PORT , () => {

	console.log('server running on port = ' + PORT);
}
);


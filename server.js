const app = require('express')();
const fs = require('fs');

app.listen(1337, () => {
	console.log('rhyming at 1337')
})

app.post('/pic', (req, res, next) => {
	console.log('Request incoming')
	var imageThing = new Buffer(0);


	req.on('data', (chunk) => {
		imageThing = Buffer.concat([imageThing, chunk])
	})

	req.on('end', () => {
		fs.writeFile('./kate.jpg', imageThing)
	})

})

app.get('/pic', (req, res, next) => {
	res.sendFile(__dirname + '/kate.jpg');
})

const tessel = require('tessel');
const av = require('tessel-av');
const http = require('http');

const camera = new av.Camera();
const takePicture = camera.capture();

takePicture.on('data', (image) => {
	console.log('taking picture');

	const request = http.request({
		hostname: '172.16.17.53',
		port: 1337,
		path: '/pic',
		method: 'POST',
		headers: {
			'Content-Type': 'image/jpg',
			'Content-Length': image.length
		}
	})

	request.write(image)

})

takePicture.on('error', (err) => console.error(err))

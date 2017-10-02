'use strict';

// Import the interface to Tessel hardware
const tessel = require('tessel');
const av = require('tessel-av');
const http = require('http');
var accel = require('accel-mma84').use(tessel.port['B']);

const camera = new av.Camera();
const takePicture = camera.capture();


// Initialize the accelerometer.
accel.on('ready', function () {
    // Stream accelerometer data
  accel.on('data', function (xyz) {
    // console.log(
    //   'x:', xyz[0].toFixed(2),
    //   'y:', xyz[1].toFixed(2),
    //   'z:', xyz[2].toFixed(2));

      if (xyz[1] > 0.1){

        takePicture.on('data', (image) => {
          console.log('taking picture');

          const request = http.request({
            hostname: '172.16.22.199',
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
      }
  });

});

accel.on('error', function(err){
  console.log('Error:', err);
});

module.exports = {
  accel: accel
}

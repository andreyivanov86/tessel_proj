'use strict';

// Import the interface to Tessel hardware
const tessel = require('tessel');
const av = require('tessel-av');
const http = require('http');

var accel = require('accel-mma84').use(tessel.port['B']);

// Initialize the accelerometer.
accel.on('ready', function () {
    // Stream accelerometer data
  accel.on('data', function (xyz) {
    console.log(
      'x:', xyz[0].toFixed(2),
      'y:', xyz[1].toFixed(2),
      'z:', xyz[2].toFixed(2));

      if (xyz[1] > 0.1){
    console.log('YAY')
      }
  });

});

accel.on('error', function(err){
  console.log('Error:', err);
});

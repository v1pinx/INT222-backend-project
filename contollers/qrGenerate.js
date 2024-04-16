const QRCode = require('qrcode');
const { createCanvas } = require('canvas');
const fs = require('fs');

// URL to encode as QR code
const url = 'https://www.google.com';

// Create a canvas
const canvas = createCanvas(200, 200);
const ctx = canvas.getContext('2d');

// Generate QR code and draw it on the canvas
QRCode.toCanvas(canvas, url, (err) => {
  if (err) throw err;

  // Save the canvas as an image file (optional)
  const out = fs.createWriteStream('qrcode.png');
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on('finish', () => console.log('QR code saved as qrcode.png'));

  // You can also use the canvas directly in your application
  // For example, if you are using Express.js:
  // res.set('Content-Type', 'image/png');
  // canvas.createPNGStream().pipe(res);
});

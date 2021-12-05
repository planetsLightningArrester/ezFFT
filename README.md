# ezFFT - Node JS
Easy as fun

```Javascript
let fft = require("ezfft").fft;
let ifft = require("ezfft").ifft;
// import { fft, ifft } from "ezfft"; // Or import on ES5+

...

let data = fft(signal, fs);    // OMG ITS EZ AS F*
console.log(data.frequency.amplitude);  // Amplitude axis
console.log(data.frequency.phase);      // Phase axis
console.log(data.frequency.frequency);  // Frequency axis
```
Whereas ```data``` has the following properties.

```Javascript
data = {
    // Time domain data
    time: {
        realPart: [],   // Real part
        imagPart: [],   // Imaginary part
        time: []        // Time axis
    },
    // Frequency domain data
    frequency:{
        realPart: [],	// FFT real part
        imagPart: [],	// FFT imaginary part
        amplitude: [],  // Amplitude module
        phase: [],      // Phase [rad]
        frequency: []   // Frequency axis [Hz]
    },
    fs: fs,             // Sample rate in Hz
    samplingTime: st    // Sampling time in seconds
}
```

### Usage
```Javascript
let fft = require('ezfft').fft;
let ifft = require('ezfft').ifft;

let signal = [];    // My awesome signal
let fs = 1000;      // My awesome sample rate

let f = 20;         // My signal's awesome frequency
for(let t = 0; t < 1; t += 1/fs) {
    signal.push(3*Math.sin(2*Math.PI*f*t));   // Let's make some sin ;-) (oh yeah go with it)
}

let data = fft(signal, fs);    // Returns the whole signal with frequency and time domain axis
data = ifft(data.frequency.amplitude, data.frequency.frequency); // Get the time from frequency domain

```

HELL YEAH! So easy. If you want an easy way to plot your data in the browser, go to the bonus at the end of this readme.

### Install
    npm i ezfft

### FFT
+ ***`fft (signal, fs, imagPart = 0, ignoreFftAmplitudesLowerThan = 1e-3)`***
+ **Input**
    - *signal:* Time signal [Array]
    - *fs:* Sample frequency (Hz) [Array]
    - **[Optional]** *imagPart:* Imaginary part of the signal (if any) [Array]
    - **[Optional]** *ignoreFftAmplitudesLowerThan:* Threshold to make fft value equals to zero [Value]
+ **Output**
    - *data:* Data object [Object]

### IFFT
+ ***`ifft(amplitude, frequency, phase = 0, fftRealPart = 0, fftImagPart = 0, ignoreImagAmplitudesLowerThan = 1e-3)`***
+ **Input**
    - *amplitude:* Amplitude axis [Array]
    - *frequency:* Frequency axis (Hz) [Array]
    - **[Optional]** *phase:* Phase axis (if any) [Array]
    - **[Optional]** *fftRealPart:* Real part of FFT (overrides the parameters *amplitude* and *phase*) [Array]
    - **[Optional]** *fftImagPart:* Imaginary part of FFT (overrides the parameters *amplitude* and *phase*) [Array]
    - **[Optional]** *ignoreImagAmplitudesLowerThan:* Threshold to make imag value equals to zero [Value]
+ **Output**
    - *data:* Data object [Object]

### **[BONUS]** Plot your data with express and socket.io in 3 steps!
Install `express`
    
    npm install express
Install `socket.io`

    npm install socket.io

Create a `index.html`. You can change the your graph size below.
```HTML
<html>

<head>
    <title>Data display</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.dev.js"></script>
</head>

<body>
    <!-- Change the size below -->
    <canvas id="time" width="600" height="400"></canvas>   
    <canvas id="fft" width="600" height="400"></canvas>
    <script>

        let ctxTime = document.getElementById('time').getContext('2d');
        let time = new Chart(ctxTime, {
            type: 'line',
            data: {
                label: "Time (s)",
                labels: [1, 2, 3, 4],
                datasets: [{
                    label: "Signal (Unit)",
                    fill: false,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    data: [12, 9, 13, 13]
                }]
            },
            options: {
                animation: {
                    duration: 0
                },
                hover: {
                    animationDuration: 0
                },
                responsiveAnimationDuration: 0,
                responsive: false,
                title: {
                    display: true,
                    text: "Sensors"
                },
                elements: {
                    point: {
                        radius: 0
                    }
                }
            }
        });
        let ctxFFT = document.getElementById('fft').getContext('2d');
        let fft = new Chart(ctxFFT, {
            type: 'line',
            data: {
                label: "Frequency (Hz)",
                labels: [1, 2, 3, 4],
                datasets: [{
                    label: "Acceleration (mg)",
                    fill: false,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    data: [12, 9, 13, 13]
                }]
            },
            options: {
                animation: {
                    duration: 0
                },
                hover: {
                    animationDuration: 0
                },
                responsiveAnimationDuration: 0,
                responsive: false,
                title: {
                    display: true,
                    text: "Sensor"
                },
                elements: {
                    point: {
                        radius: 0
                    }
                }
            }
        });

        let socket = io('http://localhost:8013');

        socket.on("data", function(data, _time){
            time.data.labels = data.time.time;
            time.data.datasets[0].data = data.time.realPart;
            fft.data.labels = data.frequency.frequency;
            fft.data.datasets[0].data = data.frequency.amplitude;
            time.update();
            fft.update();
        });
    </script>
</body>

</html>

```

Create a `main.js` file with the content below and run it with `node main.js`.
And access by your browser the `localhost:8013`

```Javascript
// npm install ezfft
let fft = require("ezfft").fft;
// import { fft } from "ezfft";

// npm install express
var express = require('express');
var appExpress = express();
var http = require('http').Server(appExpress);

/*Express configuration*/
appExpress.use("/", express.static(__dirname + "/"));

appExpress.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');    // Name of your local web page
});

http.listen(8013, function () {
    console.log('With your browser, access "localhost:8013"');
});

// npm install socket.io
var io = require('socket.io')(http);

/*Socket configuration*/
io.on('connection', function (socket) {
    
    console.log("LESGO");

    setInterval(function () {
        let signal = [];        // Array with the Y axis (amplitude in time)
        let time = [];          // Array with the X axis (time)

        let data;
        
        let f = 60;             // Your signal frequency
        let fs = 1000;          // Your sample rate
        let samplingTime = 1;   // Period that the signal was sampled

        for(let t = 0; t < samplingTime; t += 1/fs){
            signal.push(180*Math.sin(2*Math.PI*f*t) + 20*Math.sin(2*Math.PI*2*f*t) + 2*Math.sin(2*Math.PI*3*f*t));  // The generated signal
            time.push(t);                  //Append time axis
        }

        data = fft(signal, fs);   // Get signal's FFT
        
        socket.emit("data", data);   // Send data to Browser

    }, 2000);       // Update rate in sec
});

```

### LICENSE
It all is just a wrap to Project Nayuki (MIT License). Thank you so much for doing this in many languages including JS.
`https://www.nayuki.io/page/free-small-fft-in-multiple-languages`

Free FFT and convolution (JavaScript)

Copyright (c) 2017 Project Nayuki. (MIT License)
https://www.nayuki.io/page/free-small-fft-in-multiple-languages

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:
- The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.
- The Software is provided "as is", without warranty of any kind, express or
  implied, including but not limited to the warranties of merchantability,
  fitness for a particular purpose and noninfringement. In no event shall the
  authors or copyright holders be liable for any claim, damages or other
  liability, whether in an action of contract, tort or otherwise, arising from,
  out of or in connection with the Software or the use or other dealings in the
  Software.

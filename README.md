# ezFFT - Node JS
Easy as fun

```Javascript
let fft = require('ezfft').fft;
...
[amplitude, frequency] = fft(signal, fs);    //OMG ITS EZ AS F*

```

### Usage
```Javascript
let fft = require('ezfft').fft;

let signal = [];    //My awesome signal
let fs = 1000;      //My awesome sample rate

let f = 20;         //Yours signal awesome frequency
for(let t = 0; t < 1; t += 1/fs){
    signal.push(3*Math.sin(2*Math.PI*f*t));   //Let's make some sin ;-) (oh yeah go with it)
}

let amplitude = [];     //Array with the Y axis (amplitude)
let frequency = [];     //Array with the X axis (frequency)

[amplitude, frequency] = fft(signal, fs);    //OMG ITS EZ AS F*

```

HELL YEAH! So easy. If you want a easy way to plot your data in the browser, go to bonus at the end of this readme

### Install
`npm i ezfft`

### TODO
IFFT not implemented yet cuz I'm dumb

### Parameters
+ **Input**
- *signal:* Time signal
- *fs:* Sample frequency (Hz)
+ **Output**
- *amplitude:* Amplitude of each frequency
- *frequency:* Frequency of each amplitude (Hz)

### Plot your data with express and socket.io in 3 steps (Bonus)
Install `express`
`npm install express`
Install `socket.io`
`npm install socket.io`

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

        socket.on("time", function(data, _time){
            time.data.labels = _time;
            time.data.datasets[0].data = data;
            time.update();
        });
        socket.on("fft", function(data, frequency){
            fft.data.labels = frequency;
            fft.data.datasets[0].data = data;
            fft.update();
        });
    </script>
</body>

</html>

```

Create a `main.js` file with the content below and run it with `node main.js`.
And access by your browser the `localhost:8013`

```Javascript
//npm install ezfft
let fft = require("ezfft").fft

//npm install express
var express = require('express');
var appExpress = express();
var http = require('http').Server(appExpress);

/*Express configuration*/
appExpress.use("/", express.static(__dirname + "/"));

appExpress.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');    //Name of your local web page
});

http.listen(8013, function () {
    console.log('With your browser, access "localhost:8013"');
});

//npm install socket.io
var io = require('socket.io')(http);

/*Socket configuration*/
io.on('connection', function (socket) {
    
    console.log("LETS START");

    setInterval(function () {
        let signal = [];        //Array with the Y axis (amplitude in time)
        let time = [];          //Array with the X axis (time)

        let amplitude = [];     //Array with the Y axis (amplitude in frequency)
        let frequency = [];     //Array with the X axis (frequency)
        
        let f =60;              //Your signal frequency
        let fs = 1000;          //Your sample rate
        let samplingTime = 1;   //Period that the signal was sampled

        for(let t = 0; t < samplingTime; t += 1/fs){
            signal.push(180*Math.sin(2*Math.PI*f*t) + 20*Math.sin(2*Math.PI*2*f*t) + 2*Math.sin(2*Math.PI*3*f*t));  //My generated signal
            time.push(t);
        }

        socket.emit("time", signal, time);      //Send time signal to the Browser

        [amplitude, frequency] = fft(signal, fs);   //Get FFT of the signal
        
        socket.emit("fft", amplitude, frequency);   //Send FFT signal to the Browser

    }, 2000);       //Update rate in sec
});

```

### LICENSE
It all is just a wrap to Project Nayuki. (MIT License)
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

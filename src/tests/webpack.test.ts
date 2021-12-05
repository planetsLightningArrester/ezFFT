import { fft, ifft } from '../../dist/ezfft';

test('basic', () => {
  let signal = [];    //My awesome signal
  let fs = 1000;      //My awesome sample rate

  let f = 20;         //Yours signal awesome frequency
  for(let t = 0; t < 1; t += 1/fs) {
      signal.push(3*Math.sin(2*Math.PI*f*t));   //Let's make some sin ;-) (oh yeah go with it)
  }

  let data = fft(signal, fs);    //Returns the whole signal with frequency and time domain axis
  data = ifft(data.frequency.amplitude, data.frequency.frequency); //Get the time from frequency domain

  // Golden
  let fft2 = require('../golden.js').fft;
  let ifft2 = require('../golden.js').ifft;

  let signal2 = [];    //My awesome signal
  let fs2 = 1000;      //My awesome sample rate

  let f2 = 20;         //Yours signal awesome frequency
  for(let t = 0; t < 1; t += 1/fs2) {
      signal2.push(3*Math.sin(2*Math.PI*f2*t));   //Let's make some sin ;-) (oh yeah go with it)
  }

  let data2 = fft2(signal, fs2);    //Returns the whole signal with frequency and time domain axis
  data2 = ifft2(data2.frequency.amplitude, data2.frequency.frequency); //Get the time from frequency domain

  expect(data).toEqual(data2)

})
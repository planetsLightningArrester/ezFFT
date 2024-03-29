import { fft, fftData, ifft } from '../ezfft';

test('basic', () => {
  const signal: number[] = [];  // My awesome signal
  const fs = 1000;      // My awesome sample rate

  const f = 20;         //Your signal awesome frequency
  for(let t = 0; t < 1; t += 1/fs) {
    signal.push(3*Math.sin(2*Math.PI*f*t));   // Let's make some sin ;-) (oh yeah go with it)
  }

  let data: fftData = fft(signal, fs);    // Returns the whole signal with frequency and time domain axis
  data = ifft(data.frequency.amplitude, data.frequency.frequency); // Get the time from frequency domain

  // Golden
  const fft2 = require('../golden.js').fft;
  const ifft2 = require('../golden.js').ifft;

  const signal2: number[] = [];  // My awesome signal
  const fs2 = 1000;      // My awesome sample rate

  const f2 = 20;         // Your signal awesome frequency
  for(let t = 0; t < 1; t += 1/fs2) {
    signal2.push(3*Math.sin(2*Math.PI*f2*t));   //Let's make some sin ;-) (oh yeah go with it)
  }

  let data2: fftData = fft2(signal, fs2);    // Returns the whole signal with frequency and time domain axis
  data2 = ifft2(data2.frequency.amplitude, data2.frequency.frequency); // Get the time from frequency domain

  expect(data).toEqual(data2)

})
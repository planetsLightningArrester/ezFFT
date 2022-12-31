import { fft, ifft, fftData } from '../ezfft';

test('performance', () => {

  let signal: number[] = [];  // My awesome signal
  let fs: number = 1000;      // My awesome sample rate

  let f: number = 20;         // Yours signal awesome frequency
  for(let t = 0; t < 1; t += 1/fs) {
    signal.push(3*Math.sin(2*Math.PI*f*t));   // Let's make some sin ;-) (oh yeah go with it)
  }

  const fftStart: number = performance.now();
  let data: fftData = fft(signal, fs);    // Returns the whole signal with frequency and time domain axis
  
  const fftEnd: number = performance.now();

  data = ifft(data.frequency.amplitude, data.frequency.frequency); // Get the time from frequency domain
  const ifftEnd: number = performance.now();

  // Results
  const fftResult: number = fftEnd - fftStart;
  const ifftResult: number = ifftEnd - fftEnd;
  
  console.log(`\tFFT (ms)\tIFFT (ms)\t\n\t${fftResult.toFixed(3)}\t\t${ifftResult.toFixed(3)}\t`);

  // Constraints
  expect(fftResult).toBeLessThan(50);
  expect(ifftResult).toBeLessThan(25);

});
/* 
 * Free FFT and convolution (JavaScript)
 * 
 * Copyright (c) 2017 Project Nayuki. (MIT License)
 * https://www.nayuki.io/page/free-small-fft-in-multiple-languages
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * - The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 * - The Software is provided "as is", without warranty of any kind, express or
 *   implied, including but not limited to the warranties of merchantability,
 *   fitness for a particular purpose and noninfringement. In no event shall the
 *   authors or copyright holders be liable for any claim, damages or other
 *   liability, whether in an action of contract, tort or otherwise, arising from,
 *   out of or in connection with the Software or the use or other dealings in the
 *   Software.
 */

/**
 * FFT data type
 */
export interface fftData {
  /**
   * Time domain data
   */
  time: {
    /**
     * Real part
     */
    realPart: number[],
    /**
     * Imaginary part
     */
    imagPart: number[],
    /**
     * Time axis
     */
    time: number[]
  },
  /**
   * Frequency domain data
   */
  frequency: {
    /**
     * FFT real part
     */
    realPart: number[],
    /**
     * FFT imaginary part
     */
    imagPart: number[],
    /**
     * Amplitude module
     */
    amplitude: number[],
    /**
     * Phase [rad]
     */
    phase: number[],
    /**
     * Frequency axis
     */
    frequency: number[]
  },
  /**
   * Sample frequency
   */
  fs: number,
  /**
   * Sampling time in seconds
   */
  samplingTime: number
}

/**
 * Perform the FFT of a given signal
 * @param signal input time signal (real part)
 * @param fs the sample rate in Hz
 * @param imagPart input time signal (imaginary part, if any)
 * @param ignoreFftAmplitudesLowerThan threshold to filter out signals below some value
 * @returns a `fftData` with the results of the FFT
 */
export function fft(signal: number[], fs: number, imagPart: number[] = [], ignoreFftAmplitudesLowerThan: number = 1e-3): fftData {

  //Create an object that contains all data about the signal
  let data: fftData = {
    //Time domain data
    time: {
      realPart: signal, //Real part
      imagPart: imagPart, //Imaginary part
      time: [] //Time axis
    },
    //Frequency domain data
    frequency: {
      realPart: [], //FFT real part
      imagPart: [], //FFT imaginary part
      amplitude: [], //Amplitude module
      phase: [], //Phase [rad]
      frequency: [] //Frequency axis
    },
    fs: fs, //Sample rate in Hz
    samplingTime: 0 //Sampling time in seconds
  }

  //Check if "fs" is not zero
  if (data.fs == 0) {
    throw "Sample frequency cannot be zero."

  } else {
    //Calculate the sampling time window
    data.samplingTime = data.time.realPart.length / fs;

    //Create time axis
    for (let i = 0; i < data.time.realPart.length; i++) {
      data.time.time[i] = i / fs;
    }

    //Make imaginary part equal to zero if the argument is not passed
    if (data.time.imagPart.length != data.time.realPart.length) {
      data.time.imagPart = newArrayOfZeros(data.time.realPart.length);
    }
  }

  //Auxiliaries variables for FFT processing without address association
  let auxReal = data.time.realPart.map(function (num) {
    return num;
  });
  let auxImag = data.time.imagPart.map(function (num) {
    return num;
  });

  //Calculate the Fourier Transform (calculated from 0 to fs)
  [data.frequency.realPart, data.frequency.imagPart] = transform(auxReal, auxImag);

  //Normalize data
  for (let i = 0; i < data.frequency.realPart.length; i++) {
    //Take FFT amplitude module
    data.frequency.amplitude[i] = Math.sqrt(Math.pow(data.frequency.realPart[i], 2) + Math.pow(data.frequency.imagPart[i], 2)) / (data.frequency.realPart.length / 2);

    //Take the FFT phase
    data.frequency.phase[i] = Math.atan2(data.frequency.imagPart[i], data.frequency.realPart[i]); //[rad]

    //Create frequency axis
    data.frequency.frequency[i] = i / data.samplingTime;

    //Remove amplitude values under 10^-3 (default) and, thus, it's respective phase values
    if (data.frequency.amplitude[i] < ignoreFftAmplitudesLowerThan) {
      data.frequency.amplitude[i] = 0;
      data.frequency.phase[i] = 0;
    }
  }

  //As FFT is calculated from 0 to fs, some manipulation must be done
  //Send FFT amplitude from [fs/2 to fs] to [-fs/s to 0]
  let sortArrayAux = data.frequency.amplitude.slice(data.frequency.amplitude.length / 2, data.frequency.amplitude.length);
  sortArrayAux.reverse().forEach(function (el) {
    data.frequency.amplitude.unshift(el);
    data.frequency.amplitude.pop();
  });

  //Send FFT phase from [fs/2 to fs] to [-fs/s to 0]
  sortArrayAux = data.frequency.phase.slice(data.frequency.phase.length / 2, data.frequency.phase.length);
  sortArrayAux.reverse().forEach(function (el) {
    data.frequency.phase.unshift(el);
    data.frequency.phase.pop();
  });

  //Send FFT axis from [fs/2 to fs] to [-fs/s to 0], mirror and subtract (fs-1)/2
  sortArrayAux = data.frequency.frequency.slice(data.frequency.frequency.length / 2, data.frequency.frequency.length);
  sortArrayAux.forEach(function (el) {
    data.frequency.frequency.unshift(-(el - ((fs - 1) / 2)));
    data.frequency.frequency.pop();
  });

  //Sampling time correction
  data.samplingTime -= 1 / fs;

  //Returns the whole thing
  return data;
}

/**
 * Perform the IFFT of a given signal
 * @param amplitude the signal real amplitude axis (or use `fftRealPart` and `fftImagPart`)
 * @param frequency the frequency axis
 * @param phase the phase axis
 * @param fftRealPart real part of FFT (overrides the parameters amplitude and phase)
 * @param fftImagPart imaginary part of FFT (overrides the parameters amplitude and phase)
 * @param ignoreImagAmplitudesLowerThan threshold to filter out imag values below some value
 * @returns a `fftData` with the results of the IFFT
 */
export function ifft(amplitude: number[], frequency: number[], phase: number[] = [], fftRealPart: number[] = [], fftImagPart: number[] = [], ignoreImagAmplitudesLowerThan: number = 1e-3): fftData {
  //Create an object that contains all data about the signal
  let data: fftData = {
    //Time domain data
    time: {
      realPart: [], //Real part
      imagPart: [], //Imaginary part
      time: [] //Time axis
    },
    //Frequency domain data
    frequency: {
      realPart: [], //FFT real part
      imagPart: [], //FFT imaginary part
      amplitude: amplitude, //Amplitude module
      phase: [], //Phase [rad]
      frequency: frequency //Frequency axis
    },
    fs: 0, //Sample rate
    samplingTime: 0 //Sampling time
  }

  //Calculate the sampling time and the sample rate
  data.samplingTime = 1 / (Math.abs(frequency[1] - frequency[0]));
  data.fs = 2 * frequency.map(Math.abs).reduce(function (a, b) {
    return Math.max(a, b)
  });

  //Generate the time axis
  for (let i = 0; i < data.samplingTime * data.fs; i++) {
    data.time.time[i] = i / data.fs;
  }

  //If no phase has been passed
  if (phase.length == 0) {
    //Create an empty phase array
    data.frequency.phase = newArrayOfZeros(amplitude.length);
  } else {
    //Otherwise store it
    data.frequency.phase = phase;
  }

  //If no real and imaginary part has been passed
  if (fftRealPart.length == 0 && fftImagPart.length == 0) {
    //Calculate them
    for (let i = 0; i < data.frequency.amplitude.length; i++) {
      data.frequency.realPart[i] = (data.frequency.amplitude[i] * data.frequency.amplitude.length) / (2 * Math.sqrt(1 + Math.pow(Math.tan(data.frequency.phase[i]), 2)));
      data.frequency.imagPart[i] = data.frequency.realPart[i] * Math.tan(data.frequency.phase[i]);
    }
  } else {
    //Otherwise store it without address association
    data.frequency.realPart = fftRealPart.map(function (num) {
      return num;
    });
    data.frequency.imagPart = fftImagPart.map(function (num) {
      return num;
    });
  }

  //Auxiliaries variables for FFT processing without address association
  let auxReal = data.frequency.realPart.map(function (num) {
    return num;
  });
  let auxImag = data.frequency.imagPart.map(function (num) {
    return num;
  });

  //Perform the inverse transform
  [data.time.imagPart, data.time.realPart] = inverseTransform(auxReal, auxImag);

  //Remove amplitude values under 10^-3 (default) and, thus, it's respective phase values
  for (let i = 0; i < data.time.imagPart.length; i++) {
    if (data.time.imagPart[i] < ignoreImagAmplitudesLowerThan) {
      data.time.imagPart[i] = 0;
    }
  }

  //Return the whole thing
  return data;

}

/**
 * Computes the discrete Fourier transform (DFT) of the given complex vector, storing the result back into the vector.
 * The vector can have any length. This is a wrapper function.
 * @param real 
 * @param imag 
 * @returns 
 */
function transform(real: number[], imag: number[]): Array<number[]> {
  var n = real.length;
  if (n != imag.length)
    throw "Mismatched lengths";
  if (n == 0)
    return [];
  else if ((n & (n - 1)) == 0) // Is power of 2
    return transformRadix2(real, imag);
  else // More complicated algorithm for arbitrary sizes
    return transformBluestein(real, imag);
}

/**
 * Computes the inverse discrete Fourier transform (IDFT) of the given complex vector, storing the result back into the vector.
 * The vector can have any length. This is a wrapper function. This transform does not perform scaling, so the inverse is not a true inverse.
 * @param real 
 * @param imag 
 * @returns 
 */
function inverseTransform(real: number[], imag: number[]): Array<number[]> {
  return transform(imag, real);
}

/**
 * Computes the discrete Fourier transform (DFT) of the given complex vector, storing the result back into the vector.
 * The vector's length must be a power of 2. Uses the Cooley-Tukey decimation-in-time radix-2 algorithm.
 * @param real 
 * @param imag 
 * @returns 
 */
function transformRadix2(real: number[], imag: number[]): Array<number[]> {
  // Length variables
  var n = real.length;
  if (n != imag.length)
    throw "Mismatched lengths";
  if (n == 1) // Trivial transform
    return [];
  var levels = -1;
  for (var i = 0; i < 32; i++) {
    if (1 << i == n)
      levels = i; // Equal to log2(n)
  }
  if (levels == -1)
    throw "Length is not a power of 2";

  // Trigonometric tables
  var cosTable = new Array(n / 2);
  var sinTable = new Array(n / 2);
  for (var i = 0; i < n / 2; i++) {
    cosTable[i] = Math.cos(2 * Math.PI * i / n);
    sinTable[i] = Math.sin(2 * Math.PI * i / n);
  }

  // Bit-reversed addressing permutation
  for (var i = 0; i < n; i++) {
    var j = reverseBits(i, levels);
    if (j > i) {
      var temp = real[i];
      real[i] = real[j];
      real[j] = temp;
      temp = imag[i];
      imag[i] = imag[j];
      imag[j] = temp;
    }
  }

  // Cooley-Tukey decimation-in-time radix-2 FFT
  for (var size = 2; size <= n; size *= 2) {
    var halfsize = size / 2;
    var tablestep = n / size;
    for (var i = 0; i < n; i += size) {
      for (var j = i, k = 0; j < i + halfsize; j++, k += tablestep) {
        var l = j + halfsize;
        var tpre = real[l] * cosTable[k] + imag[l] * sinTable[k];
        var tpim = -real[l] * sinTable[k] + imag[l] * cosTable[k];
        real[l] = real[j] - tpre;
        imag[l] = imag[j] - tpim;
        real[j] += tpre;
        imag[j] += tpim;
      }
    }
  }

  return [real, imag];
}

/**
 * Returns the integer whose value is the reverse of the lowest 'bits' bits of the integer 'x'.
 * @param x 
 * @param bits 
 * @returns 
 */
function reverseBits(x: number, bits: number): number {
  var y = 0;
  for (var i = 0; i < bits; i++) {
    y = (y << 1) | (x & 1);
    x >>>= 1;
  }
  return y;
}

/**
 * Computes the discrete Fourier transform (DFT) of the given complex vector, storing the result back into the vector.
 * The vector can have any length. This requires the convolution function, which in turn requires the radix-2 FFT function.
 * Uses Bluestein's chirp z-transform algorithm.
 * @param real 
 * @param imag 
 * @returns 
 */
function transformBluestein(real: number[], imag: number[]): Array<number[]> {
  // Find a power-of-2 convolution length m such that m >= n * 2 + 1
  var n = real.length;
  if (n != imag.length)
    throw "Mismatched lengths";
  var m = 1;
  while (m < n * 2 + 1)
    m *= 2;

  // Trigonometric tables
  var cosTable = new Array(n);
  var sinTable = new Array(n);
  for (var i = 0; i < n; i++) {
    var j = i * i % (n * 2); // This is more accurate than j = i * i
    cosTable[i] = Math.cos(Math.PI * j / n);
    sinTable[i] = Math.sin(Math.PI * j / n);
  }

  // Temporary vectors and preprocessing
  var areal = newArrayOfZeros(m);
  var aimag = newArrayOfZeros(m);
  for (var i = 0; i < n; i++) {
    areal[i] = real[i] * cosTable[i] + imag[i] * sinTable[i];
    aimag[i] = -real[i] * sinTable[i] + imag[i] * cosTable[i];
  }
  var breal = newArrayOfZeros(m);
  var bimag = newArrayOfZeros(m);
  breal[0] = cosTable[0];
  bimag[0] = sinTable[0];
  for (var i = 1; i < n; i++) {
    breal[i] = breal[m - i] = cosTable[i];
    bimag[i] = bimag[m - i] = sinTable[i];
  }

  // Convolution
  var cReal = new Array(m);
  var cImag = new Array(m);
  convolveComplex(areal, aimag, breal, bimag, cReal, cImag);

  // Postprocessing
  for (var i = 0; i < n; i++) {
    real[i] = cReal[i] * cosTable[i] + cImag[i] * sinTable[i];
    imag[i] = -cReal[i] * sinTable[i] + cImag[i] * cosTable[i];
  }

  return [real, imag];
}

/**
 * Computes the circular convolution of the given real vectors. Each vector's length must be the same.
 * @param x 
 * @param y 
 * @param out 
 */
function convolveReal(x: number[], y: number[], out: number[]): void {
  var n = x.length;
  if (n != y.length || n != out.length)
    throw "Mismatched lengths";
  convolveComplex(x, newArrayOfZeros(n), y, newArrayOfZeros(n), out, newArrayOfZeros(n));
}

/**
 * Computes the circular convolution of the given complex vectors. Each vector's length must be the same.
 * @param xReal 
 * @param xImag 
 * @param yReal 
 * @param yImag 
 * @param outReal 
 * @param outImag 
 */
function convolveComplex(xReal: number[], xImag: number[], yReal: number[], yImag: number[], outReal: number[], outImag: number[]): void {
  var n = xReal.length;
  if (n != xImag.length || n != yReal.length || n != yImag.length ||
    n != outReal.length || n != outImag.length)
    throw "Mismatched lengths";

  xReal = xReal.slice();
  xImag = xImag.slice();
  yReal = yReal.slice();
  yImag = yImag.slice();
  transform(xReal, xImag);
  transform(yReal, yImag);

  for (var i = 0; i < n; i++) {
    var temp = xReal[i] * yReal[i] - xImag[i] * yImag[i];
    xImag[i] = xImag[i] * yReal[i] + xReal[i] * yImag[i];
    xReal[i] = temp;
  }
  inverseTransform(xReal, xImag);

  for (var i = 0; i < n; i++) { // Scaling (because this FFT implementation omits it)
    outReal[i] = xReal[i] / n;
    outImag[i] = xImag[i] / n;
  }
}

/**
 * Create an array of size `n` with zeros
 * @param n array size
 * @returns the resulting array
 */
function newArrayOfZeros(n: number): number[] {
  var result = [];
  for (var i = 0; i < n; i++)
    result.push(0);
  return result;
}
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
module.exports = {
    fft,
    ifft
};

/* 
 * Wrapper of wrapper fft function
 */

function fft (signal, fs, imagPart = 0) {

    //Create an object that contains all data about the signal
    data = {
        //Time domain data
        time: {
            realPart: signal,   //Real part
            imagPart: imagPart, //Imaginay part
            time: []            //Time axis
        },
        //Frequency domain data
        frequency:{
			realPart: [],		//FFT real part
			imagPart: [],		//FFT imaginay part
            amplitude: [],      //Amplitude module
            phase: [],          //Phase [rad/s]
            frequency: []       //Frequency axis
        },
        fs: fs,             //Sample rate
        samplingTime: 0     //Sampling time
    }

    //Check if "fs" is not zero
    if(data.fs == 0) {
        throw "Sample frequency cannot be zero."

    } else {
        //Calculate the sampling time window
        data.samplingTime = data.time.realPart.length / fs;

        //Create time axis
        for (let i = 0; i < data.time.realPart.length; i++){
            data.time.time[i] = i/fs;
        }
        
        //Make imaginary part equal to zero if the argument is not passed
        if (data.time.imagPart.length != data.time.realPart.length) {
            data.time.imagPart = newArrayOfZeros(data.time.realPart.length);
        }
    }

    //Auxiliaries variables for FFT processing
    let auxReal = data.time.realPart.map(function(num){return num;});
    let auxImag = data.time.imagPart.map(function(num){return num;});

    //Calculate the Fourier Transform (calculated from 0 to fs)
    [data.frequency.realPart, data.frequency.imagPart] = transform(auxReal, auxImag);

    //Normalizes data
    for (let i = 0; i < data.frequency.realPart.length; i++) {
        //Take FFT amplitude module
        data.frequency.amplitude[i] = Math.sqrt(Math.pow(data.frequency.realPart[i], 2) + Math.pow(data.frequency.imagPart[i], 2)) / (data.frequency.realPart.length / 2);
		
		//Take the FFT phase
        data.frequency.phase[i] = Math.atan2(data.frequency.imagPart[i], data.frequency.realPart[i]); //[rad/s]
		
        //Create frequency axis
        data.frequency.frequency[i] = i / data.samplingTime;

        //Remove amplitude values under 10^-3 and, thus, it's respective phase values
        if(data.frequency.amplitude[i] < 1e-3) {
			data.frequency.amplitude[i] = 0;
			data.frequency.phase[i] = 0;
        }
    }

    //As FFT is calculated from 0 to fs, some manipulation must be done
    //Send FFT amplitude from [fs/2 to fs] to [-fs/s to 0]
    let sortArrayAux = data.frequency.amplitude.slice(data.frequency.amplitude.length/2, data.frequency.amplitude.length);
    sortArrayAux.reverse().forEach(function(el){
        data.frequency.amplitude.unshift(el);
        data.frequency.amplitude.pop();
    });

    //Send FFT phase from [fs/2 to fs] to [-fs/s to 0]
    sortArrayAux = data.frequency.phase.slice(data.frequency.phase.length/2, data.frequency.phase.length);
    sortArrayAux.reverse().forEach(function(el){
        data.frequency.phase.unshift(el);
        data.frequency.phase.pop();
    });

    //Send FFT axis from [fs/2 to fs] to [-fs/s to 0], mirror and subtract (fs-1)/2
    sortArrayAux = data.frequency.frequency.slice(data.frequency.frequency.length/2, data.frequency.frequency.length);
    sortArrayAux.forEach(function(el){
        data.frequency.frequency.unshift(-(el - ((fs - 1)/2)));
        data.frequency.frequency.pop();
    });
    
    return data;
}

/* 
 * Wrapper of wrapper ifft function
 */ //TODO

function ifft(amplitude, frequency) {
	// let re = [0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,0];
	// let im = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	data.frequency.phase = data.frequency.phase.map(function(num){return (num/Math.PI)});
	console.log(data.time.realPart);
	inverseTransform(data.frequency.amplitude, data.frequency.phase);
	console.log(data.frequency.amplitude.map(function(num){return num/2}));
}

/* 
 * Computes the discrete Fourier transform (DFT) of the given complex vector, storing the result back into the vector.
 * The vector can have any length. This is a wrapper function.
 */
function transform(real, imag) {
	var n = real.length;
	if (n != imag.length)
		throw "Mismatched lengths";
	if (n == 0)
		return;
	else if ((n & (n - 1)) == 0)  // Is power of 2
		return transformRadix2(real, imag);
	else  // More complicated algorithm for arbitrary sizes
		return transformBluestein(real, imag);
}

/* 
 * Computes the inverse discrete Fourier transform (IDFT) of the given complex vector, storing the result back into the vector.
 * The vector can have any length. This is a wrapper function. This transform does not perform scaling, so the inverse is not a true inverse.
 */
function inverseTransform(real, imag) {
	return transform(imag, real);
}

/* 
 * Computes the discrete Fourier transform (DFT) of the given complex vector, storing the result back into the vector.
 * The vector's length must be a power of 2. Uses the Cooley-Tukey decimation-in-time radix-2 algorithm.
 */
function transformRadix2(real, imag) {
	// Length variables
	var n = real.length;
	if (n != imag.length)
		throw "Mismatched lengths";
	if (n == 1)  // Trivial transform
		return;
	var levels = -1;
	for (var i = 0; i < 32; i++) {
		if (1 << i == n)
			levels = i;  // Equal to log2(n)
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
				var tpre =  real[l] * cosTable[k] + imag[l] * sinTable[k];
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

// Returns the integer whose value is the reverse of the lowest 'bits' bits of the integer 'x'.
function reverseBits(x, bits) {
    var y = 0;
    for (var i = 0; i < bits; i++) {
        y = (y << 1) | (x & 1);
        x >>>= 1;
    }
    return y;
}

/* 
 * Computes the discrete Fourier transform (DFT) of the given complex vector, storing the result back into the vector.
 * The vector can have any length. This requires the convolution function, which in turn requires the radix-2 FFT function.
 * Uses Bluestein's chirp z-transform algorithm.
 */
function transformBluestein(real, imag) {
	// Find a power-of-2 convolution length m such that m >= n * 2 + 1
	var n = real.length;
	if (n != imag.length)
		throw "Mismatched lengths";
	var m = 1;
	while (m < n * 2 + 1)
		m *= 2;
	
	// Trignometric tables
	var cosTable = new Array(n);
	var sinTable = new Array(n);
	for (var i = 0; i < n; i++) {
		var j = i * i % (n * 2);  // This is more accurate than j = i * i
		cosTable[i] = Math.cos(Math.PI * j / n);
		sinTable[i] = Math.sin(Math.PI * j / n);
	}
	
	// Temporary vectors and preprocessing
	var areal = newArrayOfZeros(m);
	var aimag = newArrayOfZeros(m);
	for (var i = 0; i < n; i++) {
		areal[i] =  real[i] * cosTable[i] + imag[i] * sinTable[i];
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
	var creal = new Array(m);
	var cimag = new Array(m);
	convolveComplex(areal, aimag, breal, bimag, creal, cimag);
	
	// Postprocessing
	for (var i = 0; i < n; i++) {
		real[i] =  creal[i] * cosTable[i] + cimag[i] * sinTable[i];
		imag[i] = -creal[i] * sinTable[i] + cimag[i] * cosTable[i];
    }
    
    return [real, imag];
}


/* 
 * Computes the circular convolution of the given real vectors. Each vector's length must be the same.
 */
function convolveReal(x, y, out) {
	var n = x.length;
	if (n != y.length || n != out.length)
		throw "Mismatched lengths";
	convolveComplex(x, newArrayOfZeros(n), y, newArrayOfZeros(n), out, newArrayOfZeros(n));
}

/* 
 * Computes the circular convolution of the given complex vectors. Each vector's length must be the same.
 */
function convolveComplex(xreal, ximag, yreal, yimag, outreal, outimag) {
	var n = xreal.length;
	if (n != ximag.length || n != yreal.length || n != yimag.length
			|| n != outreal.length || n != outimag.length)
		throw "Mismatched lengths";
	
	xreal = xreal.slice();
	ximag = ximag.slice();
	yreal = yreal.slice();
	yimag = yimag.slice();
	transform(xreal, ximag);
	transform(yreal, yimag);
	
	for (var i = 0; i < n; i++) {
		var temp = xreal[i] * yreal[i] - ximag[i] * yimag[i];
		ximag[i] = ximag[i] * yreal[i] + xreal[i] * yimag[i];
		xreal[i] = temp;
	}
	inverseTransform(xreal, ximag);
	
	for (var i = 0; i < n; i++) {  // Scaling (because this FFT implementation omits it)
		outreal[i] = xreal[i] / n;
		outimag[i] = ximag[i] / n;
	}
}


function newArrayOfZeros(n) {
	var result = [];
	for (var i = 0; i < n; i++)
		result.push(0);
	return result;
}
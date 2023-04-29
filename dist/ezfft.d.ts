/** Real and imaginary parts in the time domain */
export declare class fftDataTime {
    /** Real part */
    real: number[];
    /**
     * Real part
     * @deprecated use `real` instead
     */
    realPart: number[];
    /** Imaginary part */
    imag: number[];
    /**
     * Imaginary part
     * @deprecated use `imag` instead
     */
    imagPart: number[];
    /** Time axis */
    time: number[];
    /**
     * Create new data in the time domain
     * @param real the real part
     * @param imaginary the imaginary part
     */
    constructor(real: number[], imaginary: number[]);
}
/** Real and imaginary parts in the frequency domain */
export declare class fftDataFrequency {
    /** FFT real part */
    real: number[];
    /**
     * FFT real part
     * @deprecated use `real` instead
     */
    realPart: number[];
    /** FFT imaginary part */
    imag: number[];
    /**
     * FFT imaginary part
     * @deprecated use `real` instead
     */
    imagPart: number[];
    /** Amplitude module */
    amplitude: number[];
    /** Phase [rad] */
    phase: number[];
    /** Frequency axis */
    frequency: number[];
    /**
     * Create new data in the frequency domain
     * @param real the real part
     * @param imaginary the imaginary part
     */
    constructor(real: number[], imaginary: number[]);
}
/** FFT data type */
export declare class fftData {
    /** Time domain data */
    time: fftDataTime;
    /** Frequency domain data */
    frequency: fftDataFrequency;
    /** Sample frequency */
    fs: number;
    /** Sampling time in seconds */
    samplingTime: number;
    /**
     * Create a new `fftData`
     * @param fs sample frequency
     */
    constructor(real: number[], imaginary: number[], fs: number);
}
/**
 * Perform the FFT of a given signal
 * @param signal input time signal (real part)
 * @param fs the sample rate in Hz
 * @param imagPart input time signal (imaginary part, if any)
 * @param ignoreFftAmplitudesLowerThan threshold to filter out signals below some value
 * @returns a `fftData` with the results of the FFT
 */
export declare function fft(signal: number[], fs: number, imagPart?: number[], ignoreFftAmplitudesLowerThan?: number): fftData;
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
export declare function ifft(amplitude: number[], frequency: number[], phase?: number[], fftRealPart?: number[], fftImagPart?: number[], ignoreImagAmplitudesLowerThan?: number): fftData;

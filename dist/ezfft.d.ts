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
        realPart: number[];
        /**
         * Imaginary part
         */
        imagPart: number[];
        /**
         * Time axis
         */
        time: number[];
    };
    /**
     * Frequency domain data
     */
    frequency: {
        /**
         * FFT real part
         */
        realPart: number[];
        /**
         * FFT imaginary part
         */
        imagPart: number[];
        /**
         * Amplitude module
         */
        amplitude: number[];
        /**
         * Phase [rad]
         */
        phase: number[];
        /**
         * Frequency axis
         */
        frequency: number[];
    };
    /**
     *
     */
    fs: number;
    /**
     * Sampling time in seconds
     */
    samplingTime: number;
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

var e={d:(r,t)=>{for(var a in t)e.o(t,a)&&!e.o(r,a)&&Object.defineProperty(r,a,{enumerable:!0,get:t[a]})},o:(e,r)=>Object.prototype.hasOwnProperty.call(e,r),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},r={};function t(e,r,t=[],a=.001){let f={time:{realPart:e,imagPart:t,time:[]},frequency:{realPart:[],imagPart:[],amplitude:[],phase:[],frequency:[]},fs:r,samplingTime:0};if(0==f.fs)throw"Sample frequency cannot be zero.";f.samplingTime=f.time.realPart.length/r;for(let e=0;e<f.time.realPart.length;e++)f.time.time[e]=e/r;f.time.imagPart.length!=f.time.realPart.length&&(f.time.imagPart=u(f.time.realPart.length));let i=f.time.realPart.map((function(e){return e})),l=f.time.imagPart.map((function(e){return e}));[f.frequency.realPart,f.frequency.imagPart]=n(i,l);for(let e=0;e<f.frequency.realPart.length;e++)f.frequency.amplitude[e]=Math.sqrt(Math.pow(f.frequency.realPart[e],2)+Math.pow(f.frequency.imagPart[e],2))/(f.frequency.realPart.length/2),f.frequency.phase[e]=Math.atan2(f.frequency.imagPart[e],f.frequency.realPart[e]),f.frequency.frequency[e]=e/f.samplingTime,f.frequency.amplitude[e]<a&&(f.frequency.amplitude[e]=0,f.frequency.phase[e]=0);let c=f.frequency.amplitude.slice(f.frequency.amplitude.length/2,f.frequency.amplitude.length);return c.reverse().forEach((function(e){f.frequency.amplitude.unshift(e),f.frequency.amplitude.pop()})),c=f.frequency.phase.slice(f.frequency.phase.length/2,f.frequency.phase.length),c.reverse().forEach((function(e){f.frequency.phase.unshift(e),f.frequency.phase.pop()})),c=f.frequency.frequency.slice(f.frequency.frequency.length/2,f.frequency.frequency.length),c.forEach((function(e){f.frequency.frequency.unshift(-(e-(r-1)/2)),f.frequency.frequency.pop()})),f.samplingTime-=1/r,f}function a(e,r,t=[],a=[],n=[],i=.001){let l={time:{realPart:[],imagPart:[],time:[]},frequency:{realPart:[],imagPart:[],amplitude:e,phase:[],frequency:r},fs:0,samplingTime:0};l.samplingTime=1/Math.abs(r[1]-r[0]),l.fs=2*r.map(Math.abs).reduce((function(e,r){return Math.max(e,r)}));for(let e=0;e<l.samplingTime*l.fs;e++)l.time.time[e]=e/l.fs;if(0==t.length?l.frequency.phase=u(e.length):l.frequency.phase=t,0==a.length&&0==n.length)for(let e=0;e<l.frequency.amplitude.length;e++)l.frequency.realPart[e]=l.frequency.amplitude[e]*l.frequency.amplitude.length/(2*Math.sqrt(1+Math.pow(Math.tan(l.frequency.phase[e]),2))),l.frequency.imagPart[e]=l.frequency.realPart[e]*Math.tan(l.frequency.phase[e]);else l.frequency.realPart=a.map((function(e){return e})),l.frequency.imagPart=n.map((function(e){return e}));let c=l.frequency.realPart.map((function(e){return e})),h=l.frequency.imagPart.map((function(e){return e}));[l.time.imagPart,l.time.realPart]=f(c,h);for(let e=0;e<l.time.imagPart.length;e++)l.time.imagPart[e]<i&&(l.time.imagPart[e]=0);return l}function n(e,r){var t=e.length;if(t!=r.length)throw"Mismatched lengths";return 0==t?[]:0==(t&t-1)?function(e,r){var t=e.length;if(t!=r.length)throw"Mismatched lengths";if(1==t)return[];for(var a=-1,n=0;n<32;n++)1<<n==t&&(a=n);if(-1==a)throw"Length is not a power of 2";var f=new Array(t/2),u=new Array(t/2);for(n=0;n<t/2;n++)f[n]=Math.cos(2*Math.PI*n/t),u[n]=Math.sin(2*Math.PI*n/t);for(n=0;n<t;n++)if((o=i(n,a))>n){var l=e[n];e[n]=e[o],e[o]=l,l=r[n],r[n]=r[o],r[o]=l}for(var c=2;c<=t;c*=2){var h=c/2,m=t/c;for(n=0;n<t;n+=c)for(var o=n,y=0;o<n+h;o++,y+=m){var g=o+h,p=e[g]*f[y]+r[g]*u[y],s=-e[g]*u[y]+r[g]*f[y];e[g]=e[o]-p,r[g]=r[o]-s,e[o]+=p,r[o]+=s}}return[e,r]}(e,r):function(e,r){var t=e.length;if(t!=r.length)throw"Mismatched lengths";for(var a=1;a<2*t+1;)a*=2;for(var i=new Array(t),l=new Array(t),c=0;c<t;c++){var h=c*c%(2*t);i[c]=Math.cos(Math.PI*h/t),l[c]=Math.sin(Math.PI*h/t)}var m=u(a),o=u(a);for(c=0;c<t;c++)m[c]=e[c]*i[c]+r[c]*l[c],o[c]=-e[c]*l[c]+r[c]*i[c];var y=u(a),g=u(a);for(y[0]=i[0],g[0]=l[0],c=1;c<t;c++)y[c]=y[a-c]=i[c],g[c]=g[a-c]=l[c];var p=new Array(a),s=new Array(a);for(function(e,r,t,a,i,u){var l=e.length;if(l!=r.length||l!=t.length||l!=a.length||l!=i.length||l!=u.length)throw"Mismatched lengths";e=e.slice(),r=r.slice(),t=t.slice(),a=a.slice(),n(e,r),n(t,a);for(var c=0;c<l;c++){var h=e[c]*t[c]-r[c]*a[c];r[c]=r[c]*t[c]+e[c]*a[c],e[c]=h}for(f(e,r),c=0;c<l;c++)i[c]=e[c]/l,u[c]=r[c]/l}(m,o,y,g,p,s),c=0;c<t;c++)e[c]=p[c]*i[c]+s[c]*l[c],r[c]=-p[c]*l[c]+s[c]*i[c];return[e,r]}(e,r)}function f(e,r){return n(r,e)}function i(e,r){for(var t=0,a=0;a<r;a++)t=t<<1|1&e,e>>>=1;return t}function u(e){for(var r=[],t=0;t<e;t++)r.push(0);return r}e.r(r),e.d(r,{fft:()=>t,ifft:()=>a}),module.exports=r;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUdBLEVBQUkrQixFQUFHL0IsSUFDckI2QixFQUFLN0IsR0FBS3VELEVBQU12RCxHQUFLaUMsRUFBU2pDLEdBQUt3RCxFQUFNeEQsR0FBS21DLEVBQVNuQyxHQUN2RDhCLEVBQUs5QixJQUFNdUQsRUFBTXZELEdBQUttQyxFQUFTbkMsR0FBS3dELEVBQU14RCxHQUFLaUMsRUFBU2pDLEdBRzFELE1BQU8sQ0FBQzZCLEVBQU1DLEdBakpMa0MsQ0FBbUJuQyxFQUFNQyxHQVVwQyxTQUFTRixFQUFpQkMsRUFBZ0JDLEdBQ3hDLE9BQU94QixFQUFVd0IsRUFBTUQsR0F3RXpCLFNBQVNXLEVBQVl5QixFQUFXQyxHQUU5QixJQURBLElBQUlDLEVBQUksRUFDQ25FLEVBQUksRUFBR0EsRUFBSWtFLEVBQU1sRSxJQUN4Qm1FLEVBQUtBLEdBQUssRUFBVSxFQUFKRixFQUNoQkEsS0FBTyxFQUVULE9BQU9FLEVBZ0hULFNBQVNsRSxFQUFnQjhCLEdBRXZCLElBREEsSUFBSXFDLEVBQVMsR0FDSnBFLEVBQUksRUFBR0EsRUFBSStCLEVBQUcvQixJQUNyQm9FLEVBQU9DLEtBQUssR0FDZCxPQUFPRCxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXpmZnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXpmZnQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2V6ZmZ0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZXpmZnQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9lemZmdC8uL3NyYy9lemZmdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8qIFxyXG4gKiBGcmVlIEZGVCBhbmQgY29udm9sdXRpb24gKEphdmFTY3JpcHQpXHJcbiAqIFxyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgUHJvamVjdCBOYXl1a2kuIChNSVQgTGljZW5zZSlcclxuICogaHR0cHM6Ly93d3cubmF5dWtpLmlvL3BhZ2UvZnJlZS1zbWFsbC1mZnQtaW4tbXVsdGlwbGUtbGFuZ3VhZ2VzXHJcbiAqIFxyXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mXHJcbiAqIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW5cclxuICogdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0b1xyXG4gKiB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZlxyXG4gKiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sXHJcbiAqIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4gKiAtIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXHJcbiAqICAgYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbiAqIC0gVGhlIFNvZnR3YXJlIGlzIHByb3ZpZGVkIFwiYXMgaXNcIiwgd2l0aG91dCB3YXJyYW50eSBvZiBhbnkga2luZCwgZXhwcmVzcyBvclxyXG4gKiAgIGltcGxpZWQsIGluY2x1ZGluZyBidXQgbm90IGxpbWl0ZWQgdG8gdGhlIHdhcnJhbnRpZXMgb2YgbWVyY2hhbnRhYmlsaXR5LFxyXG4gKiAgIGZpdG5lc3MgZm9yIGEgcGFydGljdWxhciBwdXJwb3NlIGFuZCBub25pbmZyaW5nZW1lbnQuIEluIG5vIGV2ZW50IHNoYWxsIHRoZVxyXG4gKiAgIGF1dGhvcnMgb3IgY29weXJpZ2h0IGhvbGRlcnMgYmUgbGlhYmxlIGZvciBhbnkgY2xhaW0sIGRhbWFnZXMgb3Igb3RoZXJcclxuICogICBsaWFiaWxpdHksIHdoZXRoZXIgaW4gYW4gYWN0aW9uIG9mIGNvbnRyYWN0LCB0b3J0IG9yIG90aGVyd2lzZSwgYXJpc2luZyBmcm9tLFxyXG4gKiAgIG91dCBvZiBvciBpbiBjb25uZWN0aW9uIHdpdGggdGhlIFNvZnR3YXJlIG9yIHRoZSB1c2Ugb3Igb3RoZXIgZGVhbGluZ3MgaW4gdGhlXHJcbiAqICAgU29mdHdhcmUuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEZGVCBkYXRhIHR5cGVcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgZmZ0RGF0YSB7XHJcbiAgLyoqXHJcbiAgICogVGltZSBkb21haW4gZGF0YVxyXG4gICAqL1xyXG4gIHRpbWU6IHtcclxuICAgIC8qKlxyXG4gICAgICogUmVhbCBwYXJ0XHJcbiAgICAgKi9cclxuICAgIHJlYWxQYXJ0OiBudW1iZXJbXSxcclxuICAgIC8qKlxyXG4gICAgICogSW1hZ2luYXJ5IHBhcnRcclxuICAgICAqL1xyXG4gICAgaW1hZ1BhcnQ6IG51bWJlcltdLFxyXG4gICAgLyoqXHJcbiAgICAgKiBUaW1lIGF4aXNcclxuICAgICAqL1xyXG4gICAgdGltZTogbnVtYmVyW11cclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIEZyZXF1ZW5jeSBkb21haW4gZGF0YVxyXG4gICAqL1xyXG4gIGZyZXF1ZW5jeToge1xyXG4gICAgLyoqXHJcbiAgICAgKiBGRlQgcmVhbCBwYXJ0XHJcbiAgICAgKi9cclxuICAgIHJlYWxQYXJ0OiBudW1iZXJbXSxcclxuICAgIC8qKlxyXG4gICAgICogRkZUIGltYWdpbmFyeSBwYXJ0XHJcbiAgICAgKi9cclxuICAgIGltYWdQYXJ0OiBudW1iZXJbXSxcclxuICAgIC8qKlxyXG4gICAgICogQW1wbGl0dWRlIG1vZHVsZVxyXG4gICAgICovXHJcbiAgICBhbXBsaXR1ZGU6IG51bWJlcltdLFxyXG4gICAgLyoqXHJcbiAgICAgKiBQaGFzZSBbcmFkXVxyXG4gICAgICovXHJcbiAgICBwaGFzZTogbnVtYmVyW10sXHJcbiAgICAvKipcclxuICAgICAqIEZyZXF1ZW5jeSBheGlzXHJcbiAgICAgKi9cclxuICAgIGZyZXF1ZW5jeTogbnVtYmVyW11cclxuICB9LFxyXG4gIC8qKlxyXG4gICAqIFNhbXBsZSBmcmVxdWVuY3lcclxuICAgKi9cclxuICBmczogbnVtYmVyLFxyXG4gIC8qKlxyXG4gICAqIFNhbXBsaW5nIHRpbWUgaW4gc2Vjb25kc1xyXG4gICAqL1xyXG4gIHNhbXBsaW5nVGltZTogbnVtYmVyXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQZXJmb3JtIHRoZSBGRlQgb2YgYSBnaXZlbiBzaWduYWxcclxuICogQHBhcmFtIHNpZ25hbCBpbnB1dCB0aW1lIHNpZ25hbCAocmVhbCBwYXJ0KVxyXG4gKiBAcGFyYW0gZnMgdGhlIHNhbXBsZSByYXRlIGluIEh6XHJcbiAqIEBwYXJhbSBpbWFnUGFydCBpbnB1dCB0aW1lIHNpZ25hbCAoaW1hZ2luYXJ5IHBhcnQsIGlmIGFueSlcclxuICogQHBhcmFtIGlnbm9yZUZmdEFtcGxpdHVkZXNMb3dlclRoYW4gdGhyZXNob2xkIHRvIGZpbHRlciBvdXQgc2lnbmFscyBiZWxvdyBzb21lIHZhbHVlXHJcbiAqIEByZXR1cm5zIGEgYGZmdERhdGFgIHdpdGggdGhlIHJlc3VsdHMgb2YgdGhlIEZGVFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZmdChzaWduYWw6IG51bWJlcltdLCBmczogbnVtYmVyLCBpbWFnUGFydDogbnVtYmVyW10gPSBbXSwgaWdub3JlRmZ0QW1wbGl0dWRlc0xvd2VyVGhhbjogbnVtYmVyID0gMWUtMyk6IGZmdERhdGEge1xyXG5cclxuICAvL0NyZWF0ZSBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhbGwgZGF0YSBhYm91dCB0aGUgc2lnbmFsXHJcbiAgbGV0IGRhdGE6IGZmdERhdGEgPSB7XHJcbiAgICAvL1RpbWUgZG9tYWluIGRhdGFcclxuICAgIHRpbWU6IHtcclxuICAgICAgcmVhbFBhcnQ6IHNpZ25hbCwgLy9SZWFsIHBhcnRcclxuICAgICAgaW1hZ1BhcnQ6IGltYWdQYXJ0LCAvL0ltYWdpbmFyeSBwYXJ0XHJcbiAgICAgIHRpbWU6IFtdIC8vVGltZSBheGlzXHJcbiAgICB9LFxyXG4gICAgLy9GcmVxdWVuY3kgZG9tYWluIGRhdGFcclxuICAgIGZyZXF1ZW5jeToge1xyXG4gICAgICByZWFsUGFydDogW10sIC8vRkZUIHJlYWwgcGFydFxyXG4gICAgICBpbWFnUGFydDogW10sIC8vRkZUIGltYWdpbmFyeSBwYXJ0XHJcbiAgICAgIGFtcGxpdHVkZTogW10sIC8vQW1wbGl0dWRlIG1vZHVsZVxyXG4gICAgICBwaGFzZTogW10sIC8vUGhhc2UgW3JhZF1cclxuICAgICAgZnJlcXVlbmN5OiBbXSAvL0ZyZXF1ZW5jeSBheGlzXHJcbiAgICB9LFxyXG4gICAgZnM6IGZzLCAvL1NhbXBsZSByYXRlIGluIEh6XHJcbiAgICBzYW1wbGluZ1RpbWU6IDAgLy9TYW1wbGluZyB0aW1lIGluIHNlY29uZHNcclxuICB9XHJcblxyXG4gIC8vQ2hlY2sgaWYgXCJmc1wiIGlzIG5vdCB6ZXJvXHJcbiAgaWYgKGRhdGEuZnMgPT0gMCkge1xyXG4gICAgdGhyb3cgXCJTYW1wbGUgZnJlcXVlbmN5IGNhbm5vdCBiZSB6ZXJvLlwiXHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICAvL0NhbGN1bGF0ZSB0aGUgc2FtcGxpbmcgdGltZSB3aW5kb3dcclxuICAgIGRhdGEuc2FtcGxpbmdUaW1lID0gZGF0YS50aW1lLnJlYWxQYXJ0Lmxlbmd0aCAvIGZzO1xyXG5cclxuICAgIC8vQ3JlYXRlIHRpbWUgYXhpc1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLnRpbWUucmVhbFBhcnQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgZGF0YS50aW1lLnRpbWVbaV0gPSBpIC8gZnM7XHJcbiAgICB9XHJcblxyXG4gICAgLy9NYWtlIGltYWdpbmFyeSBwYXJ0IGVxdWFsIHRvIHplcm8gaWYgdGhlIGFyZ3VtZW50IGlzIG5vdCBwYXNzZWRcclxuICAgIGlmIChkYXRhLnRpbWUuaW1hZ1BhcnQubGVuZ3RoICE9IGRhdGEudGltZS5yZWFsUGFydC5sZW5ndGgpIHtcclxuICAgICAgZGF0YS50aW1lLmltYWdQYXJ0ID0gbmV3QXJyYXlPZlplcm9zKGRhdGEudGltZS5yZWFsUGFydC5sZW5ndGgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy9BdXhpbGlhcmllcyB2YXJpYWJsZXMgZm9yIEZGVCBwcm9jZXNzaW5nIHdpdGhvdXQgYWRkcmVzcyBhc3NvY2lhdGlvblxyXG4gIGxldCBhdXhSZWFsID0gZGF0YS50aW1lLnJlYWxQYXJ0Lm1hcChmdW5jdGlvbiAobnVtKSB7XHJcbiAgICByZXR1cm4gbnVtO1xyXG4gIH0pO1xyXG4gIGxldCBhdXhJbWFnID0gZGF0YS50aW1lLmltYWdQYXJ0Lm1hcChmdW5jdGlvbiAobnVtKSB7XHJcbiAgICByZXR1cm4gbnVtO1xyXG4gIH0pO1xyXG5cclxuICAvL0NhbGN1bGF0ZSB0aGUgRm91cmllciBUcmFuc2Zvcm0gKGNhbGN1bGF0ZWQgZnJvbSAwIHRvIGZzKVxyXG4gIFtkYXRhLmZyZXF1ZW5jeS5yZWFsUGFydCwgZGF0YS5mcmVxdWVuY3kuaW1hZ1BhcnRdID0gdHJhbnNmb3JtKGF1eFJlYWwsIGF1eEltYWcpO1xyXG5cclxuICAvL05vcm1hbGl6ZSBkYXRhXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmZyZXF1ZW5jeS5yZWFsUGFydC5sZW5ndGg7IGkrKykge1xyXG4gICAgLy9UYWtlIEZGVCBhbXBsaXR1ZGUgbW9kdWxlXHJcbiAgICBkYXRhLmZyZXF1ZW5jeS5hbXBsaXR1ZGVbaV0gPSBNYXRoLnNxcnQoTWF0aC5wb3coZGF0YS5mcmVxdWVuY3kucmVhbFBhcnRbaV0sIDIpICsgTWF0aC5wb3coZGF0YS5mcmVxdWVuY3kuaW1hZ1BhcnRbaV0sIDIpKSAvIChkYXRhLmZyZXF1ZW5jeS5yZWFsUGFydC5sZW5ndGggLyAyKTtcclxuXHJcbiAgICAvL1Rha2UgdGhlIEZGVCBwaGFzZVxyXG4gICAgZGF0YS5mcmVxdWVuY3kucGhhc2VbaV0gPSBNYXRoLmF0YW4yKGRhdGEuZnJlcXVlbmN5LmltYWdQYXJ0W2ldLCBkYXRhLmZyZXF1ZW5jeS5yZWFsUGFydFtpXSk7IC8vW3JhZF1cclxuXHJcbiAgICAvL0NyZWF0ZSBmcmVxdWVuY3kgYXhpc1xyXG4gICAgZGF0YS5mcmVxdWVuY3kuZnJlcXVlbmN5W2ldID0gaSAvIGRhdGEuc2FtcGxpbmdUaW1lO1xyXG5cclxuICAgIC8vUmVtb3ZlIGFtcGxpdHVkZSB2YWx1ZXMgdW5kZXIgMTBeLTMgKGRlZmF1bHQpIGFuZCwgdGh1cywgaXQncyByZXNwZWN0aXZlIHBoYXNlIHZhbHVlc1xyXG4gICAgaWYgKGRhdGEuZnJlcXVlbmN5LmFtcGxpdHVkZVtpXSA8IGlnbm9yZUZmdEFtcGxpdHVkZXNMb3dlclRoYW4pIHtcclxuICAgICAgZGF0YS5mcmVxdWVuY3kuYW1wbGl0dWRlW2ldID0gMDtcclxuICAgICAgZGF0YS5mcmVxdWVuY3kucGhhc2VbaV0gPSAwO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy9BcyBGRlQgaXMgY2FsY3VsYXRlZCBmcm9tIDAgdG8gZnMsIHNvbWUgbWFuaXB1bGF0aW9uIG11c3QgYmUgZG9uZVxyXG4gIC8vU2VuZCBGRlQgYW1wbGl0dWRlIGZyb20gW2ZzLzIgdG8gZnNdIHRvIFstZnMvcyB0byAwXVxyXG4gIGxldCBzb3J0QXJyYXlBdXggPSBkYXRhLmZyZXF1ZW5jeS5hbXBsaXR1ZGUuc2xpY2UoZGF0YS5mcmVxdWVuY3kuYW1wbGl0dWRlLmxlbmd0aCAvIDIsIGRhdGEuZnJlcXVlbmN5LmFtcGxpdHVkZS5sZW5ndGgpO1xyXG4gIHNvcnRBcnJheUF1eC5yZXZlcnNlKCkuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgIGRhdGEuZnJlcXVlbmN5LmFtcGxpdHVkZS51bnNoaWZ0KGVsKTtcclxuICAgIGRhdGEuZnJlcXVlbmN5LmFtcGxpdHVkZS5wb3AoKTtcclxuICB9KTtcclxuXHJcbiAgLy9TZW5kIEZGVCBwaGFzZSBmcm9tIFtmcy8yIHRvIGZzXSB0byBbLWZzL3MgdG8gMF1cclxuICBzb3J0QXJyYXlBdXggPSBkYXRhLmZyZXF1ZW5jeS5waGFzZS5zbGljZShkYXRhLmZyZXF1ZW5jeS5waGFzZS5sZW5ndGggLyAyLCBkYXRhLmZyZXF1ZW5jeS5waGFzZS5sZW5ndGgpO1xyXG4gIHNvcnRBcnJheUF1eC5yZXZlcnNlKCkuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgIGRhdGEuZnJlcXVlbmN5LnBoYXNlLnVuc2hpZnQoZWwpO1xyXG4gICAgZGF0YS5mcmVxdWVuY3kucGhhc2UucG9wKCk7XHJcbiAgfSk7XHJcblxyXG4gIC8vU2VuZCBGRlQgYXhpcyBmcm9tIFtmcy8yIHRvIGZzXSB0byBbLWZzL3MgdG8gMF0sIG1pcnJvciBhbmQgc3VidHJhY3QgKGZzLTEpLzJcclxuICBzb3J0QXJyYXlBdXggPSBkYXRhLmZyZXF1ZW5jeS5mcmVxdWVuY3kuc2xpY2UoZGF0YS5mcmVxdWVuY3kuZnJlcXVlbmN5Lmxlbmd0aCAvIDIsIGRhdGEuZnJlcXVlbmN5LmZyZXF1ZW5jeS5sZW5ndGgpO1xyXG4gIHNvcnRBcnJheUF1eC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZGF0YS5mcmVxdWVuY3kuZnJlcXVlbmN5LnVuc2hpZnQoLShlbCAtICgoZnMgLSAxKSAvIDIpKSk7XHJcbiAgICBkYXRhLmZyZXF1ZW5jeS5mcmVxdWVuY3kucG9wKCk7XHJcbiAgfSk7XHJcblxyXG4gIC8vU2FtcGxpbmcgdGltZSBjb3JyZWN0aW9uXHJcbiAgZGF0YS5zYW1wbGluZ1RpbWUgLT0gMSAvIGZzO1xyXG5cclxuICAvL1JldHVybnMgdGhlIHdob2xlIHRoaW5nXHJcbiAgcmV0dXJuIGRhdGE7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQZXJmb3JtIHRoZSBJRkZUIG9mIGEgZ2l2ZW4gc2lnbmFsXHJcbiAqIEBwYXJhbSBhbXBsaXR1ZGUgdGhlIHNpZ25hbCByZWFsIGFtcGxpdHVkZSBheGlzIChvciB1c2UgYGZmdFJlYWxQYXJ0YCBhbmQgYGZmdEltYWdQYXJ0YClcclxuICogQHBhcmFtIGZyZXF1ZW5jeSB0aGUgZnJlcXVlbmN5IGF4aXNcclxuICogQHBhcmFtIHBoYXNlIHRoZSBwaGFzZSBheGlzXHJcbiAqIEBwYXJhbSBmZnRSZWFsUGFydCByZWFsIHBhcnQgb2YgRkZUIChvdmVycmlkZXMgdGhlIHBhcmFtZXRlcnMgYW1wbGl0dWRlIGFuZCBwaGFzZSlcclxuICogQHBhcmFtIGZmdEltYWdQYXJ0IGltYWdpbmFyeSBwYXJ0IG9mIEZGVCAob3ZlcnJpZGVzIHRoZSBwYXJhbWV0ZXJzIGFtcGxpdHVkZSBhbmQgcGhhc2UpXHJcbiAqIEBwYXJhbSBpZ25vcmVJbWFnQW1wbGl0dWRlc0xvd2VyVGhhbiB0aHJlc2hvbGQgdG8gZmlsdGVyIG91dCBpbWFnIHZhbHVlcyBiZWxvdyBzb21lIHZhbHVlXHJcbiAqIEByZXR1cm5zIGEgYGZmdERhdGFgIHdpdGggdGhlIHJlc3VsdHMgb2YgdGhlIElGRlRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpZmZ0KGFtcGxpdHVkZTogbnVtYmVyW10sIGZyZXF1ZW5jeTogbnVtYmVyW10sIHBoYXNlOiBudW1iZXJbXSA9IFtdLCBmZnRSZWFsUGFydDogbnVtYmVyW10gPSBbXSwgZmZ0SW1hZ1BhcnQ6IG51bWJlcltdID0gW10sIGlnbm9yZUltYWdBbXBsaXR1ZGVzTG93ZXJUaGFuOiBudW1iZXIgPSAxZS0zKTogZmZ0RGF0YSB7XHJcbiAgLy9DcmVhdGUgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYWxsIGRhdGEgYWJvdXQgdGhlIHNpZ25hbFxyXG4gIGxldCBkYXRhOiBmZnREYXRhID0ge1xyXG4gICAgLy9UaW1lIGRvbWFpbiBkYXRhXHJcbiAgICB0aW1lOiB7XHJcbiAgICAgIHJlYWxQYXJ0OiBbXSwgLy9SZWFsIHBhcnRcclxuICAgICAgaW1hZ1BhcnQ6IFtdLCAvL0ltYWdpbmFyeSBwYXJ0XHJcbiAgICAgIHRpbWU6IFtdIC8vVGltZSBheGlzXHJcbiAgICB9LFxyXG4gICAgLy9GcmVxdWVuY3kgZG9tYWluIGRhdGFcclxuICAgIGZyZXF1ZW5jeToge1xyXG4gICAgICByZWFsUGFydDogW10sIC8vRkZUIHJlYWwgcGFydFxyXG4gICAgICBpbWFnUGFydDogW10sIC8vRkZUIGltYWdpbmFyeSBwYXJ0XHJcbiAgICAgIGFtcGxpdHVkZTogYW1wbGl0dWRlLCAvL0FtcGxpdHVkZSBtb2R1bGVcclxuICAgICAgcGhhc2U6IFtdLCAvL1BoYXNlIFtyYWRdXHJcbiAgICAgIGZyZXF1ZW5jeTogZnJlcXVlbmN5IC8vRnJlcXVlbmN5IGF4aXNcclxuICAgIH0sXHJcbiAgICBmczogMCwgLy9TYW1wbGUgcmF0ZVxyXG4gICAgc2FtcGxpbmdUaW1lOiAwIC8vU2FtcGxpbmcgdGltZVxyXG4gIH1cclxuXHJcbiAgLy9DYWxjdWxhdGUgdGhlIHNhbXBsaW5nIHRpbWUgYW5kIHRoZSBzYW1wbGUgcmF0ZVxyXG4gIGRhdGEuc2FtcGxpbmdUaW1lID0gMSAvIChNYXRoLmFicyhmcmVxdWVuY3lbMV0gLSBmcmVxdWVuY3lbMF0pKTtcclxuICBkYXRhLmZzID0gMiAqIGZyZXF1ZW5jeS5tYXAoTWF0aC5hYnMpLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgcmV0dXJuIE1hdGgubWF4KGEsIGIpXHJcbiAgfSk7XHJcblxyXG4gIC8vR2VuZXJhdGUgdGhlIHRpbWUgYXhpc1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5zYW1wbGluZ1RpbWUgKiBkYXRhLmZzOyBpKyspIHtcclxuICAgIGRhdGEudGltZS50aW1lW2ldID0gaSAvIGRhdGEuZnM7XHJcbiAgfVxyXG5cclxuICAvL0lmIG5vIHBoYXNlIGhhcyBiZWVuIHBhc3NlZFxyXG4gIGlmIChwaGFzZS5sZW5ndGggPT0gMCkge1xyXG4gICAgLy9DcmVhdGUgYW4gZW1wdHkgcGhhc2UgYXJyYXlcclxuICAgIGRhdGEuZnJlcXVlbmN5LnBoYXNlID0gbmV3QXJyYXlPZlplcm9zKGFtcGxpdHVkZS5sZW5ndGgpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvL090aGVyd2lzZSBzdG9yZSBpdFxyXG4gICAgZGF0YS5mcmVxdWVuY3kucGhhc2UgPSBwaGFzZTtcclxuICB9XHJcblxyXG4gIC8vSWYgbm8gcmVhbCBhbmQgaW1hZ2luYXJ5IHBhcnQgaGFzIGJlZW4gcGFzc2VkXHJcbiAgaWYgKGZmdFJlYWxQYXJ0Lmxlbmd0aCA9PSAwICYmIGZmdEltYWdQYXJ0Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAvL0NhbGN1bGF0ZSB0aGVtXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuZnJlcXVlbmN5LmFtcGxpdHVkZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBkYXRhLmZyZXF1ZW5jeS5yZWFsUGFydFtpXSA9IChkYXRhLmZyZXF1ZW5jeS5hbXBsaXR1ZGVbaV0gKiBkYXRhLmZyZXF1ZW5jeS5hbXBsaXR1ZGUubGVuZ3RoKSAvICgyICogTWF0aC5zcXJ0KDEgKyBNYXRoLnBvdyhNYXRoLnRhbihkYXRhLmZyZXF1ZW5jeS5waGFzZVtpXSksIDIpKSk7XHJcbiAgICAgIGRhdGEuZnJlcXVlbmN5LmltYWdQYXJ0W2ldID0gZGF0YS5mcmVxdWVuY3kucmVhbFBhcnRbaV0gKiBNYXRoLnRhbihkYXRhLmZyZXF1ZW5jeS5waGFzZVtpXSk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vT3RoZXJ3aXNlIHN0b3JlIGl0IHdpdGhvdXQgYWRkcmVzcyBhc3NvY2lhdGlvblxyXG4gICAgZGF0YS5mcmVxdWVuY3kucmVhbFBhcnQgPSBmZnRSZWFsUGFydC5tYXAoZnVuY3Rpb24gKG51bSkge1xyXG4gICAgICByZXR1cm4gbnVtO1xyXG4gICAgfSk7XHJcbiAgICBkYXRhLmZyZXF1ZW5jeS5pbWFnUGFydCA9IGZmdEltYWdQYXJ0Lm1hcChmdW5jdGlvbiAobnVtKSB7XHJcbiAgICAgIHJldHVybiBudW07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vQXV4aWxpYXJpZXMgdmFyaWFibGVzIGZvciBGRlQgcHJvY2Vzc2luZyB3aXRob3V0IGFkZHJlc3MgYXNzb2NpYXRpb25cclxuICBsZXQgYXV4UmVhbCA9IGRhdGEuZnJlcXVlbmN5LnJlYWxQYXJ0Lm1hcChmdW5jdGlvbiAobnVtKSB7XHJcbiAgICByZXR1cm4gbnVtO1xyXG4gIH0pO1xyXG4gIGxldCBhdXhJbWFnID0gZGF0YS5mcmVxdWVuY3kuaW1hZ1BhcnQubWFwKGZ1bmN0aW9uIChudW0pIHtcclxuICAgIHJldHVybiBudW07XHJcbiAgfSk7XHJcblxyXG4gIC8vUGVyZm9ybSB0aGUgaW52ZXJzZSB0cmFuc2Zvcm1cclxuICBbZGF0YS50aW1lLmltYWdQYXJ0LCBkYXRhLnRpbWUucmVhbFBhcnRdID0gaW52ZXJzZVRyYW5zZm9ybShhdXhSZWFsLCBhdXhJbWFnKTtcclxuXHJcbiAgLy9SZW1vdmUgYW1wbGl0dWRlIHZhbHVlcyB1bmRlciAxMF4tMyAoZGVmYXVsdCkgYW5kLCB0aHVzLCBpdCdzIHJlc3BlY3RpdmUgcGhhc2UgdmFsdWVzXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLnRpbWUuaW1hZ1BhcnQubGVuZ3RoOyBpKyspIHtcclxuICAgIGlmIChkYXRhLnRpbWUuaW1hZ1BhcnRbaV0gPCBpZ25vcmVJbWFnQW1wbGl0dWRlc0xvd2VyVGhhbikge1xyXG4gICAgICBkYXRhLnRpbWUuaW1hZ1BhcnRbaV0gPSAwO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy9SZXR1cm4gdGhlIHdob2xlIHRoaW5nXHJcbiAgcmV0dXJuIGRhdGE7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogQ29tcHV0ZXMgdGhlIGRpc2NyZXRlIEZvdXJpZXIgdHJhbnNmb3JtIChERlQpIG9mIHRoZSBnaXZlbiBjb21wbGV4IHZlY3Rvciwgc3RvcmluZyB0aGUgcmVzdWx0IGJhY2sgaW50byB0aGUgdmVjdG9yLlxyXG4gKiBUaGUgdmVjdG9yIGNhbiBoYXZlIGFueSBsZW5ndGguIFRoaXMgaXMgYSB3cmFwcGVyIGZ1bmN0aW9uLlxyXG4gKiBAcGFyYW0gcmVhbCBcclxuICogQHBhcmFtIGltYWcgXHJcbiAqIEByZXR1cm5zIFxyXG4gKi9cclxuZnVuY3Rpb24gdHJhbnNmb3JtKHJlYWw6IG51bWJlcltdLCBpbWFnOiBudW1iZXJbXSk6IEFycmF5PG51bWJlcltdPiB7XHJcbiAgdmFyIG4gPSByZWFsLmxlbmd0aDtcclxuICBpZiAobiAhPSBpbWFnLmxlbmd0aClcclxuICAgIHRocm93IFwiTWlzbWF0Y2hlZCBsZW5ndGhzXCI7XHJcbiAgaWYgKG4gPT0gMClcclxuICAgIHJldHVybiBbXTtcclxuICBlbHNlIGlmICgobiAmIChuIC0gMSkpID09IDApIC8vIElzIHBvd2VyIG9mIDJcclxuICAgIHJldHVybiB0cmFuc2Zvcm1SYWRpeDIocmVhbCwgaW1hZyk7XHJcbiAgZWxzZSAvLyBNb3JlIGNvbXBsaWNhdGVkIGFsZ29yaXRobSBmb3IgYXJiaXRyYXJ5IHNpemVzXHJcbiAgICByZXR1cm4gdHJhbnNmb3JtQmx1ZXN0ZWluKHJlYWwsIGltYWcpO1xyXG59XHJcblxyXG4vKipcclxuICogQ29tcHV0ZXMgdGhlIGludmVyc2UgZGlzY3JldGUgRm91cmllciB0cmFuc2Zvcm0gKElERlQpIG9mIHRoZSBnaXZlbiBjb21wbGV4IHZlY3Rvciwgc3RvcmluZyB0aGUgcmVzdWx0IGJhY2sgaW50byB0aGUgdmVjdG9yLlxyXG4gKiBUaGUgdmVjdG9yIGNhbiBoYXZlIGFueSBsZW5ndGguIFRoaXMgaXMgYSB3cmFwcGVyIGZ1bmN0aW9uLiBUaGlzIHRyYW5zZm9ybSBkb2VzIG5vdCBwZXJmb3JtIHNjYWxpbmcsIHNvIHRoZSBpbnZlcnNlIGlzIG5vdCBhIHRydWUgaW52ZXJzZS5cclxuICogQHBhcmFtIHJlYWwgXHJcbiAqIEBwYXJhbSBpbWFnIFxyXG4gKiBAcmV0dXJucyBcclxuICovXHJcbmZ1bmN0aW9uIGludmVyc2VUcmFuc2Zvcm0ocmVhbDogbnVtYmVyW10sIGltYWc6IG51bWJlcltdKTogQXJyYXk8bnVtYmVyW10+IHtcclxuICByZXR1cm4gdHJhbnNmb3JtKGltYWcsIHJlYWwpO1xyXG59XHJcblxyXG4vKipcclxuICogQ29tcHV0ZXMgdGhlIGRpc2NyZXRlIEZvdXJpZXIgdHJhbnNmb3JtIChERlQpIG9mIHRoZSBnaXZlbiBjb21wbGV4IHZlY3Rvciwgc3RvcmluZyB0aGUgcmVzdWx0IGJhY2sgaW50byB0aGUgdmVjdG9yLlxyXG4gKiBUaGUgdmVjdG9yJ3MgbGVuZ3RoIG11c3QgYmUgYSBwb3dlciBvZiAyLiBVc2VzIHRoZSBDb29sZXktVHVrZXkgZGVjaW1hdGlvbi1pbi10aW1lIHJhZGl4LTIgYWxnb3JpdGhtLlxyXG4gKiBAcGFyYW0gcmVhbCBcclxuICogQHBhcmFtIGltYWcgXHJcbiAqIEByZXR1cm5zIFxyXG4gKi9cclxuZnVuY3Rpb24gdHJhbnNmb3JtUmFkaXgyKHJlYWw6IG51bWJlcltdLCBpbWFnOiBudW1iZXJbXSk6IEFycmF5PG51bWJlcltdPiB7XHJcbiAgLy8gTGVuZ3RoIHZhcmlhYmxlc1xyXG4gIHZhciBuID0gcmVhbC5sZW5ndGg7XHJcbiAgaWYgKG4gIT0gaW1hZy5sZW5ndGgpXHJcbiAgICB0aHJvdyBcIk1pc21hdGNoZWQgbGVuZ3Roc1wiO1xyXG4gIGlmIChuID09IDEpIC8vIFRyaXZpYWwgdHJhbnNmb3JtXHJcbiAgICByZXR1cm4gW107XHJcbiAgdmFyIGxldmVscyA9IC0xO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgMzI7IGkrKykge1xyXG4gICAgaWYgKDEgPDwgaSA9PSBuKVxyXG4gICAgICBsZXZlbHMgPSBpOyAvLyBFcXVhbCB0byBsb2cyKG4pXHJcbiAgfVxyXG4gIGlmIChsZXZlbHMgPT0gLTEpXHJcbiAgICB0aHJvdyBcIkxlbmd0aCBpcyBub3QgYSBwb3dlciBvZiAyXCI7XHJcblxyXG4gIC8vIFRyaWdvbm9tZXRyaWMgdGFibGVzXHJcbiAgdmFyIGNvc1RhYmxlID0gbmV3IEFycmF5KG4gLyAyKTtcclxuICB2YXIgc2luVGFibGUgPSBuZXcgQXJyYXkobiAvIDIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbiAvIDI7IGkrKykge1xyXG4gICAgY29zVGFibGVbaV0gPSBNYXRoLmNvcygyICogTWF0aC5QSSAqIGkgLyBuKTtcclxuICAgIHNpblRhYmxlW2ldID0gTWF0aC5zaW4oMiAqIE1hdGguUEkgKiBpIC8gbik7XHJcbiAgfVxyXG5cclxuICAvLyBCaXQtcmV2ZXJzZWQgYWRkcmVzc2luZyBwZXJtdXRhdGlvblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcbiAgICB2YXIgaiA9IHJldmVyc2VCaXRzKGksIGxldmVscyk7XHJcbiAgICBpZiAoaiA+IGkpIHtcclxuICAgICAgdmFyIHRlbXAgPSByZWFsW2ldO1xyXG4gICAgICByZWFsW2ldID0gcmVhbFtqXTtcclxuICAgICAgcmVhbFtqXSA9IHRlbXA7XHJcbiAgICAgIHRlbXAgPSBpbWFnW2ldO1xyXG4gICAgICBpbWFnW2ldID0gaW1hZ1tqXTtcclxuICAgICAgaW1hZ1tqXSA9IHRlbXA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBDb29sZXktVHVrZXkgZGVjaW1hdGlvbi1pbi10aW1lIHJhZGl4LTIgRkZUXHJcbiAgZm9yICh2YXIgc2l6ZSA9IDI7IHNpemUgPD0gbjsgc2l6ZSAqPSAyKSB7XHJcbiAgICB2YXIgaGFsZnNpemUgPSBzaXplIC8gMjtcclxuICAgIHZhciB0YWJsZXN0ZXAgPSBuIC8gc2l6ZTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSArPSBzaXplKSB7XHJcbiAgICAgIGZvciAodmFyIGogPSBpLCBrID0gMDsgaiA8IGkgKyBoYWxmc2l6ZTsgaisrLCBrICs9IHRhYmxlc3RlcCkge1xyXG4gICAgICAgIHZhciBsID0gaiArIGhhbGZzaXplO1xyXG4gICAgICAgIHZhciB0cHJlID0gcmVhbFtsXSAqIGNvc1RhYmxlW2tdICsgaW1hZ1tsXSAqIHNpblRhYmxlW2tdO1xyXG4gICAgICAgIHZhciB0cGltID0gLXJlYWxbbF0gKiBzaW5UYWJsZVtrXSArIGltYWdbbF0gKiBjb3NUYWJsZVtrXTtcclxuICAgICAgICByZWFsW2xdID0gcmVhbFtqXSAtIHRwcmU7XHJcbiAgICAgICAgaW1hZ1tsXSA9IGltYWdbal0gLSB0cGltO1xyXG4gICAgICAgIHJlYWxbal0gKz0gdHByZTtcclxuICAgICAgICBpbWFnW2pdICs9IHRwaW07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBbcmVhbCwgaW1hZ107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBpbnRlZ2VyIHdob3NlIHZhbHVlIGlzIHRoZSByZXZlcnNlIG9mIHRoZSBsb3dlc3QgJ2JpdHMnIGJpdHMgb2YgdGhlIGludGVnZXIgJ3gnLlxyXG4gKiBAcGFyYW0geCBcclxuICogQHBhcmFtIGJpdHMgXHJcbiAqIEByZXR1cm5zIFxyXG4gKi9cclxuZnVuY3Rpb24gcmV2ZXJzZUJpdHMoeDogbnVtYmVyLCBiaXRzOiBudW1iZXIpOiBudW1iZXIge1xyXG4gIHZhciB5ID0gMDtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGJpdHM7IGkrKykge1xyXG4gICAgeSA9ICh5IDw8IDEpIHwgKHggJiAxKTtcclxuICAgIHggPj4+PSAxO1xyXG4gIH1cclxuICByZXR1cm4geTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbXB1dGVzIHRoZSBkaXNjcmV0ZSBGb3VyaWVyIHRyYW5zZm9ybSAoREZUKSBvZiB0aGUgZ2l2ZW4gY29tcGxleCB2ZWN0b3IsIHN0b3JpbmcgdGhlIHJlc3VsdCBiYWNrIGludG8gdGhlIHZlY3Rvci5cclxuICogVGhlIHZlY3RvciBjYW4gaGF2ZSBhbnkgbGVuZ3RoLiBUaGlzIHJlcXVpcmVzIHRoZSBjb252b2x1dGlvbiBmdW5jdGlvbiwgd2hpY2ggaW4gdHVybiByZXF1aXJlcyB0aGUgcmFkaXgtMiBGRlQgZnVuY3Rpb24uXHJcbiAqIFVzZXMgQmx1ZXN0ZWluJ3MgY2hpcnAgei10cmFuc2Zvcm0gYWxnb3JpdGhtLlxyXG4gKiBAcGFyYW0gcmVhbCBcclxuICogQHBhcmFtIGltYWcgXHJcbiAqIEByZXR1cm5zIFxyXG4gKi9cclxuZnVuY3Rpb24gdHJhbnNmb3JtQmx1ZXN0ZWluKHJlYWw6IG51bWJlcltdLCBpbWFnOiBudW1iZXJbXSk6IEFycmF5PG51bWJlcltdPiB7XHJcbiAgLy8gRmluZCBhIHBvd2VyLW9mLTIgY29udm9sdXRpb24gbGVuZ3RoIG0gc3VjaCB0aGF0IG0gPj0gbiAqIDIgKyAxXHJcbiAgdmFyIG4gPSByZWFsLmxlbmd0aDtcclxuICBpZiAobiAhPSBpbWFnLmxlbmd0aClcclxuICAgIHRocm93IFwiTWlzbWF0Y2hlZCBsZW5ndGhzXCI7XHJcbiAgdmFyIG0gPSAxO1xyXG4gIHdoaWxlIChtIDwgbiAqIDIgKyAxKVxyXG4gICAgbSAqPSAyO1xyXG5cclxuICAvLyBUcmlnb25vbWV0cmljIHRhYmxlc1xyXG4gIHZhciBjb3NUYWJsZSA9IG5ldyBBcnJheShuKTtcclxuICB2YXIgc2luVGFibGUgPSBuZXcgQXJyYXkobik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpKyspIHtcclxuICAgIHZhciBqID0gaSAqIGkgJSAobiAqIDIpOyAvLyBUaGlzIGlzIG1vcmUgYWNjdXJhdGUgdGhhbiBqID0gaSAqIGlcclxuICAgIGNvc1RhYmxlW2ldID0gTWF0aC5jb3MoTWF0aC5QSSAqIGogLyBuKTtcclxuICAgIHNpblRhYmxlW2ldID0gTWF0aC5zaW4oTWF0aC5QSSAqIGogLyBuKTtcclxuICB9XHJcblxyXG4gIC8vIFRlbXBvcmFyeSB2ZWN0b3JzIGFuZCBwcmVwcm9jZXNzaW5nXHJcbiAgdmFyIGFyZWFsID0gbmV3QXJyYXlPZlplcm9zKG0pO1xyXG4gIHZhciBhaW1hZyA9IG5ld0FycmF5T2ZaZXJvcyhtKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgYXJlYWxbaV0gPSByZWFsW2ldICogY29zVGFibGVbaV0gKyBpbWFnW2ldICogc2luVGFibGVbaV07XHJcbiAgICBhaW1hZ1tpXSA9IC1yZWFsW2ldICogc2luVGFibGVbaV0gKyBpbWFnW2ldICogY29zVGFibGVbaV07XHJcbiAgfVxyXG4gIHZhciBicmVhbCA9IG5ld0FycmF5T2ZaZXJvcyhtKTtcclxuICB2YXIgYmltYWcgPSBuZXdBcnJheU9mWmVyb3MobSk7XHJcbiAgYnJlYWxbMF0gPSBjb3NUYWJsZVswXTtcclxuICBiaW1hZ1swXSA9IHNpblRhYmxlWzBdO1xyXG4gIGZvciAodmFyIGkgPSAxOyBpIDwgbjsgaSsrKSB7XHJcbiAgICBicmVhbFtpXSA9IGJyZWFsW20gLSBpXSA9IGNvc1RhYmxlW2ldO1xyXG4gICAgYmltYWdbaV0gPSBiaW1hZ1ttIC0gaV0gPSBzaW5UYWJsZVtpXTtcclxuICB9XHJcblxyXG4gIC8vIENvbnZvbHV0aW9uXHJcbiAgdmFyIGNSZWFsID0gbmV3IEFycmF5KG0pO1xyXG4gIHZhciBjSW1hZyA9IG5ldyBBcnJheShtKTtcclxuICBjb252b2x2ZUNvbXBsZXgoYXJlYWwsIGFpbWFnLCBicmVhbCwgYmltYWcsIGNSZWFsLCBjSW1hZyk7XHJcblxyXG4gIC8vIFBvc3Rwcm9jZXNzaW5nXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpKyspIHtcclxuICAgIHJlYWxbaV0gPSBjUmVhbFtpXSAqIGNvc1RhYmxlW2ldICsgY0ltYWdbaV0gKiBzaW5UYWJsZVtpXTtcclxuICAgIGltYWdbaV0gPSAtY1JlYWxbaV0gKiBzaW5UYWJsZVtpXSArIGNJbWFnW2ldICogY29zVGFibGVbaV07XHJcbiAgfVxyXG5cclxuICByZXR1cm4gW3JlYWwsIGltYWddO1xyXG59XHJcblxyXG4vKipcclxuICogQ29tcHV0ZXMgdGhlIGNpcmN1bGFyIGNvbnZvbHV0aW9uIG9mIHRoZSBnaXZlbiByZWFsIHZlY3RvcnMuIEVhY2ggdmVjdG9yJ3MgbGVuZ3RoIG11c3QgYmUgdGhlIHNhbWUuXHJcbiAqIEBwYXJhbSB4IFxyXG4gKiBAcGFyYW0geSBcclxuICogQHBhcmFtIG91dCBcclxuICovXHJcbmZ1bmN0aW9uIGNvbnZvbHZlUmVhbCh4OiBudW1iZXJbXSwgeTogbnVtYmVyW10sIG91dDogbnVtYmVyW10pOiB2b2lkIHtcclxuICB2YXIgbiA9IHgubGVuZ3RoO1xyXG4gIGlmIChuICE9IHkubGVuZ3RoIHx8IG4gIT0gb3V0Lmxlbmd0aClcclxuICAgIHRocm93IFwiTWlzbWF0Y2hlZCBsZW5ndGhzXCI7XHJcbiAgY29udm9sdmVDb21wbGV4KHgsIG5ld0FycmF5T2ZaZXJvcyhuKSwgeSwgbmV3QXJyYXlPZlplcm9zKG4pLCBvdXQsIG5ld0FycmF5T2ZaZXJvcyhuKSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb21wdXRlcyB0aGUgY2lyY3VsYXIgY29udm9sdXRpb24gb2YgdGhlIGdpdmVuIGNvbXBsZXggdmVjdG9ycy4gRWFjaCB2ZWN0b3IncyBsZW5ndGggbXVzdCBiZSB0aGUgc2FtZS5cclxuICogQHBhcmFtIHhSZWFsIFxyXG4gKiBAcGFyYW0geEltYWcgXHJcbiAqIEBwYXJhbSB5UmVhbCBcclxuICogQHBhcmFtIHlJbWFnIFxyXG4gKiBAcGFyYW0gb3V0UmVhbCBcclxuICogQHBhcmFtIG91dEltYWcgXHJcbiAqL1xyXG5mdW5jdGlvbiBjb252b2x2ZUNvbXBsZXgoeFJlYWw6IG51bWJlcltdLCB4SW1hZzogbnVtYmVyW10sIHlSZWFsOiBudW1iZXJbXSwgeUltYWc6IG51bWJlcltdLCBvdXRSZWFsOiBudW1iZXJbXSwgb3V0SW1hZzogbnVtYmVyW10pOiB2b2lkIHtcclxuICB2YXIgbiA9IHhSZWFsLmxlbmd0aDtcclxuICBpZiAobiAhPSB4SW1hZy5sZW5ndGggfHwgbiAhPSB5UmVhbC5sZW5ndGggfHwgbiAhPSB5SW1hZy5sZW5ndGggfHxcclxuICAgIG4gIT0gb3V0UmVhbC5sZW5ndGggfHwgbiAhPSBvdXRJbWFnLmxlbmd0aClcclxuICAgIHRocm93IFwiTWlzbWF0Y2hlZCBsZW5ndGhzXCI7XHJcblxyXG4gIHhSZWFsID0geFJlYWwuc2xpY2UoKTtcclxuICB4SW1hZyA9IHhJbWFnLnNsaWNlKCk7XHJcbiAgeVJlYWwgPSB5UmVhbC5zbGljZSgpO1xyXG4gIHlJbWFnID0geUltYWcuc2xpY2UoKTtcclxuICB0cmFuc2Zvcm0oeFJlYWwsIHhJbWFnKTtcclxuICB0cmFuc2Zvcm0oeVJlYWwsIHlJbWFnKTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpKyspIHtcclxuICAgIHZhciB0ZW1wID0geFJlYWxbaV0gKiB5UmVhbFtpXSAtIHhJbWFnW2ldICogeUltYWdbaV07XHJcbiAgICB4SW1hZ1tpXSA9IHhJbWFnW2ldICogeVJlYWxbaV0gKyB4UmVhbFtpXSAqIHlJbWFnW2ldO1xyXG4gICAgeFJlYWxbaV0gPSB0ZW1wO1xyXG4gIH1cclxuICBpbnZlcnNlVHJhbnNmb3JtKHhSZWFsLCB4SW1hZyk7XHJcblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSB7IC8vIFNjYWxpbmcgKGJlY2F1c2UgdGhpcyBGRlQgaW1wbGVtZW50YXRpb24gb21pdHMgaXQpXHJcbiAgICBvdXRSZWFsW2ldID0geFJlYWxbaV0gLyBuO1xyXG4gICAgb3V0SW1hZ1tpXSA9IHhJbWFnW2ldIC8gbjtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYW4gYXJyYXkgb2Ygc2l6ZSBgbmAgd2l0aCB6ZXJvc1xyXG4gKiBAcGFyYW0gbiBhcnJheSBzaXplXHJcbiAqIEByZXR1cm5zIHRoZSByZXN1bHRpbmcgYXJyYXlcclxuICovXHJcbmZ1bmN0aW9uIG5ld0FycmF5T2ZaZXJvcyhuOiBudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgdmFyIHJlc3VsdCA9IFtdO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSsrKVxyXG4gICAgcmVzdWx0LnB1c2goMCk7XHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufSJdLCJuYW1lcyI6WyJfX3dlYnBhY2tfcmVxdWlyZV9fIiwiZXhwb3J0cyIsImRlZmluaXRpb24iLCJrZXkiLCJvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0Iiwib2JqIiwicHJvcCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwidmFsdWUiLCJmZnQiLCJzaWduYWwiLCJmcyIsImltYWdQYXJ0IiwiaWdub3JlRmZ0QW1wbGl0dWRlc0xvd2VyVGhhbiIsImRhdGEiLCJ0aW1lIiwicmVhbFBhcnQiLCJmcmVxdWVuY3kiLCJhbXBsaXR1ZGUiLCJwaGFzZSIsInNhbXBsaW5nVGltZSIsImxlbmd0aCIsImkiLCJuZXdBcnJheU9mWmVyb3MiLCJhdXhSZWFsIiwibWFwIiwibnVtIiwiYXV4SW1hZyIsInRyYW5zZm9ybSIsIk1hdGgiLCJzcXJ0IiwicG93IiwiYXRhbjIiLCJzb3J0QXJyYXlBdXgiLCJzbGljZSIsInJldmVyc2UiLCJmb3JFYWNoIiwiZWwiLCJ1bnNoaWZ0IiwicG9wIiwiaWZmdCIsImZmdFJlYWxQYXJ0IiwiZmZ0SW1hZ1BhcnQiLCJpZ25vcmVJbWFnQW1wbGl0dWRlc0xvd2VyVGhhbiIsImFicyIsInJlZHVjZSIsImEiLCJiIiwibWF4IiwidGFuIiwiaW52ZXJzZVRyYW5zZm9ybSIsInJlYWwiLCJpbWFnIiwibiIsImxldmVscyIsImNvc1RhYmxlIiwiQXJyYXkiLCJzaW5UYWJsZSIsImNvcyIsIlBJIiwic2luIiwiaiIsInJldmVyc2VCaXRzIiwidGVtcCIsInNpemUiLCJoYWxmc2l6ZSIsInRhYmxlc3RlcCIsImsiLCJsIiwidHByZSIsInRwaW0iLCJ0cmFuc2Zvcm1SYWRpeDIiLCJtIiwiYXJlYWwiLCJhaW1hZyIsImJyZWFsIiwiYmltYWciLCJjUmVhbCIsImNJbWFnIiwieFJlYWwiLCJ4SW1hZyIsInlSZWFsIiwieUltYWciLCJvdXRSZWFsIiwib3V0SW1hZyIsImNvbnZvbHZlQ29tcGxleCIsInRyYW5zZm9ybUJsdWVzdGVpbiIsIngiLCJiaXRzIiwieSIsInJlc3VsdCIsInB1c2giXSwic291cmNlUm9vdCI6IiJ9
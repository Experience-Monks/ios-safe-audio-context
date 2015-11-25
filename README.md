# ios-safe-audio-context

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Creates a `AudioContext` that works as expected in desktop and mobile, particularly across iOS devices.

### Motivation

There is a [bug in iOS](http://stackoverflow.com/questions/26336040/how-to-fix-changing-sample-rate-bug) where the AudioContext `sampleRate` is sometimes not what you would expect, and as a result, all WebAudio plays with heavy distortion. This occurs when you play an audio/video element with a different sample rate, or when you first boot up Safari (tested on iOS9.2, iPhone5S, no headphones).

To get around this, we try to detect a broken state, and if so, play a dummy buffer before returning a *new* AudioContext which should have the desired sample rate (default 44100).

## Example

On iOS, this function must be called from user gesture event, such as `touchend`.

```js
const createAudioContext = require('ios-safe-audio-context')

clickToPlay.addEventListener('touchend', () => {
  const audioContext = createAudioContext()
  
  // now you can use this context for playback
})
```

## Usage

[![NPM](https://nodei.co/npm/ios-safe-audio-context.png)](https://www.npmjs.com/package/ios-safe-audio-context)

#### `context = createAudioContext([desiredSampleRate])`

Returns a new AudioContext, only applying the hack if we detect a broken state (iOS). `desiredSampleRate` defaults to 44100.

## License

MIT, see [LICENSE.md](http://github.com/Jam3/ios-safe-audio-context/blob/master/LICENSE.md) for details.

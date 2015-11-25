module.exports = createAudioContext
function createAudioContext (desiredSampleRate) {
  var AudioCtor = window.AudioContext || window.webkitAudioContext

  desiredSampleRate = typeof desiredSampleRate === 'number'
    ? desiredSampleRate
    : 44100
  var context = new AudioCtor()

  // Check if hack is necessary. Only occurs in iOS6+ devices
  // and only when you first boot the iPhone, or play a audio/video
  // with a different sample rate
  if (/(iPhone|iPad)/i.test(navigator.userAgent) &&
      context.sampleRate !== desiredSampleRate) {
    var buffer = context.createBuffer(1, 1, desiredSampleRate)
    var dummy = context.createBufferSource()
    dummy.buffer = buffer
    dummy.connect(context.destination)
    dummy.start(0)
    dummy.disconnect()
    
    context.close() // dispose old context
    context = new AudioCtor()
  }

  return context
}

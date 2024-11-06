async function playAudioData(data, sampleRate = 44100) {
  // Create an audio context
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Create an audio buffer with one channel and set its length to match the data array length
  const audioBuffer = audioContext.createBuffer(1, data.length, sampleRate);
  const channelData = audioBuffer.getChannelData(0);

  // Copy the data array into the audio buffer's channel data
  for (let i = 0; i < data.length; i++) {
    channelData[i] = data[i];
  }

  // Create a buffer source and set its buffer to the audio buffer
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;

  // Connect the source to the audio context's destination (speakers) and start playback
  source.connect(audioContext.destination);
  source.start();
}

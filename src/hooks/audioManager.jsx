let audioManagerInstance = null;

export class AudioManager {
  constructor(url) {
    if (audioManagerInstance) {
      console.log('AudioManager instance already exists.');
      return audioManagerInstance;
    }

    console.log('Creating new AudioManager instance.');
    this.context = new (window.AudioContext || window.AudioContext)();
    this.gainNode = this.context.createGain();
    this.gainNode.gain.value = 1; // Default volume
    this.loadAudio(url);
    audioManagerInstance = this;
  }

  async loadAudio(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.context.decodeAudioData(arrayBuffer);
    this.source = this.context.createBufferSource();
    this.source.buffer = audioBuffer;
    this.source.loop = true;
    this.source.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.source.start();
    console.log('Audio started playing.');
  }

  setVolume(value) {
    if (this.gainNode) {
      this.gainNode.gain.value = value;
    }
  }

  static getInstance(url) {
    if (!audioManagerInstance) {
      return new AudioManager(url);
    }
    return audioManagerInstance;
  }
}
// Audio function
export async function createAudio(url, volume) {
  const res = await fetch(url)
  const buffer = await res.arrayBuffer()
  const context = new (window.AudioContext || window.AudioContext)()
  const source = context.createBufferSource()
  source.buffer = await new Promise((res) => context.decodeAudioData(buffer, res))
  source.loop = true

  const gain = context.createGain()
  gain.gain.value = 1 // Set the volume

  const analyser = context.createAnalyser()
  analyser.fftSize = 2048
  source.connect(analyser)
  analyser.connect(gain)

  const data = new Uint8Array(analyser.frequencyBinCount)

  source.start(0)

  return {
    url,
    context,
    source,
    gain,
    data,
    volume,
    update: () => {
      analyser.getByteFrequencyData(data)
      return (data.avg = data.reduce((prev, cur) => prev + cur / data.length, 0))
    },
    setVolume: (volume) => {
      gain.gain.value = volume // Update the volume value
    },
  }
}
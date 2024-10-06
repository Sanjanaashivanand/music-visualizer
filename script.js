const canvas = document.getElementById("canvas");
const audioInput = document.getElementById("audio");
const audioPlayer = document.getElementById("audioPlayer");

let audioContext;
let analyser;
let source;
let frequencyData;
let isPlaying = false;

audioInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    loadAudioFile(file);
  }
});

function loadAudioFile(file) {
  // Stop and disconnect the old source if it exists
  if (source) {
    source.stop();
    source.disconnect();
  }

  const reader = new FileReader();

  reader.addEventListener("load", (event) => {
    const arrayBuffer = event.target.result;

    // Initialize the audio context
    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
      setupVisualizer(audioBuffer);
      // Load the audio into the player
      audioPlayer.src = URL.createObjectURL(file);
      audioPlayer.play();
    });
  });

  reader.readAsArrayBuffer(file);
}

function setupVisualizer(audioBuffer) {
  analyser = audioContext.createAnalyser();
  analyser.fftSize = 256;
  frequencyData = new Uint8Array(analyser.frequencyBinCount);

  // Create a new source from the buffer
  source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(analyser);
  analyser.connect(audioContext.destination);

  // Connect to the audio element
  const track = audioContext.createMediaElementSource(audioPlayer);
  track.connect(analyser);
  analyser.connect(audioContext.destination);

  // Start drawing when audio is played
  audioPlayer.addEventListener("play", () => {
    isPlaying = true;
    draw();
  });

  // Stop visualizer when audio is paused
  audioPlayer.addEventListener("pause", () => {
    isPlaying = false;
  });

  // Stop visualizer when audio ends
  audioPlayer.addEventListener("ended", () => {
    isPlaying = false;
  });
}

function draw() {
  if (!isPlaying) return;  // Stop drawing if not playing

  requestAnimationFrame(draw);
  const canvasContext = canvas.getContext("2d");
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  const barWidth = canvas.width / frequencyData.length;

  // Clear the canvas
  canvasContext.fillStyle = "black";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  analyser.getByteFrequencyData(frequencyData);

  // Draw frequency bars
  for (let i = 0; i < frequencyData.length; i++) {
    const barHeight = frequencyData[i];
    canvasContext.fillStyle = `rgb(${barHeight}, 162, 235)`; // Customize bar color here
    canvasContext.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 1, barHeight);
  }
}

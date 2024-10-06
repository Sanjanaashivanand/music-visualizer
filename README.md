# Music Visualizer

This project is a simple music visualizer that displays audio frequency data in real-time using an HTML canvas. The visualizer responds to the audio file played and generates dynamic graphical representations of sound frequencies.


https://github.com/user-attachments/assets/369cb012-eb90-4838-9fa1-87ad244e9434


## Technologies Used

- **HTML**: Used for structuring the web page, including the audio player and canvas for visualization.
- **CSS**: Used for styling the application, creating a visually appealing interface with a cosmic blue and violet color palette.
- **JavaScript**: Used for the main logic of the application, handling audio file uploads, playback, and frequency visualization.
  - **Web Audio API**: Utilized to decode audio data, analyze audio frequencies, and control audio playback.
  - **FileReader API**: Used to read audio files uploaded by the user.

## Audio Frequency Logic


The audio visualization is based on the analysis of audio frequency data using the Web Audio API. Here's a brief overview of how it works:

1. **Audio Context**: An `AudioContext` is created to manage and play audio. This context is the foundation for all audio operations.
  
2. **Loading Audio Files**: When a user uploads an audio file, the `FileReader` reads it as an array buffer. This buffer is then decoded into an audio buffer that the audio context can work with.

3. **Analyser Node**: An `AnalyserNode` is created to extract frequency data from the audio source. The FFT (Fast Fourier Transform) size is set to define how finely the frequency data will be divided. A typical value for real-time analysis is 256.

4. **Drawing the Visualization**:
   - The `draw` function repeatedly retrieves the frequency data from the analyser node using `getByteFrequencyData()`.
   - The canvas is cleared and filled with a background color.
   - The frequency data is used to draw bars on the canvas, representing different frequency ranges. The height of each bar corresponds to the amplitude of that frequency range, creating a dynamic visualization that reacts to the audio being played.

5. **Playback Control**: The audio player allows users to control playback (play, pause, etc.), and the visualizer responds accordingly, stopping the visual updates when the audio is paused or ended.

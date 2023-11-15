// renderer.js
document.getElementById('start-btn').addEventListener('click', () => {
  window.electron.startRecording();
});

document.getElementById('stop-btn').addEventListener('click', () => {
  window.electron.stopRecording();
});

window.electron.onRecordingStarted(() => {
  document.getElementById('start-btn').disabled = true;
  document.getElementById('stop-btn').disabled = false;
});

window.electron.onRecordingStopped(() => {
  document.getElementById('start-btn').disabled = false;
  document.getElementById('stop-btn').disabled = true;
});

const transcriptionDiv = document.getElementById('transcription');

window.electron.onTranscriptionResult((event, text) => {
  transcriptionDiv.textContent = text;
});

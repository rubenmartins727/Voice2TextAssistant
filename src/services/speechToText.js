const speech = require('@google-cloud/speech');
const recorder = require('node-record-lpcm16');

// Define o caminho para o arquivo de credenciais
process.env.GOOGLE_APPLICATION_CREDENTIALS = '/Users/rubenmartins727/Documents/personalInfo/advance-lacing-405217-b5a7fb5f886e.json';

const client = new speech.SpeechClient();

let recognizeStream = null;
let recorderProcess = null;

// Configuração do reconhecimento de voz
const requestConfig = {
  config: {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US', // ou 'pt-BR' para português
  },
  interimResults: true, // Obter resultados intermediários
};

// Configuração da gravação
const recordingOptions = {
  sampleRateHertz: 16000,
  channels: 1,
  format: 'S16_LE',
  silence: '10.0',
  threshold: 0,
  recordProgram: 'sox', // ou 'sox' ou 'arecord'
};

function startRecording(mainWindow) {
  if (recorderProcess) {
    console.log('Gravação já está em andamento.');
    return;
  }

  // Inicia o reconhecimento de voz
  recognizeStream = client
    .streamingRecognize(requestConfig)
    .on('data', data => {
      if (data.results[0] && data.results[0].alternatives[0]) {
        console.log(`Transcrição: ${data.results[0].alternatives[0].transcript}`);
        const transcription = data.results[0].alternatives[0].transcript;
        // Envia a transcrição para o processo de renderização
        mainWindow.webContents.send('transcription-result', transcription);
      }
    })
    .on('error', (e) => {
      console.error('Erro no reconhecimento de voz:', e);
    })
    .on('end', () => {
      console.log('Reconhecimento de voz encerrado.');
    });

  // Inicia a gravação do microfone e envia os dados para o reconhecimento de voz
  recorderProcess = recorder.record(recordingOptions)
    .stream()
    .on('error', (e) => {
      console.error('Erro na gravação:', e);
    });

  recorderProcess.pipe(recognizeStream);
  console.log('Gravação iniciada.');
}

function stopRecording(mainWindow) {
    if (!recorderProcess) {
      console.log('Não há gravação em andamento.');
      return;
    }
  
    // Finaliza o stream de gravação, o que deve também parar o recognizeStream.
    recorderProcess.unpipe();
    recorderProcess = null;
  
    // Espera-se que o recognizeStream seja finalizado naturalmente após a gravação parar.
    // Se precisar finalizá-lo manualmente, remova o comentário da linha abaixo.
    // recognizeStream.end();
  
    console.log('Gravação parada.');
  }
  

module.exports = { startRecording, stopRecording };

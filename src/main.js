const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { startRecording, stopRecording } = require('./services/speechToText');

let mainWindow;

function createWindow() {
    // Criar a janela do navegador.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: true
        }
    });

    // e carrega o index.html do aplicativo.
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    // Abrir DevTools - Remova isto para produção
    mainWindow.webContents.openDevTools();

    // Evento emitido quando a janela é fechada.
    mainWindow.on('closed', function () {
        // Dereferencie o objeto da janela, geralmente você armazenaria janelas
        // em um array se o seu aplicativo suporta várias janelas, este é o momento
        // quando você deve excluir o elemento correspondente.
        mainWindow = null;
    });
}

// Este método será chamado quando o Electron tiver finalizado
// a inicialização e está pronto para criar janelas do navegador.
// Algumas APIs só podem ser usadas depois que este evento ocorre.
app.on('ready', createWindow);

// Saia quando todas as janelas estiverem fechadas.
app.on('window-all-closed', function () {
    // No macOS, é comum para aplicativos e sua barra de menu
    // permanecerem ativos até o usuário sair explicitamente com Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // No macOS, é comum recriar uma janela no aplicativo quando o
    // ícone da doca é clicado e não há outras janelas abertas.
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('start-recording', (event) => {
    startRecording(mainWindow);
    mainWindow.webContents.send('recording-started');
});

ipcMain.on('stop-recording', (event) => {
    stopRecording(mainWindow);
    mainWindow.webContents.send('recording-stopped');
});

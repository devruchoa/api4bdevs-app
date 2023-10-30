const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {
  // Cria a janela do navegador.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Carrega o arquivo HTML da aplicação.
  mainWindow.loadFile('index.html');

  // Abre o DevTools (Ferramentas de Desenvolvedor).
  mainWindow.webContents.openDevTools();

  // Evento quando a janela é fechada.
  mainWindow.on('closed', function () {
    // Remove a referência do objeto da janela, geralmente você faria isso se o seu aplicativo suportasse várias janelas.
    mainWindow = null;
  });
}

// Este método é chamado quando Electron terminou de inicializar e está pronto para criar janelas do navegador.
// Algumas APIs só podem ser usadas depois que este evento ocorre.
app.on('ready', createWindow);

// Encerra quando todas as janelas estiverem fechadas.
app.on('window-all-closed', function () {
  // No macOS, é comum para aplicativos e suas barras de menu
  // continuarem ativos até que o usuário saia explicitamente com Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // No macOS, é comum recriar uma janela no aplicativo quando o
  // ícone do dock é clicado e não há outras janelas abertas.
  if (mainWindow === null) {
    createWindow();
  }
});
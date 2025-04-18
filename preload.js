/**
 *  preload.js - Usado no framework electron para aumentar a segurança e o desempenho
 */

// Importação dos recursos do framework electron
// ipcRenderer permite estabelecer uma comunicação entre processos (IPC) mains.js - renderer.js
// contextBridge: permissões de comunicação entre processos usando a api do electron
const {ipcRenderer, contextBridge} = require('electron')

// Enviar uma mensagem para o main.js estabelecer uma conexão com o banco de dados quando iniciar a aplicação
// send (enviar)
// db-connect (rótulo para identificar a mensagem)
ipcRenderer.send('db-connect')


// permissões para estabelecer a comunicação entre processos
contextBridge.exposeInMainWorld('api', {
    dbStatus: (message) => ipcRenderer.on('db-status', message),
    aboutExit: () => ipcRenderer.send('about-exit'),
    createNote: (stickyNote) => ipcRenderer.send('create-note', stickyNote),
    // para mandar um argumento vazio, utilizar args(obrigatório no electron) args somente quando .on
    resetForm: (args) => ipcRenderer.on('reset-form', args),
    listNotes: () => ipcRenderer.send('list-notes'),
    renderNotes:(notes) => ipcRenderer.on('render-notes', notes)
})

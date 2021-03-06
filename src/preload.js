//const electron = require('electron');
const { electron, contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld(
  "api", {
    send: (channel, data) => {
      let validChannels = [
        "getUserData",
        "getTranslations",
        "getFileContent",
        "setUserData",
        "getAppData",
        "showNotification",
        "writeToFile",
        "startFileWatcher",
        "changeLanguage",
        "openOrCreateFile"
      ];
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    receive: (channel, func) => {
      let validChannels = [
        "sendTranslations",
        "getFileContent",
        "getUserData",
        "setUserData",
        "getAppData",
        "reloadContent",
        "changeFile",
        "triggerFunction"
      ];
      if (validChannels.includes(channel)) {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    }
  }
);

"use strict";

const path = require("path");
const { app, ipcMain, BrowserWindow } = require("electron");

const TodosStore = require("./TodosStore");
const todosDB = new TodosStore();

function main() {
  let mainWindow = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // kodun çoğu yerinde kullanacağımız için kısayol
  // amacı ile mWebContents değişkenine
  // mainWindow.webContents referansını aktarıyoruz.
  let mWebContents = mainWindow.webContents;

  mainWindow.once("show", () => {
    mWebContents.send("todos", todosDB.todos);
  });

  // renderer tarafı "add-todo" eventi fırlatarak main tarafından
  // todosDB'ye ekleme yapmasını talep eder.
  // Ekleme sonrası main taraf "todos" eventi fırlatarak renderer
  // tarafın todo listesini güncellemesini sağlar.
  ipcMain.on("add-todo", (event, todo) => {
    const updatedTodos = todosDB.addTodo(todo).todos;

    mWebContents.send("todos", updatedTodos);
  });

  // renderer tarafı "delete-todo" eventi fırlatarak main tarafından
  // todosDB'den silme yapmasını talep eder.
  // Silme sonrası main taraf "todos" eventi fırlatarak renderer
  // tarafın todo listesini güncellemesini sağlar.
  ipcMain.on("delete-todo", (event, todo) => {
    const updatedTodos = todosDB.deleteTodo(todo).todos;

    mWebContents.send("todos", updatedTodos);
  });

  // renderer tarafı "load-todos" eventi fırlatarak main tarafından
  // güncel todo listesini göndermesini talep eder.
  ipcMain.on("load-todos", (event, todo) => {
    mWebContents.send("todos", todosDB.todos);
  });

  mainWindow.loadFile(path.join("html-app", "index.html"));

  mWebContents.openDevTools();
}

app.on("ready", main);

app.on("window-all-closed", function () {
  app.quit();
});

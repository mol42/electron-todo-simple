"use strict";

const path = require("path");
const { app, ipcMain } = require("electron");
const { BrowserWindow } = require("electron");

const DataStore = require("./TodosStore");

// create a new todo store name "Todos Main"
const todosDB = new DataStore({ name: "Todos DB" });

function main() {
  let mainWindow = new BrowserWindow({
    width: 500,
    height: 600,
    // update for electron V5+
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.once("show", () => {
    mainWindow.webContents.send("todos", todosDB.todos);
  });

  ipcMain.on("add-todo", (event, todo) => {
    const updatedTodos = todosDB.addTodo(todo).todos;

    mainWindow.send("todos", updatedTodos);
  });

  ipcMain.on("delete-todo", (event, todo) => {
    const updatedTodos = todosDB.deleteTodo(todo).todos;

    mainWindow.send("todos", updatedTodos);
  });

  ipcMain.on("load-todos", (event, todo) => {
    mainWindow.webContents.send("todos", todosDB.todos);
  });

  mainWindow.loadFile(path.join("html-app", "index.html"));

  mainWindow.webContents.openDevTools();
}

app.on("ready", main);

app.on("window-all-closed", function () {
  app.quit();
});

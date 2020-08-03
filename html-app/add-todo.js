"use strict";

const { ipcRenderer } = require("electron");

const state = {
  todoText: ""
};

function setTodoText(event) {
  console.log(event);
  state.todoText = event.target.value;
}

function saveTodo() {
  ipcRenderer.send("add-todo", state.todoText);
  location.href = "index.html";
}

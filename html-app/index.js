"use strict";

const { ipcRenderer } = require("electron");

const deleteTodo = (todoText) => {
  ipcRenderer.send("delete-todo", todoText);
};

function openAddTodo() {
  location.href = "add-todo.html";
}

ipcRenderer.on("todos", (event, todos) => {
  const todosList = document.getElementById("todos-list");

  if (todos.length === 0) {
    todosList.innerHTML = "Todo listesi bos";
  } else {
    const todoItems = todos.map((todoText, index) => {
      return `<li class="todo-item ${index % 2 === 0 ? "even" : "odd"}" onclick="deleteTodo('${todoText}')">${todoText}</li>`;
    });

    todosList.innerHTML = todoItems.join("");
  }
});

ipcRenderer.send("load-todos");

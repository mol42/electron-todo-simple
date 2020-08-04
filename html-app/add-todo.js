"use strict";

const { ipcRenderer } = require("electron");

const state = {
  todoText: ""
};

// onchange işlemi gerçekleştiğinde yani text input 
// içinden focus kalkınca bu callback çağrılır ve
// state objesi içindeki todoText set edilir.
function setTodoText(event) {
  state.todoText = event.target.value;
}

// Kaydet butonu tıklandığı zaman bu callback çağrılır
// ve ipc aracılığı ile main process tarafına ekleme
// işlemini temsil eden action'u ve parametrede text'i
// ekleyerek çağırır. Bu noktada main process ekleme işlemini
// gerçekleştirirken biz index.html sayfasına yönleniriz.
function saveTodo() {
  ipcRenderer.send("add-todo", state.todoText);
  location.href = "index.html";
}

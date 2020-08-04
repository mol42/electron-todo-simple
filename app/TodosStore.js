"use strict";

const Store = require("electron-store");
// Store nesnesinden bir tane ornek yaratiyoruz
const store = new Store();

class TodosStore {
  constructor() {
    this.todos = store.get("todos") || [];
  }

  saveTodos() {
    store.set("todos", this.todos);
    return this;
  }

  getTodos() {
    this.todos = store.get("todos") || [];
    return this;
  }

  addTodo(todo) {
    this.todos = [...this.todos, todo];
    return this.saveTodos();
  }

  deleteTodo(todo) {
    this.todos = this.todos.filter((t) => t !== todo);
    return this.saveTodos();
  }
}

module.exports = TodosStore;

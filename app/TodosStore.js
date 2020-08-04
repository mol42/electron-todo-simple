"use strict";

const Store = require("electron-store");

class TodosStore {
  constructor() {
    // Store nesnesinden bir tane ornek yaratiyoruz
    this.store = new Store();
    this.todos = this.store.get("todos") || [];
  }

  saveTodos() {
    this.store.set("todos", this.todos);
    return this;
  }

  getTodos() {
    this.todos = this.store.get("todos") || [];
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

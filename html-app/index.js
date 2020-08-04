"use strict";

const { ipcRenderer } = require("electron");

// Ekrandaki li elementlerine aşağıda göreceğiniz deleteTodo
// callbacki tanıtmamız sayesinde li elementine tıklandığı zaman
// bu callback çağrılır ve main process tarafına silinecek todo
// text'ini delete-todo action'unu çağırarak gönderir.
// main process silme işlemini gerçekleştirir ve todos mesajını
// göndererek ekranın yeni todo listesi ile birlikte sıfırdan 
// tekrar render edilmesini sağlar
const deleteTodo = (todoText) => {
  ipcRenderer.send("delete-todo", todoText);
};

// Todo Ekle butonuna tıklandığı zaman add-todo.html sayfasını
// açarız. Dikkat edin single page application mantığında değil
// sayfadan sayfaya geçme mantığında kurguladık bu todo uygulamasını 
function openAddTodo() {
  location.href = "add-todo.html";
}

// main process ekleme/silme işlemleri sonrasında yeni todo listesini
// "todos" mesajı yardımı ile gönderir ve basit şekilde tüm liste için
// bir html oluşturup ul içine set ederiz ve yeni todo listesini render
// ederiz.
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


// Main process yeni veya o anki todo listesini "todos" mesaj aksiyonu ile
// gönderiyordu ve index.html ilk yüklenirken bu mesajı yakalayamaz veya
// add-todo.html'den dönülürken de yakalayamaz dolayısı ile main process'in
// bize o anki todo listesini göndermesini sağlamak için load-todos komutunu
// kullanarak main process'in o anki todo listesi ile "todos" aksiyonunu fırlatmasını
// sağlarız böylece hemen yukarıdaki kod çalışacak ve todo listesi render edilecek.
ipcRenderer.send("load-todos");

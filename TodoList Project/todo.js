// Tüm elementleri seçtik
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filterInput = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListener();

function eventListener() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  secondCardBody.addEventListener("click", deleteTodo);
  filterInput.addEventListener("keyup", filterTodos);
  clearButton.addEventListener("click", clearAllTodos);
}
function clearAllTodos(e) {
  // to do kaldırıcaz
  if (confirm("Are you sure you want to clear all of your Todos?")) {
    // todoList.innerHTML = ""; yavaş
    while (todoList.firstElementChild != null) {
      todoList.removeChild(todoList.firstElementChild);
    }
  }
  localStorage.removeItem("todos");
}
function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");

  listItems.forEach(function (listItem) {
    const text = listItem.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      //bulamadı
      listItem.setAttribute("style", "display: none !important;");
    } else {
      listItem.setAttribute("style", "display: block");
    }
  });
}
function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success", "to do deleted successfully");
  }
}
function deleteTodoFromStorage(deletetodo) {
  let todos = getTodosFromStorage();
  todos.forEach(function (todo, index) {
    if (todo === deletetodo) {
      todos.splice(index, 1);
    }
    localStorage.setItem("todos", JSON.stringify(todos));
  });
}
function loadAllTodosToUI() {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}
function addTodo(e) {
  let todos = getTodosFromStorage();
  const newTodo = todoInput.value.trim();
  let isThere = false;

  todos.forEach(function (item) {
    if (item.indexOf(newTodo) != -1) {
      isThere = true;
    }
  });

  if (newTodo === "") {
    showAlert("danger", "pls add something to do");
  } else if (isThere) {
    showAlert("warning", "to do already added to list");
  } else {
    addTodoToUI(newTodo);
    addToDoToStorage(newTodo);
    showAlert("success", "to do added successfully");
  }

  e.preventDefault();
}
function getTodosFromStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}
function addToDoToStorage(newTodo) {
  let todos = getTodosFromStorage();

  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function showAlert(type, message) {
  const alert = document.createElement("div");

  alert.className = `alert alert-${type}`;

  alert.textContent = message;

  firstCardBody.appendChild(alert);

  setTimeout(function () {
    alert.remove();
  }, 1500);
}

function addTodoToUI(newTodo) {
  // list item oluşturma
  const listItem = document.createElement("li");
  //   link oluşturma
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class='fa fa-remove'></i>";

  listItem.className = "list-group-item d-flex justify-content-between";
  // text node ekleme
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);

  //   todo list e list item ekleme
  todoList.appendChild(listItem);

  todoInput.value = "";
}

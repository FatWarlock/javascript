const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const github = new Github();
const lastUsers = document.getElementById("last-users");
const ui = new UI(9);
eventListeners();

function eventListeners() {
  githubForm.addEventListener("submit", getData);
  clearLastUsers.addEventListener("click", clearAllSearched);
  document.addEventListener("DOMContentLoaded", getAllSearched);

  function getData(e) {
    let username = nameInput.value.trim();
    if (username === "") {
      alert("Please enter a valid username");
    } else {
      github
        .getGithubdata(username)
        .then((response) => {
          if (response.user.message === "Not Found") {
            ui.showError("user not found");
          } else {
            ui.addSearchedUserToUI(username);
            Storage.addSearchedUserToStorage(username);
            ui.showUserInfo(response.user);
            ui.showRepoInfo(response.repo);
          }
        })
        .catch((err) => console.log(err));
    }

    ui.clearInput();
    e.preventDefault();
  }
}
function clearAllSearched() {
  if (confirm("Are you sure?")) {
    Storage.clearAllSearchedUsersFromStorage();
    ui.clearAllSearchedFromUI();
  }
}
function getAllSearched(user) {
  let users = Storage.getSearchedUsersFromStorage();
  let result = "";

  users.forEach((user) => {
    result += `<li class="list-group-item">${user}</li>`;
  });
  lastUsers.innerHTML = result;
}

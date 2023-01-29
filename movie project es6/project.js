const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");
//UI objesini başlatma

eventListeners();

function eventListeners() {
  form.addEventListener("submit", addFilm);
  document.addEventListener("DOMContentLoaded", function () {
    let films = Storage.getFilmsFromStorage();
    UI.loadAllFilms(films);
  });

  cardBody.addEventListener("click", deleteFilm);
  clear.addEventListener("click", clearAllFilms);
}
function addFilm(e) {
  const title = titleElement.value;
  const director = directorElement.value;
  const url = urlElement.value;

  if (title === "" || director === "" || url === "") {
    UI.displayMessages("Tüm alanları doldurun", "danger");
  } else {
    //bir film oluşturduk
    const newFilm = new Film(title, director, url);

    UI.addFilmToUI(newFilm); // Arayüze film ekleme
    Storage.addFilmToStorage(newFilm);
    UI.displayMessages("Film eklendi", "success");
  }
  UI.clearInputs(titleElement, directorElement, urlElement);

  e.preventDefault();
}

function deleteFilm(e) {
  if (e.target.id === "delete-film") {
    UI.deleteFilmFromUI(e.target);

    Storage.deleteFilmsFromStorage(
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent,
    );
    UI.displayMessages("Film Kaldırıldı", "warning");
  }
}
function clearAllFilms() {
  if (confirm("Are you sure you want to delete all the films")) {
    UI.clearAllFilmsFromUI();
    Storage.clearAllFilmsFromStorage();
  }
}

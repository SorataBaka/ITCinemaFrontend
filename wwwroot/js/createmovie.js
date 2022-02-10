const token = window.sessionStorage.getItem("token");
const getGenres = async () => {
    const genresContainer = document.getElementById("genresContainer");
    genresContainer.innerText = "Loading...";
    const response = await fetch("https://itcinemabackend-production.up.railway.app/movie/getgenres");
    const data = await response.json();
    const GenresData = data.Data;
    genresContainer.innerText = "";
    for (let i = 0; i < GenresData.length; i++) {
        const genresOptions = document.createElement("div");
        genresOptions.classList.add("genresOptions");

        const genreCheckBox = document.createElement("input");
        genreCheckBox.id = GenresData[i].GenreID;
        genreCheckBox.classList.add("genreCheckBox");
        genreCheckBox.setAttribute("type", "checkbox");
        genreCheckBox.setAttribute("value", GenresData[i].GenreName);


        const genresButton = document.createElement("label");
        genresButton.classList.add("genresButton");
        genresButton.setAttribute("for", GenresData[i].GenreID);
        genresButton.innerText = GenresData[i].GenreName;

        genresOptions.appendChild(genreCheckBox);
        genresOptions.appendChild(genresButton);
        genresContainer.appendChild(genresOptions);
    }
}

const checkSelectedGenres = () => {
    const Genres = document.getElementsByClassName("genreCheckBox");
    let SelectedGenres = [];
    for (let i = 0; i < Genres.length; i++) {
        if (Genres[i].checked === true) {
            SelectedGenres.push(Genres[i].id);
        }
    }
    return SelectedGenres;
}



const sendData = () => {
    const XHR = new XMLHttpRequest();
    const FD = new FormData(form);
    const Genres = document.getElementsByClassName("genreCheckBox");
    for (let i = 0; i < Genres.length; i++) {
        if (Genres[i].checked === true) {
            FD.append("Genre", Genres[i].id);
        }
    }
    XHR.addEventListener("error", (e) => {
        alert("ERROR");
    });

    XHR.open("POST", "https://itcinemabackend-production.up.railway.app/admin/createmovies");
    XHR.setRequestHeader("Authorization", `Bearer ${token}`);
    XHR.send(FD);
}

const form = document.getElementById("MovieForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendData();
})
if (!token) {
    alert("Not Authorized");
    window.location.replace(`/`);
}
getGenres();
var today = new Date();
var todayDate = today.getFullYear() + '-' + (("0" + (today.getMonth() + 1)).slice(-2)) + '-' + (("0" + today.getDate()).slice(-2))
var tomorrowDate = today.getFullYear() + '-' + (("0" + (today.getMonth() + 1)).slice(-2)) + '-' + (("0" + (today.getDate() + 1)).slice(-2))
document.getElementById("today-date").innerHTML = `${todayDate}`;
document.getElementById("tomorrow-date").innerHTML = `${tomorrowDate}`;
const getTheaterName = async (theaterID) => {
    const theaterNameResponse = await fetch(`https://itcinemabackend-production.up.railway.app/theater/gettheaters?theaterID=${theaterID}`);
    const theaterNames = await theaterNameResponse.json();
    const theaterName = theaterNames.Data;
    return theaterName;
}
const getTheater = async (movieID, date) => {
    const theaterResponse = await fetch(`https://itcinemabackend-production.up.railway.app/movie/getmoviedetails?movieID=${movieID}&date=${date}`);
    const theaters = await theaterResponse.json();
    const theatersData = theaters.Data;
    return theatersData;
}

const getActors = async (movieID) => {
    const actorResponse = await fetch(`https://itcinemabackend-production.up.railway.app/actor/getactors?movieID=${movieID}`);
    const actors = await actorResponse.json();
    const actorsData = actors.Data.Actors;
    return actorsData;
}

const getTheaterDetailList = async (theatersData) => {
    const TheaterMainContainer = document.getElementById("theaterMain");
    let theaterNames = [];
    for (let i = 0; i < theatersData.PlayAt.length; i++) {
        let tempData = await getTheaterName(theatersData.PlayAt[i].TheaterID);
        theaterNames.push(tempData);
    }
    for (let i = 0; i < theaterNames.length; i++) {
        const TheaterRow = document.createElement("div");
        TheaterRow.classList.add("row");
        TheaterRow.classList.add("py-2");
        TheaterRow.classList.add("theaterRow");

        const ColTheaterName = document.createElement("div");
        ColTheaterName.classList.add("col");
        ColTheaterName.classList.add("text-center");
        ColTheaterName.classList.add("align-middle");


        const TheaterNameP = document.createElement("p");
        TheaterNameP.classList.add("theaterName");
        TheaterNameP.classList.add("align-middle");
        TheaterNameP.classList.add("m-auto");
        TheaterNameP.innerText = theaterNames[i][0].TheaterName;

        const ColTheaterTime = document.createElement("div");
        ColTheaterTime.classList.add("col");


        const ContainerTheaterTime = document.createElement("div");
        ContainerTheaterTime.classList.add("text-center");
        ContainerTheaterTime.classList.add("d-flex");
        ContainerTheaterTime.classList.add("flex-row");
        const timeLength = theatersData.PlayAt[i].Time.length;
        //Tiap Showtime ada dikasih href ke theaterID masing masing
        for (let j = 0; j < timeLength; j++) {
            let TheaterTimeA = document.createElement("a");
            TheaterTimeA.classList.add("bg-secondary");
            TheaterTimeA.classList.add("rounded");
            TheaterTimeA.classList.add("p-2");
            TheaterTimeA.classList.add("m-1");
            TheaterTimeA.classList.add("text-decoration-none");
            TheaterTimeA.classList.add("text-reset");
            TheaterTimeA.classList.add("theaterTimeA");
            const theaterTime = theatersData.PlayAt[i].Time[j].PlayingAt;
            const StartTime = new Date(theaterTime)
            const hours = ("0" + StartTime.getHours()).slice(-2)
            const minutes = ("0" + StartTime.getMinutes()).slice(-2)
            TheaterTimeA.innerText = hours + ':' + minutes;
            TheaterTimeA.href = `/booking?scheduleid=${theatersData.PlayAt[i].Time[j].ScheduleID}`;
            ContainerTheaterTime.appendChild(TheaterTimeA);
        }


        TheaterRow.appendChild(ColTheaterName);
        ColTheaterName.appendChild(TheaterNameP);
        TheaterRow.appendChild(ColTheaterTime);
        ColTheaterTime.appendChild(ContainerTheaterTime);
        TheaterMainContainer.appendChild(TheaterRow);
    }
}



const getMovie = async (movieID, date) => {
    document.getElementById("mainContainer").style.visibility = 'hidden';
    const response = await fetch(`https://itcinemabackend-production.up.railway.app/movie/getmovies?movieID=${movieID}`);
    const datas = await response.json();
    if (datas.status === 400) {
        //FAIL
        document.getElementById("mainContainer").innerText = 'ERROR OCCURED!';
    } else {
        //SUCCESS

        //Butuh akses buat ambil data genre
        const response = await fetch(`https://itcinemabackend-production.up.railway.app/movie/getgenres?movieID=${movieID}`);
        const genres = await response.json();
        const genre = genres.Data;
        const actorsData = await getActors(movieID);
        if (actorsData.length === 0) {
            document.getElementById("movieActor").innerText = '-';
        } else {
            document.getElementById("movieActor").innerText = actorsData;
        }
        const movieData = datas.Data[0];
        document.getElementById("movieTitle").innerText = movieData.MovieTitle;
        for (let i = 0; i < genre.length; i++) {
            if (i == 0) {
                document.getElementById("movieGenre").innerHTML = genre[i].GenreName;
            }
            else {
                document.getElementById("movieGenre").innerHTML += `, ${genre[i].GenreName}`;
            }
        }
        document.getElementById("movieDirector").innerText = movieData.MovieDirector
        document.getElementById("movieDuration").innerText = `${movieData.MovieDuration} Minutes`
        document.getElementById("movieDescription").innerText = movieData.MovieDescription
        document.getElementById("movieIMG").src = movieData.PosterURL
        const theatersData = await getTheater(movieID, todayDate);
        getTheaterDetailList(theatersData);

        document.getElementById("mainContainer").style.visibility = 'visible';
    }

}
const cleanUp = () => {
    const TheaterRows = document.getElementsByClassName("theaterRow");
    const length = TheaterRows.length;
    for (let i = 0; i < length; i++) {
        console.log(TheaterRows[i], length);
        TheaterRows[0].remove();
    }
    const TheaterMainContainer = document.getElementById("theaterMain");
    const loadingTheaterRows = document.createElement("div");
    loadingTheaterRows.classList.add("loadingTheaterRows")
    loadingTheaterRows.innerText = "Loading...";
    TheaterMainContainer.appendChild(loadingTheaterRows);
    return loadingTheaterRows;
}
const getTheaterDetailToday = async () => {
    const todayDateButton = document.querySelector("#today-date");
    todayDateButton.classList.add("Active-Date");
    todayDateButton.classList.remove("Non-Active-Date")
    const tomorrowDateButton = document.querySelector("#tomorrow-date");
    tomorrowDateButton.classList.remove("Active-Date");
    tomorrowDateButton.classList.add("Non-Active-Date")

    const loadingTheaterRows = cleanUp();
    let date = document.getElementById("today-date").innerHTML;
    const theatersData = await getTheater(movieID, date);
    await getTheaterDetailList(theatersData);
    loadingTheaterRows.remove();
}
const getTheaterDetailTomorrow = async () => {
    const todayDateButton = document.querySelector("#today-date");
    todayDateButton.classList.remove("Active-Date")
    todayDateButton.classList.add("Non-Active-Date")

    const tomorrowDateButton = document.querySelector("#tomorrow-date");
    tomorrowDateButton.classList.remove("Non-Active-Date")
    tomorrowDateButton.classList.add("Active-Date")


    const loadingTheaterRows = cleanUp();
    let date = document.getElementById("tomorrow-date").innerHTML
    const theatersData = await getTheater(movieID, date);
    await getTheaterDetailList(theatersData);
    loadingTheaterRows.remove();
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const movieID = urlParams.get('id');

try {
    getMovie(movieID);
} catch (e) {
    alert("An Error Occured");
}
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const theaterID = urlParams.get('id');
var today = new Date();
var todayDate = today.getFullYear() + '-' + (("0" + (today.getMonth() + 1)).slice(-2)) + '-' + (("0" + today.getDate()).slice(-2))
var tomorrowDate = today.getFullYear() + '-' + (("0" + (today.getMonth() + 1)).slice(-2)) + '-' + (("0" + (today.getDate() + 1)).slice(-2))
document.getElementById("today-date").innerHTML = `${todayDate}`;
document.getElementById("tomorrow-date").innerHTML = `${tomorrowDate}`;
const MovieMainContainer = document.getElementById("movieMain");

const getTheater = async (theaterID) => {
    const response = await fetch(`https://itcinemabackend-production.up.railway.app/theater/gettheaters?theaterID=${theaterID}`);
    const theaterData = await response.json();
    const datas = theaterData.Data;
    return datas;
}

const getTheaterDetails = async (theaterID, date) => {
    const MovieRows = document.getElementsByClassName("movieRow");
    const length = MovieRows.length;
    for (let i = 0; i < length; i++) {
        MovieRows[0].remove();
    }
    const loadingTheaterRows = document.createElement("div");
    loadingTheaterRows.classList.add("loadingMovieRows")
    loadingTheaterRows.innerText = "Loading...";
    MovieMainContainer.appendChild(loadingTheaterRows);

    const response = await fetch(`https://itcinemabackend-production.up.railway.app/theater/getheaterdetails?theaterID=${theaterID}&date=${date}`);
    const theaterDetailData = await response.json();
    const theaterDetails = theaterDetailData.Data;

    for (let i = 0; i < theaterDetails.PlayAt.length; i++) {
        const MovieRow = document.createElement("div");
        MovieRow.classList.add("row");
        MovieRow.classList.add("py-2");
        MovieRow.classList.add("movieRow");
        const ColMovieName = document.createElement("div");
        ColMovieName.classList.add("col");
        ColMovieName.classList.add("text-center");
        ColMovieName.classList.add("align-middle");

        const MovieNameP = document.createElement("p");
        MovieNameP.classList.add("theaterName");
        MovieNameP.classList.add("align-middle");
        MovieNameP.classList.add("m-auto");
        MovieNameP.innerText = theaterDetails.PlayAt[i].MovieTitle;

        const ColMovieTime = document.createElement("div");
        ColMovieTime.classList.add("col");

        const ContainerMovieTime = document.createElement("div");
        ContainerMovieTime.classList.add("text-center");
        ContainerMovieTime.classList.add("d-flex");
        ContainerMovieTime.classList.add("flex-row");
        const timeLength = theaterDetails.PlayAt[i].Time.length;


        for (let j = 0; j < timeLength; j++) {
            let MovieTimeA = document.createElement("a");
            MovieTimeA.classList.add("bg-secondary");
            MovieTimeA.classList.add("rounded");
            MovieTimeA.classList.add("p-2");
            MovieTimeA.classList.add("m-1");
            MovieTimeA.classList.add("text-decoration-none");
            MovieTimeA.classList.add("text-reset");
            MovieTimeA.classList.add("MovieTimeA");
            const MovieTime = theaterDetails.PlayAt[i].Time[j].PlayingAt;
            const StartTime = new Date(MovieTime);
            const hours = ("0" + StartTime.getHours()).slice(-2);
            const minutes = ("0" + StartTime.getMinutes()).slice(-2);
            MovieTimeA.innerText = hours + ":" + minutes;
            MovieTimeA.href = `/booking?scheduleid=${theaterDetails.PlayAt[i].Time[j].ScheduleID}`;
            ContainerMovieTime.appendChild(MovieTimeA);
        }

        MovieRow.appendChild(ColMovieName);
        ColMovieName.appendChild(MovieNameP);
        MovieRow.appendChild(ColMovieTime);
        ColMovieTime.appendChild(ContainerMovieTime);

        MovieMainContainer.appendChild(MovieRow);
    }
    loadingTheaterRows.remove();
}



const final = async (theaterID) => {
    document.getElementById("mainContainer").style.visibility = 'hidden';
    const theaterData = await getTheater(theaterID);
    document.getElementById("theaterName").innerText = theaterData[0].TheaterName
    if (theaterData[0].TheaterSeats === 122) {
        document.getElementById("theaterSeats").innerText = 'Seats: 102';
    } else if (theaterData[0].TheaterSeats === 90 || theaterData[0].TheaterSeats === 92) {
        document.getElementById("theaterSeats").innerText = 'Seats: 74';
    } else {
        document.getElementById("theaterSeats").innerText = `Seats: ${theaterData[0].TheaterSeats}`;
    }
    await getTheaterDetails(theaterID, todayDate);

    document.getElementById("mainContainer").style.visibility = 'visible';
}

const getTheaterDetailToday = async () => {
    const todayDateButton = document.querySelector("#today-date");
    todayDateButton.classList.add("Active-Date");
    todayDateButton.classList.remove("Non-Active-Date")
    const tomorrowDateButton = document.querySelector("#tomorrow-date");
    tomorrowDateButton.classList.remove("Active-Date");
    tomorrowDateButton.classList.add("Non-Active-Date")
    await getTheaterDetails(theaterID, todayDate);
}
const getTheaterDetailTomorrow = async () => {
    const todayDateButton = document.querySelector("#today-date");
    todayDateButton.classList.remove("Active-Date")
    todayDateButton.classList.add("Non-Active-Date")

    const tomorrowDateButton = document.querySelector("#tomorrow-date");
    tomorrowDateButton.classList.remove("Non-Active-Date")
    tomorrowDateButton.classList.add("Active-Date")
    await getTheaterDetails(theaterID, tomorrowDate);
}

final(theaterID);

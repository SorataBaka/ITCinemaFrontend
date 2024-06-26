﻿const getMovie = async (movieID) => {
    const response = await fetch(`https://itcinemabackend-production.up.railway.app/movie/getmovies?moviestatus=1&limit=-1`);
    const datas = await response.json();
    if (datas.status === 400) {
        // alert("fail");
    } else {

        for (var x = 0; x < datas.Data.length; x++) {
            const movieData = datas.Data[x];
            document.getElementById("movieListNowPlaying").innerHTML +=
                ` <div class="card text-center" style="width: 17rem; margin: 15px">
                    <a href="/movies?id=${movieData.MovieID}">
                        <img class="card-img-top" style="height: 20rem;" src="${movieData.PosterURL}" alt="https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807">
                        <div class="card-body">
                            <h5>${movieData.MovieTitle}</h5>
                        </div>
                    </a>
                </div>
                `;
        }

    }

    const response2 = await fetch(`https://itcinemabackend-production.up.railway.app/movie/getmovies?moviestatus=3&limit=-1`);
    const datas2 = await response2.json();
    if (datas2.status === 400) {
        // alert("fail");
    } else {

        for (var x = 0; x < datas2.Data.length; x++) {
            const movieData2 = datas2.Data[x];
            document.getElementById("movieListComingSoon").innerHTML +=
                ` <div class="card text-center" style="width: 17rem; margin: 15px">
                    <a href="/movies?id=${movieData2.MovieID}">
                        <img class="card-img-top" style="height: 20rem;" src="${movieData2.PosterURL}" alt="https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807">
                        <div class="card-body">
                            <h5>${movieData2.MovieTitle}</h5>
                        </div>
                    </a>
                </div>
                `;
        }

    }

}


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const movieID = urlParams.get('id');
getMovie(movieID);
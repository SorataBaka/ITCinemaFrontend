const changeBackground = (nowPlaying) => {
  const carousel = document.getElementById("Main-Carousel")
  const randomPick = Math.floor(Math.random() * nowPlaying.length)
  carousel.style.backgroundImage = `url(${nowPlaying[randomPick].PosterURL})`
  carousel.href = `/movie/${nowPlaying[randomPick].MovieID}`
  document.querySelector('.Main-Carousel-Title').innerHTML = nowPlaying[randomPick].MovieTitle
  document.querySelector('.Main-Carousel-Description').innerHTML = nowPlaying[randomPick].MovieDescription
  document.querySelector('.Main-Carousel-Author').innerHTML = nowPlaying[randomPick].MovieDirector
}
const HandleCarousel = async(nowPlaying) => {
  setInterval(() => {
    changeBackground(nowPlaying)
  }, 5000)
}
const GetNowPlaying = async() => {
  const nowPlayingQuery = await fetch("https://itcinemabackend-production.up.railway.app/movie/getmovies?limit=10&sort=1&movieStatus=0", {
    method: "GET",
  }).catch(err => {
    alert("There seems to be a problem fetching items")
  })

  const nowPlayingJson = await nowPlayingQuery.json()
  const nowPlaying = nowPlayingJson.Data

  const movieList = document.getElementById("Movie-List")
  for(const movie of nowPlaying){
    const newChild = document.createElement("a")
    newChild.classList.add("MovieBox")
    newChild.href = `/movie/${movie.MovieID}`
    newChild.style.backgroundImage = `url(${movie.PosterURL})`
    movieList.appendChild(newChild)
  }
  changeBackground(nowPlaying)
  HandleCarousel(nowPlaying)
}
window.onload = GetNowPlaying
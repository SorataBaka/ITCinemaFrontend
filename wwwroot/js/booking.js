var globalScheduleID;
var totalSeats;
const retrieveSchedule = async (scheduleid) => {
  //Remember to remove the movieID in production
  const moviequery = await fetch(`https://api.itcinema.xyz/theaterschedule/getschedules?limit=10&scheduleID=${scheduleid}`, {
    method: "GET"
  }).catch(err => {
    alert("There seems to be a problem fetching items")
    return window.location.replace("/movies")
  })
  const moviejson = await moviequery.json()
  if(moviejson.Data.length == 0){
    alert("Schedule not found")
    return window.location.replace("/movies")
  }
  const movieData = moviejson.Data[0]
  const movieID = movieData.MovieID
  console.log(movieID)
  globalMovieID = movieID
  const moviedetailquery = await fetch(`https://api.itcinema.xyz/movie/getmovies?limit=10&movieID=${movieID}`, {
    method: "GET",
  }).catch(err => {
    return alert("Failed to fetch movie query. Please try again later.")
  })


  const moviedetail = await moviedetailquery.json()
  if(moviedetail.ResultCode !== 200){
    alert("Movie ID not found. Redirecting to homepage.")
    return window.location.replace("/")
  }
  if(moviedetail.Data.length === 0) {
    alert("Movie ID not found. Redirecting.")
    return window.location.replace("/movies")
  }
  const movie = moviedetail.Data[0]

  document.querySelector("#Title").value = movie.MovieTitle
  document.querySelector("#Description").value = movie.MovieDescription
  document.querySelector("#Director").value = movie.MovieDirector
  document.querySelector("#Duration").value = `${movie.MovieDuration} minutes`
  document.querySelector(".Movie-Details-Image").style.backgroundImage = `url(${movie.PosterURL})`

}
const seatEventListener = (seat, price) => {
  if(seat.classList.contains("Selected-Seat")){
    seat.classList.remove("Selected-Seat")
  }else{
    seat.classList.add("Selected-Seat")
  }
  countTotal(price)
}
const countTotal = (seatPrice) => {
  const seatTotal = document.getElementsByClassName("Selected-Seat").length
  const priceTotal = seatTotal * seatPrice
  document.querySelector(".Total-Price").innerHTML = `IDR ${priceTotal}`
}
const loadSeats = async() => {
  const windowurl = window.location.href
    const scheduleid = windowurl.split("?scheduleid=")[1]
    if(scheduleid === undefined) return window.location.replace("/")
    retrieveSchedule(scheduleid)
  globalScheduleID = scheduleid 
  const seatQuery = await fetch(`https://itcinemabackend-production.up.railway.app/theaterschedule/getbookedseats?scheduleID=${scheduleid}`, {
    method: "GET"
  }).catch(err => {
    alert("There seems to be a problem fetching items")
  })
  const priceQuery = await fetch(`https://itcinemabackend-production.up.railway.app/theaterschedule/getschedules?limit=10&scheduleID=${scheduleid}`, {
    method: "GET"
  }).catch(err => {return alert("There seems to be a problem fetching items")})
  const priceJson = await priceQuery.json()
  const price = priceJson.Data[0].Price
  const seatJson = await seatQuery.json()
  const seatsTotal = seatJson.Data.TotalSeats
  const seatsBooked = seatJson.Data.BookedSeats
  var n = seatsTotal - 2
  var ans;
  for(var i = 1; i * i <= n; i++){
    if(n % i == 0){
      ans = i;
    }
  }
  var width;
  var length;
  if(ans < n/ans){
    width = n/ans;
    length = ans;

  }else{
    width = ans;
    length = n/ans
  }
  var seatIndexing= 1;
  var idIndexing = 1;
  for(var i = 0; i < length; i++){
    const row = document.createElement("ul")
    //Add a new class
    row.classList.add("Seat-Row")
    for(var j = 0; j < width; j++){
      if(i!=length-1 && (j==2 || j==width-3)){
        const seat = document.createElement("li")
        seat.id = idIndexing++;
        seat.classList.add("Empty-Collumn")
        row.appendChild(seat)
      }else{
        const seat = document.createElement("li")
        seat.classList.add("Seat-Column")
        seat.id = idIndexing++;
        seat.addEventListener("click", (e) => {
          seatEventListener(seat, price)
        })
        const seatNumber = document.createElement("span")
        seatNumber.classList.add("Seat-Number")
        seatNumber.innerHTML = seatIndexing++
        seat.appendChild(seatNumber)
        row.appendChild(seat)
      }
    }
    document.querySelector(".Seat-Selection-List").appendChild(row)
  }
  totalSeats = idIndexing - 1
  for(const seats of seatsBooked){
    const seat = document.getElementById(seats)
    seat.classList.add("Booked-Seat")
    var old_element = document.getElementById(seats);
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
  }
}
window.onload = loadSeats


const bookSeats = async() => {
   const token = window.sessionStorage.getItem("token")
    if (!token) return window.location.replace("/")
    if (globalScheduleID === undefined) return window.location.replace("/")
  var seatArray = []
  console.log(totalSeats)
  for(var i = 1; i <= totalSeats; i++){
    const seat = document.getElementById(i)
    console.log(seat)
    if(seat!==undefined && seat.classList.contains("Selected-Seat")) seatArray.push(i)
  }
  if(seatArray.length === 0) return alert("Please select at least one seat")
  const requestBody = JSON.stringify({
    ScheduleID: globalScheduleID,
    SeatNumbers: seatArray
  })
  const buySeats = await fetch(`https://itcinemabackend-production.up.railway.app/user/buytickets`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: requestBody
  })
  const buySeatsjson = await buySeats.json()
  console.log(JSON.stringify(buySeatsjson))
  if(buySeatsjson.ResultCode !== 200){
    alert("There seems to be a problem with your purchase. Please make sure you have enough balance in your acount.")

  }else{
    return window.location.reload();
  }
}

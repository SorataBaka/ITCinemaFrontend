const loadSeats = async() => {
  const windowurl = window.location.href
  const scheduleid = windowurl.split("?scheduleid=")[1] || "b00b95b2-748b-419e-92ce-019f24228dd7"
  // if(scheduleid === undefined) return window.location.replace("/")
  const seatQuery = await fetch(`https://itcinemabackend-production.up.railway.app/theaterschedule/getbookedseats?scheduleID=${scheduleid}`, {
    method: "GET"
  }).catch(err => {
    alert("There seems to be a problem fetching items")
  })
  const seatJson = await seatQuery.json()
  console.log(JSON.stringify(seatJson))
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
  



}
window.onload = loadSeats
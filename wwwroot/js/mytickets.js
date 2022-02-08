const token = window.sessionStorage.getItem("token");
if (!token) window.location.replace("/login");

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getTickets = async () => {    
    const ticketsBody = document.getElementById("content-wrapper");    
    // https://api.itcinema.xyz/user/getbuyedtickets
    const response = await fetch("http://localhost:3000/user/getbuyedtickets", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await response.json();

    ticketsBody.innerHTML = '';

    data.Data.forEach((item) => {
        const posterUrl = item.PosterURL;
        const title = item.MovieTitle;
        const date = new Date(item.PlayingAt);
        const studio = item.TheaterName;
        const seat = item.SeatNumber;
        const transactionId = item.TransactionID;

        ticketsBody.innerHTML += `
            <div class="ticket-item-wrapper">
                <div class="ticket-item">
                    <img class="poster" src="${posterUrl}"/>
                    <div class="ticket-item-content-wrapper">
                        <div class="ticket-item-content">
                            <div class="ticket-item-details">
                                <h1>${title}</h1>
                                <h2>${weekdays[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}, ${date.getHours() < 10 ? "0" : ""}${date.getHours()}:${date.getMinutes()}</h2>
                                <h2>${studio} - Seat ${seat}</h2>
                            </div>
                            <div class="qr-wrapper">
                                <img class="qr" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1024px-QR_code_for_mobile_English_Wikipedia.svg.png"/>
                            </div>
                        </div>
                        <label class="transaction-id">${transactionId}</label>
                    </div>
                </div>
            </div>
        `;
    });
}

getTickets();
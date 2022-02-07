const token = window.sessionStorage.getItem("token");
if (!token) window.location.replace("/login");

const topup = async () => {
    var amount = document.getElementById("InputAmount").value;

    if (!parseInt(amount)) {
        messageElem.style.opacity = "100%";
        messageElem.innerHTML = "Invalid input";
        messageElem.style.color = "var(--bs-danger)";
    }

    const response = await fetch("https://itcinemabackend-production.up.railway.app/user/topup", {
        method: "POST",
        body: JSON.stringify({
            Amount: parseInt(amount)
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    const res = await response.json();
    const messageElem = document.getElementById("message-alert");
    messageElem.style.opacity = "100%";
    if (res.ResultCode == 200) {
        messageElem.innerHTML = "Added funds into account";
        messageElem.style.color = "var(--bs-success)";
    } else {
        messageElem.innerHTML = res.ErrorMessage;
        messageElem.style.color = "var(--bs-danger)";
    }
}
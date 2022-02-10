const token = window.sessionStorage.getItem("token");

const topup = async () => {
    var email = document.getElementById("InputEmail").value;
    var amount = document.getElementById("InputAmount").value;

    const requestBody = JSON.stringify({
        Email: email,
        Amount: parseInt(amount)
    })

    if (!parseInt(amount)) {
        messageElem.style.opacity = "100%";
        messageElem.innerHTML = "Invalid input";
        messageElem.style.color = "var(--bs-danger)";
    }

    const response = await fetch("https://itcinemabackend-production.up.railway.app/admin/topupuser", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: requestBody
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
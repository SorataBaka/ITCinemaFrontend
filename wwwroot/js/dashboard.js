var token = window.sessionStorage.getItem("token");
const getUsername = async () => {
    const response = await fetch(`https://itcinemabackend-production.up.railway.app/user/getuser`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })

    if (token == null) {
        window.location.href = "./login";
    }


    const datas = await response.json();
    if (datas.status === 400) {
        // alert("fail");
    } else {
        const userData = datas.Data[0];
        document.getElementById("profileUserName").innerHTML =
            ` <div>
                    <div <span id="">${userData.UserName}</span></div>
                </div>
                `;

    }

    if (datas.status === 400) {
        // alert("fail");
    } else {
        const userData = datas.Data[0];
        document.getElementById("profileEmail").innerHTML =
            ` <div>
                    <div <span id="">${userData.Email}</span></div>
                </div>
                `;

    }

    if (datas.status === 400) {
        // alert("fail");
    } else {
        const userData = datas.Data[0];
        document.getElementById("profileBalance").innerHTML =
            ` <div>
                    <div <span id="">${userData.Balance}</span></div>
                </div>
                `;

    }

}


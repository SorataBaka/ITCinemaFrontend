﻿const getTheater = async (theaterID) => {
    const response = await fetch(`https://itcinemabackend-production.up.railway.app/theater/gettheaters?limit=-1&theaterType=1`);
    const datas = await response.json();
    if (datas.status === 400) {
        // alert("fail");
    } else {

        // default
        for (var x = 0; x < datas.Data.length; x++) {
            const theaterData = datas.Data[x];
            document.getElementById("theaterList").innerHTML +=
                `<ul class="list-group">
                        <a href="/theatres?id=${theaterData.TheaterID}">
                            <li class="list-group-item"> <span id="">${theaterData.TheaterName}</span></li>
                        </a>
                    </ul>
                    `;
        }

    }

}

async function getTheaterType1() {
    const response = await fetch(`https://itcinemabackend-production.up.railway.app/theater/gettheaters?limit=-1&theaterType=1`);
    const datasType1 = await response.json();
    return datasType1;
}

async function getTheaterType2() {
    const response = await fetch(`https://itcinemabackend-production.up.railway.app/theater/gettheaters?limit=-1&theaterType=2&sort=1`);
    const datasType2 = await response.json();
    return datasType2;
}

async function getTheaterType3() {
    const response = await fetch(`https://itcinemabackend-production.up.railway.app/theater/gettheaters?limit=-1&theaterType=3`);
    const datasType3 = await response.json();
    return datasType3;
}

async function getTheaterType4() {
    const response = await fetch(`https://itcinemabackend-production.up.railway.app/theater/gettheaters?limit=-1&theaterType=4`);
    const datasType4 = await response.json();
    return datasType4;
}

// Regular button onClick
async function filterRegular() {
    document.getElementById("theaterList").innerHTML = "";
    const datas = await getTheaterType1();
    for (var x = 0; x < datas.Data.length; x++) {
        const theaterData = datas.Data[x];
        document.getElementById("theaterList").innerHTML +=
            `<ul class="list-group">
                    <a href="/theatres?id=${theaterData.TheaterID}">
                        <li class="list-group-item"> <span id="">${theaterData.TheaterName}</span></li>
                    </a>
                </ul>
                `;
    }
}

// Gold button onClick
async function filterGold() {
    document.getElementById("theaterList").innerHTML = "";
    const datas = await getTheaterType2();
    for (var x = 0; x < datas.Data.length; x++) {
        const theaterData = datas.Data[x];
        document.getElementById("theaterList").innerHTML +=
            `<ul class="list-group">
                    <a href="/theatres?id=${theaterData.TheaterID}">
                        <li class="list-group-item"> <span id="">${theaterData.TheaterName}</span></li>
                    </a>
                </ul>
                `;
    }
}

// Platinum button onClick
async function filterPlatinum() {
    document.getElementById("theaterList").innerHTML = "";
    const datas = await getTheaterType3();
    for (var x = 0; x < datas.Data.length; x++) {
        const theaterData = datas.Data[x];
        document.getElementById("theaterList").innerHTML +=
            `<ul class="list-group">
                    <a href="/theatres?id=${theaterData.TheaterID}">
                        <li class="list-group-item"> <span id="">${theaterData.TheaterName}</span></li>
                    </a>
                </ul>
                `;
    }
}

// Diamond button onClick
async function filterDiamond() {
    document.getElementById("theaterList").innerHTML = "";
    const datas = await getTheaterType4();
    for (var x = 0; x < datas.Data.length; x++) {
        const theaterData = datas.Data[x];
        document.getElementById("theaterList").innerHTML +=
            `<ul class="list-group">
                    <a href="/theatres?id=${theaterData.TheaterID}">
                        <li class="list-group-item"> <span id="">${theaterData.TheaterName}</span></li>
                    </a>
                </ul>
                `;
    }
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const theaterID = urlParams.get('id');
getTheater(theaterID);
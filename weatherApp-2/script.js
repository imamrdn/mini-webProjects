const wrapper = document.querySelector(".wrapper"),
    inputPart = wrapper.querySelector(".input-part"),
    infoTxt = inputPart.querySelector(".info-txt"),
    inputField = inputPart.querySelector("input"),
    locationBtn = inputPart.querySelector("button");

inputField.addEventListener("keyup", e => {
    //if user pressed enter btn and input value is not empty
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) { //if browser support geolocation
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Your browser not support geolocation api");
    }
});


function onError(error) {
    infoTxt.innerHTML = error.message;
    infoTxt.classList.add("error")
}

function requestApi(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2501969fb7ff4df90a8dd500e3ad7522`;
    infoTxt.innerHTML = "Getting weather details...";
    infoTxt.classList.add("pending");
    //getting api response and returning it with parsing into js and in another
    //then function calling weatherDetails function with passing api result as an argument
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info) {
    console.log(info);
}
//!
const input = document.querySelector("#input");
// console.log(input);
const button = document.querySelector("#button");
// console.log(button);
const ul = document.querySelector(".ul");
// console.log(ul);
const form = document.querySelector("form");
// console.log(form);
const msg = document.querySelector("#msg");

const apiKey = "494f6e201fb54db6e726c555652ac9c4";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}`;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeatherDataFromApi();
});

const getWeatherDataFromApi = async () => {
  const apiKey = "494f6e201fb54db6e726c555652ac9c4";
  const units = "metric";
  const lang = "tr";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=${units}&lang=${lang}`;
  const response = await fetch(url);
  const data = await response.json();

  try {
    const {
      name,
      main,
      sys: { country },
      weather,
    } = data;
    const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    const cityNameSpan = ul.querySelectorAll(".city span");
    //   console.log(cityNameSpan);
    const cityNameSpanArray = Array.from(cityNameSpan);
    //   console.log(cityNameSpanArray);
    if (cityNameSpanArray.length > 0) {
      const filteredArray = cityNameSpanArray.filter(
        (span) => span.innerText == name
      );
      // console.log(filteredArray);
      if (filteredArray.length > 0) {
        msg.innerText = `You already know the weather for ${name}, Please search for another city 😉`;
        msg.style.color = "red";
        msg.style.fontSize = "1.5rem";
        msg.style.textDecoration = "underline";

        setTimeout(() => {
          msg.innerText = "";
        }, 5000);
        form.reset();
        return;
      }
    }

    const createdLi = document.createElement("li");

    createdLi.classList.add("city");
    createdLi.innerHTML = `<h2 class="city-name" data-name="${name}, ${country}">
                                <span>${name}</span>
                                <sup>${country}</sup>
                            </h2>
                            <div class="city-temp">${Math.round(
                              main.temp
                            )}<sup>°C</sup></div>
                            <figure>
                                <img class="city-icon" src="${iconUrl}">
                                <figcaption>${
                                  weather[0].description
                                }</figcaption>
                            </figure>`;
    //append vs. prepend
    ul.prepend(createdLi);
    //   form.reset();
  } catch (error) {
    console.log(error);
    msg.innerText = `${data.message}`;
    setTimeout(() => {
      msg.innerText = "";
    }, 5000);
  }
  form.reset();
};

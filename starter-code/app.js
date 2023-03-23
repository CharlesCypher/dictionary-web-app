const containerDisplay = document.querySelector(".key-word-details");
const searchBtn = document.querySelector(".search-btn");
const keyWord = document.querySelector(".key-word");

const searchInput = document.getElementById("searchInput");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const errMsg = {
  title: "No Definitions Found",
  message: "Sorry pal, we couldn't find definitions for the word you were looking for.",
  resolution: "You can try the search again at later time or head to the web instead.",
};

async function loadResponse() {
  try {
    let response = await fetch(url + searchInput.value);
    let data = await response.json();
    console.log(data.slice(0, 1));
    loadData(data);
  } catch (error) {
    containerDisplay.innerHTML = `<div class="loading-content">Oops, there was an error finding keyword :(</div>`;
    console.log(error);
  }
}

searchBtn.addEventListener("click", () => {
  if (searchInput.value) {
    containerDisplay.innerHTML = `<div class="loading-content">Loading...</div>`;
    console.log("clicked");
    loadResponse();
  } else {
    containerDisplay.innerHTML = `<div class="loading-content">Please input a value</div>`;
  }
});

const definitions = [];
const synonyms = [];
function loadData(word) {
  containerDisplay.innerHTML = "";
  const item = word.slice(0, 1).map((item) => {
    const { word, phonetics, meanings, sourceUrls } = item;
    const definition = meanings[0].definitions;
    for (const values in definition) {
      if (definition.hasOwnProperty(values)) {
        const allDefs = definition[values];
        definitions.push(allDefs.definition);
      }
    }
    const synonyms = meanings[0].synonyms;
    console.log(synonyms);
    for (const values in synonyms) {
      if (synonyms.hasOwnProperty(values)) {
        const allSyn = synonyms[values];
        synonyms.push(allSyn.synonyms);
      }
    }
    const defs = definitions
      .map((item) => {
        return `<li>${item}</li>`;
      })
      .join(" ");
    return ` <div class="key-word-container">
    <div class="key-word-content">
      <h2 class="key-word">${word}</h2>
      <p class="phonetics">${item.phonetic}</p>
    </div>
    <audio class="audio">
    <source src="${phonetics[0].audio}" type="audio/mpeg"></audio>
    <button class="play-btn">

    <img src="./assets/images/icon-play.svg" alt="play sound"/></button>
  </div>
  <h4 class="noun">${meanings[0].partOfSpeech}</h4>
  <ul class="noun-meaning">
    Meaning
    ${defs}
  </ul>
  <h4 class="synonyms">
    <span>electronic keyboard</span>
  </h4>
  <h4 class="verb">verb</h4>
  <ul class="verb-meaning">
    <li>To type on a computer keyboard.</li>
    <p>"Keyboarding is the part of this job I hate the most."</p>
  </ul>
  <h6 class="source">Source <a href="${sourceUrls}" target="_blank">${sourceUrls}</a></h6>`;
  });
  containerDisplay.innerHTML = item;
  const playBtn = document.querySelector(".play-btn");
  const audio = document.querySelector(".audio");
  playBtn.addEventListener("click", () => {
    audio.play();
  });
}

// Select the button
const btn = document.querySelector(".btn-toggle");
// Check for dark mode preference at the OS level
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
// Get the user's theme preference from local storage, if it's available
const currentTheme = localStorage.getItem("theme");
// If the user's preference in localStorage is dark...
if (currentTheme == "dark") {
  // ...let's toggle the .dark-theme class on the body
  document.body.classList.toggle("dark-mode");
  // Otherwise, if the user's preference in localStorage is light...
} else if (currentTheme == "light") {
  // ...let's toggle the .light-theme class on the body
  document.body.classList.toggle("light-mode");
}

function tgl() {
  //   const t = document.getElementById("Btn");
  if (btn.value == "ON") {
    btn.value = "OFF";
  } else if (btn.value == "OFF") btn.value = "ON";
}

btn.addEventListener("click", () => {
  // If the user's OS setting is dark and matches our .dark-mode class...
  if (prefersDarkScheme.matches) {
    // ...then toggle the light mode class
    document.body.classList.toggle("light-mode");
    // ...but use .dark-mode if the .light-mode class is already on the body,
    var theme = document.body.classList.contains("light-mode") ? "light" : "dark";
  } else {
    // Otherwise, let's do the same thing, but for .dark-mode
    document.body.classList.toggle("dark-mode");
    var theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
  }
  // Finally, let's save the current preference to localStorage to keep using it
  localStorage.setItem("theme", theme);
  tgl();
});

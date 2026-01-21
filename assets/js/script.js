const container = document.getElementById("cookie-container");
const resetBtn = document.getElementById('reset');
const fortuneDiv = document.getElementById('fortune');
let fortunes = [];
let loaded = false;

// Load JSON
const xhr = new XMLHttpRequest();
xhr.open('GET', './assets/jsondata/fortune_cookies_100000.json', true);
xhr.responseType = 'json';

xhr.onload = function() {
  if (xhr.status === 200) {
    fortunes = xhr.response;
    fortuneDiv.textContent = "Fortunes loaded! Click the cookie to reveal a fortune.";
    loaded = true;
  } else {
    fortuneDiv.textContent = "Failed to load JSON";
  }
};

xhr.onerror = function() {
  fortuneDiv.textContent = "Failed to load JSON";
};

xhr.send();

// reveal fortune
container.addEventListener("click", () => {
      show_fortune()
      container.addEventListener("click", () => {
      container.classList.remove("open");
      fortuneDiv.textContent = "";
      fortuneDiv.classList.remove("bad");
      container.addEventListener("click", () => {show_fortune()});
    });
});

function show_fortune(){

  if (!loaded || fortunes.length === 0) return;
  if (container.classList.contains('open')) return; // prevent double click

  const pick = fortunes[Math.floor(Math.random() * fortunes.length)];
  fortuneDiv.textContent = pick.fortune;

  fortuneDiv.classList.toggle("bad", /know what you did|karma|careless|mistake/i.test(pick.fortune));

  container.classList.add("open");

}
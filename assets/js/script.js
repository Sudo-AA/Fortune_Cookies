const container = document.getElementById("cookie-container");
const resetBtn = document.getElementById('reset');
const fortuneDiv = document.getElementById('fortune');
let fortunes = generate_fortunes();
let loaded = false;
// reveal fortune
container.addEventListener("click", () => {
      show_fortune()
});

function show_fortune(){

  if (!loaded || fortunes.length === 0) return;
  if (container.classList.contains('open')) return; // prevent double click

  const pick = fortunes[Math.floor(Math.random() * fortunes.length)];
  fortuneDiv.textContent = pick.fortune;

  fortuneDiv.classList.toggle("bad", /know what you did|karma|careless|mistake/i.test(pick.fortune));

  container.classList.add("open");
  container.addEventListener("click", () => {
      reset_fortune()
  });
}
function reset_fortune(){

  container.classList.remove("open");
   fortuneDiv.textContent = "";
   fortuneDiv.classList.remove("bad");
   container.addEventListener("click", () => {
      show_fortune()
  });
}


function generate_fortunes(){

const COUNT = 100000;

const good = [
  "Luck tilts your way after you commit to {action}.",
  "A quiet victory forms near {object}.",
  "Opportunity circles back in {number} days."
];

const bad = [
  "Carelessness around {object} brings delay.",
  "A small mistake echoes for {number} days."
];

const karma = [
  "Karma remembers how you treated {object}.",
  "The universe keeps receipts from {number} nights ago."
];

const threat = [
  "I know what you did near {object}. Choose wisely.",
  "Someone is watching how you handle {action}."
];

const edu = [
  "Spend 15 minutes learning {action}; compound gains follow.",
  "Consistency over {number} days beats talent."
];

const actions = ["reading", "coding", "studying", "deciding", "learning"];
const objects = ["the mirror", "a message", "your screen", "the past", "a notebook"];

const groups = [good, bad, karma, threat, edu];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const data = [];

for (let i = 1; i <= COUNT; i++) {
  const template = pick(pick(groups));
  const fortune =
    template
      .replace("{action}", pick(actions))
      .replace("{object}", pick(objects))
      .replace("{number}", (i % 365) + 1) +
    ` [${i}]`;

  data.push({ id: i, fortune });
}
 return data
}
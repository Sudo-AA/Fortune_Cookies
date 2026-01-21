const container = document.getElementById("cookie-container");
const resetBtn = document.getElementById('reset');
const fortuneDiv = document.getElementById('fortune');
let fortunes = [];
let loaded = false;
// reveal fortune
generate_fortunes();
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

const actions = [
  "reading", "coding", "studying", "deciding", "learning", "writing", "planning",
  "meditating", "exploring", "negotiating", "reflecting", "experimenting",
  "analyzing", "painting", "designing", "practicing", "questioning", "observing",
  "dreaming", "calculating"
];

const objects = [
  "the mirror", "a message", "your screen", "the past", "a notebook", 
  "the letter", "a shadow", "the window", "the stars", "an ancient scroll", 
  "the candle", "the key", "the path", "a secret document", "the hidden door",
  "a coin", "the garden", "the old book", "the forgotten diary", "the envelope"
];

function generate_fortunes() {
  const COUNT = 10000;

  const good = [
    "Luck tilts your way after you commit to {action}.",
    "A quiet victory forms near {object}.",
    "Opportunity circles back in {number} days.",
    "Unexpected luck finds you while {action}. 🌟",
    "Fortune smiles during {action} at {object}."
  ];

  const bad = [
    "Carelessness around {object} brings delay.",
    "A small mistake echoes for {number} days.",
    "Beware of rushing {action}; chaos follows. ⚡",
    "An unseen error will arise near {object}."
  ];

  const karma = [
    "Karma remembers how you treated {object}.",
    "The universe keeps receipts from {number} nights ago.",
    "What goes around comes around during {action}.",
    "Your past deeds near {object} will return unexpectedly."
  ];

  const threat = [
    "I know what you did near {object}. Choose wisely. 😈",
    "Someone is watching how you handle {action}.",
    "Your secret about {object} won't stay hidden.",
    "Mistakes in {action} will be noticed by someone."
  ];

  const edu = [
    "Spend 15 minutes learning {action}; compound gains follow.",
    "Consistency over {number} days beats talent.",
    "Master {action} before {number} sunrises.",
    "A small step in {action} today prevents regret tomorrow."
  ];

  const adverbs = ["carefully", "quickly", "secretly", "boldly", "silently"];
  const adjectives = ["ancient", "mysterious", "shiny", "forgotten", "hidden"];
  const times = ["before dawn", "by nightfall", "this week", "soon", "unexpectedly"];

  const groups = [good, bad, karma, threat, edu];

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  for (let i = 1; i <= COUNT; i++) {
    let template = pick(pick(groups));

    let fortune = template
      .replace("{action}", `${pick(adverbs)} ${pick(actions)}`)
      .replace("{object}", `${pick(adjectives)} ${pick(objects)}`)
      .replace("{number}", (i % 365) + 1);

    if (Math.random() < 0.3) fortune += ` ${pick(times)}.`;

    fortune += ` [${i}]`;

    fortunes.push({ id: i, fortune });
  }

}

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

  
  fortuneDiv.textContent = generate_fortunes();

  fortuneDiv.classList.toggle("bad", /know what you did|karma|careless|mistake/i.test(generate_fortunes()));

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


function generate_fortunes() {
  const good = [
    "Luck tilts your way when you {action}.",
    "A quiet win forms near {object}.",
    "Opportunity returns in {number} days.",
    "Unexpected luck finds you while you {action}. 🌟",
    "Fortune smiles near {object}."
  ];

  const bad = [
    "Carelessness near {object} causes delay.",
    "A small mistake lingers for {number} days.",
    "Rush this, and chaos follows. ⚡",
    "An error appears near {object}."
  ];

  const karma = [
    "Karma remembers your choice near {object}.",
    "The universe kept the receipt.",
    "What you did while {action} returns.",
    "Old actions echo near {object}."
  ];

  const threat = [
    "I know what you did near {object}. 😈",
    "Someone noticed how you {action}.",
    "That secret will surface.",
    "Eyes are on your next move."
  ];

  const edu = [
    "Spend 15 minutes on {action}. It compounds.",
    "Consistency beats talent.",
    "Learn this before regret.",
    "One step today saves months."
  ];

  const love_sin = [
    "Desire grows near {object}.",
    "You want more than you admit.",
    "Temptation returns tonight.",
    "Love and guilt walk together."
  ];

  const adverbs = ["carefully", "boldly", "quietly", "patiently", "recklessly"];
  const verbs = [
    "read", "code", "study", "decide", "learn", "write", "plan",
    "reflect", "analyze", "design", "practice", "observe", "experiment"
  ];

  const objects = [
    "the mirror", "your screen", "the past", "a notebook",
    "the window", "the key", "the path", "a hidden door",
    "the old book", "the envelope", "the shadow"
  ];

  const groups = [good, bad, karma, threat, edu, love_sin];

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function buildAction() {
    // Clean grammar: "boldly decide", "carefully analyze"
    return `${pick(adverbs)} ${pick(verbs)}`;
  }

  let template = pick(pick(groups));

  let fortune = template
    .replace("{action}", buildAction())
    .replace("{object}", pick(objects))
    .replace("{number}", Math.floor(Math.random() * 30) + 1);

  // Optional sharp follow-up sentence
  if (Math.random() < 0.35) {
    const tags = [
      "Choose wisely.",
      "This matters.",
      "Do not ignore it.",
      "You were warned.",
      "Pay attention."
    ];
    fortune += " " + pick(tags);
  }

  return fortune;
}


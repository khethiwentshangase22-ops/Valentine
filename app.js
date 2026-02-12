const scenes = [
  { t: "Khethie…", s: "It’s Khethiwe 🤍", d: 4000 },
  { t: "I made this for you", s: "Just something small…", d: 4000 },
  { t: "You’ve been on my mind", s: "More than you know.", d: 4500 },
  { t: "So I need to ask…", s: "One important thing.", d: 4500 },
  { t: "Will you be my Valentine?", s: "", d: 5000 }
];

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const choice = document.getElementById("choice");
const response = document.getElementById("response");
const progress = document.getElementById("progress");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let index = 0;
let startTime = Date.now();

// Build progress bars
scenes.forEach(() => {
  const bar = document.createElement("div");
  bar.className = "bar";
  const fill = document.createElement("div");
  fill.className = "fill";
  bar.appendChild(fill);
  progress.appendChild(bar);
});

// Background animation
function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const gradient = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
  gradient.addColorStop(0, "#ff2e74");
  gradient.addColorStop(1, "#8e44ad");
  ctx.fillStyle = gradient;
  ctx.fillRect(0,0,canvas.width,canvas.height);

  requestAnimationFrame(draw);
}
draw();

function nextScene() {
  if(index >= scenes.length) return;

  title.textContent = scenes[index].t;
  subtitle.textContent = scenes[index].s;

  const bars = document.querySelectorAll(".fill");
  bars.forEach((b,i)=>{
    b.style.width = i < index ? "100%" : "0%";
  });

  const fill = bars[index];
  let start = Date.now();

  function update() {
    let elapsed = Date.now() - start;
    let pct = Math.min(elapsed / scenes[index].d, 1);
    fill.style.width = (pct*100) + "%";

    if(pct < 1) {
      requestAnimationFrame(update);
    } else {
      index++;
      if(index === scenes.length) {
        choice.style.display = "flex";
      } else {
        nextScene();
      }
    }
  }

  update();
}

nextScene();

yesBtn.onclick = () => {
  window.location.href = "letter.html";
};

let noCount = 0;
noBtn.onclick = () => {
  noCount++;
  const lines = [
    "Okay 🤍 I respect that.",
    "Still grateful for you.",
    "No pressure, ever.",
    "You still mean a lot."
  ];
  response.textContent = lines[Math.min(noCount-1, lines.length-1)];
};


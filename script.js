const cards = [
  {
    id: 1,
    displayName: "#1 The SuperMom",
    src: "./assets/images/01-the-supermom.webp",
    alt: "Pastel mock illustration of mother and child as a superhero duo"
  },
  {
    id: 2,
    displayName: "#2 Snuggle Squad",
    src: "./assets/images/02-snuggle-squad.webp",
    alt: "Pastel mock illustration of mother and child cuddling together"
  },
  {
    id: 3,
    displayName: "#3 Breakfast Boss",
    src: "./assets/images/03-breakfast-boss.webp",
    alt: "Pastel mock illustration of mother and child making breakfast"
  },
  {
    id: 4,
    displayName: "#4 Bedtime Hero",
    src: "./assets/images/04-bedtime-hero.webp",
    alt: "Pastel mock illustration of mother reading a bedtime story to her child"
  },
  {
    id: 5,
    displayName: "#5 Adventure Duo",
    src: "./assets/images/05-adventure-duo.webp",
    alt: "Pastel mock illustration of mother and child on a small adventure"
  },
  {
    id: 6,
    displayName: "#6 The Comfort Queen",
    src: "./assets/images/06-the-comfort-queen.webp",
    alt: "Pastel mock illustration of mother comforting her child"
  },
  {
    id: 7,
    displayName: "#7 Little Shadow",
    src: "./assets/images/07-little-shadow.webp",
    alt: "Pastel mock illustration of child happily following mother"
  },
  {
    id: 8,
    displayName: "#8 Sunshine Mama",
    src: "./assets/images/08-sunshine-mama.webp",
    alt: "Pastel mock illustration of mother and child in sunshine"
  },
  {
    id: 9,
    displayName: "#9 Magic Hug",
    src: "./assets/images/09-magic-hug.webp",
    alt: "Pastel mock illustration of mother and child sharing a magical hug"
  },
  {
    id: 10,
    displayName: "#10 Forever Team",
    src: "./assets/images/10-forever-team.webp",
    alt: "Pastel mock illustration of mother and child standing together as a team"
  }
];

const copy = {
  recipientLine: "For someone wonderful",
  message:
    "Happy Mother's Day. Your love, patience, strength, and tenderness are seen and cherished. Today is a small reminder of how deeply you are loved."
};

const animationVariants = [
  "flutter",
  "sparklePop",
  "heartBurst",
  "stampWiggle",
  "paperFloat"
];

const introPanel = document.querySelector("#introPanel");
const revealPanel = document.querySelector("#revealPanel");
const revealCard = document.querySelector("#revealCard");
const pageShell = document.querySelector("#pageShell");
const envelopeButton = document.querySelector("#envelopeButton");
const resetButton = document.querySelector("#resetButton");
const cardTitle = document.querySelector("#cardTitle");
const cardImage = document.querySelector("#cardImage");
const recipientLine = document.querySelector("#recipientLine");
const messageText = document.querySelector("#messageText");
const particleLayer = document.querySelector("#particleLayer");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

let previousCardId = null;
let isAnimating = false;

recipientLine.textContent = copy.recipientLine;
messageText.textContent = copy.message;
resetButton.disabled = true;

function setPanelInert(panel, isInert) {
  panel.inert = isInert;
  panel.toggleAttribute("inert", isInert);
}

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function pickCard() {
  const availableCards =
    cards.length > 1 ? cards.filter((card) => card.id !== previousCardId) : cards;
  const selectedCard = pickRandom(availableCards);
  previousCardId = selectedCard.id;
  return selectedCard;
}

function pickAnimation() {
  return pickRandom(animationVariants);
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function preloadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = src;
  });
}

function clearParticles() {
  particleLayer.replaceChildren();
}

function removeVariantClasses() {
  animationVariants.forEach((variant) => {
    envelopeButton.classList.remove(`variant-${variant}`);
  });
}

function setEnvelopeState(state) {
  envelopeButton.classList.toggle("is-opening", state === "opening");
  envelopeButton.classList.toggle("is-open", state === "open");
}

function setAppState(state) {
  pageShell.dataset.state = state;

  const isRevealed = state === "revealed";
  revealPanel.setAttribute("aria-hidden", String(!isRevealed));
  introPanel.setAttribute("aria-hidden", String(isRevealed));
  setPanelInert(introPanel, state !== "closed");
  setPanelInert(revealPanel, !isRevealed);
}

setAppState("closed");

function renderCard(card) {
  cardTitle.textContent = card.displayName;
  cardImage.src = card.src;
  cardImage.alt = card.alt;
}

function makeParticle(type, x, y, color, size) {
  const particle = document.createElement("span");
  particle.className = `particle ${type}`;
  particle.style.setProperty("--particle-color", color);
  particle.style.setProperty("--size", `${size}px`);
  particle.style.left = `${x}%`;
  particle.style.top = `${y}%`;
  return particle;
}

function burstParticles(variant) {
  if (reducedMotionQuery.matches) {
    return Promise.resolve();
  }

  clearParticles();

  const isHeartBurst = variant === "heartBurst";
  const count = isHeartBurst ? 18 : 22;
  const colors = ["#ff7d9a", "#ffc65f", "#8dd9c2", "#9ecbff", "#c8b8ff"];
  const animations = [];

  for (let index = 0; index < count; index += 1) {
    const angle = (Math.PI * 2 * index) / count + (Math.random() - 0.5) * 0.45;
    const distance = 110 + Math.random() * 125;
    const drift = 22 + Math.random() * 34;
    const type = isHeartBurst || index % 5 === 0 ? "heart" : "sparkle";
    const particle = makeParticle(
      type,
      50 + (Math.random() - 0.5) * 9,
      51 + (Math.random() - 0.5) * 8,
      pickRandom(colors),
      type === "heart" ? 10 + Math.random() * 8 : 8 + Math.random() * 9
    );
    particleLayer.append(particle);

    animations.push(
      particle.animate(
        [
          {
            opacity: 0,
            transform:
              type === "heart"
                ? "translate(-50%, -50%) rotate(-45deg) scale(0.25)"
                : "translate(-50%, -50%) rotate(0deg) scale(0.25)"
          },
          {
            opacity: 0.95,
            offset: 0.16,
            transform:
              type === "heart"
                ? `translate(calc(-50% + ${Math.cos(angle) * drift}px), calc(-50% + ${Math.sin(angle) * drift}px)) rotate(-45deg) scale(1)`
                : `translate(calc(-50% + ${Math.cos(angle) * drift}px), calc(-50% + ${Math.sin(angle) * drift}px)) rotate(35deg) scale(1)`
          },
          {
            opacity: 0,
            transform:
              type === "heart"
                ? `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance - 56}px)) rotate(-45deg) scale(0.72)`
                : `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance - 28}px)) rotate(120deg) scale(0.55)`
          }
        ],
        {
          duration: 760 + Math.random() * 260,
          delay: Math.random() * 90,
          easing: "cubic-bezier(0.2, 0.78, 0.22, 1)",
          fill: "forwards"
        }
      ).finished.catch(() => {})
    );
  }

  return Promise.all(animations).then(clearParticles);
}

async function playOpeningAnimation(variant) {
  removeVariantClasses();
  clearParticles();

  if (reducedMotionQuery.matches) {
    setEnvelopeState("open");
    await wait(120);
    return;
  }

  envelopeButton.classList.add(`variant-${variant}`);
  setEnvelopeState("opening");

  if (variant === "sparklePop" || variant === "heartBurst") {
    await Promise.all([wait(900), burstParticles(variant)]);
  } else {
    await wait(920);
  }

  setEnvelopeState("open");
}

async function openEnvelope({ restoreFocus = false } = {}) {
  if (isAnimating) {
    return;
  }

  isAnimating = true;
  envelopeButton.blur();
  setAppState("opening");
  envelopeButton.disabled = true;
  resetButton.disabled = true;

  const selectedCard = pickCard();
  const selectedVariant = pickAnimation();
  const imageReady = preloadImage(selectedCard.src);

  try {
    await imageReady;
    renderCard(selectedCard);
    await playOpeningAnimation(selectedVariant);

    setAppState("revealed");
    revealCard.classList.remove("is-fading-in");
    void revealCard.offsetWidth;
    revealCard.classList.add("is-fading-in");

    await wait(reducedMotionQuery.matches ? 80 : 520);
    removeVariantClasses();
    resetButton.disabled = false;
    if (restoreFocus) {
      resetButton.focus({ preventScroll: true });
    }
  } finally {
    isAnimating = false;
  }
}

async function resetExperience({ restoreFocus = false } = {}) {
  if (isAnimating) {
    return;
  }

  isAnimating = true;
  resetButton.blur();
  resetButton.disabled = true;
  clearParticles();
  removeVariantClasses();

  revealCard.classList.remove("is-fading-in");
  setAppState("closing");
  await wait(reducedMotionQuery.matches ? 40 : 120);
  setEnvelopeState("closed");
  await wait(reducedMotionQuery.matches ? 80 : 640);
  setAppState("closed");
  envelopeButton.disabled = false;
  if (restoreFocus) {
    envelopeButton.focus({ preventScroll: true });
  }
  isAnimating = false;
}

envelopeButton.addEventListener("click", openEnvelope);
resetButton.addEventListener("click", resetExperience);

envelopeButton.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openEnvelope({ restoreFocus: true });
  }
});

resetButton.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    resetExperience({ restoreFocus: true });
  }
});

window.addEventListener("load", () => {
  cards.slice(0, 3).forEach((card) => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "image";
    link.href = card.src;
    document.head.append(link);
  });
});

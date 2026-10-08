"use strict";

// Navigation and appearance are independent of each slide's design.
const book = document.querySelector(".birthday-book");
const pages = [...book.querySelectorAll(".birthday-page")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// This static passcode is a playful entrance, not server-side authentication.
const passcode = "2207";
const lockScreen = document.querySelector(".lock-screen");
const wrongCode = document.querySelector(".wrong-code");
const dots = [...document.querySelectorAll(".passcode-dots span")];
const codeStatus = document.querySelector("#code-status");
let enteredCode = "";
let unlocked = false;

function updateDots() {
  dots.forEach((dot, index) => dot.classList.toggle("filled", index < enteredCode.length));
  codeStatus.textContent = `Đã nhập ${enteredCode.length} trên 4 số`;
}
function enterDigit(digit) {
  if (unlocked || wrongCode.open || enteredCode.length >= 4) return;
  enteredCode += digit;
  updateDots();
  if (enteredCode.length !== 4) return;
  if (enteredCode === passcode) {
    unlocked = true;
    lockScreen.hidden = true;
    book.hidden = false;
    book.inert = false;
    book.scrollTop = 0;
    book.focus({ preventScroll: true });
  } else {
    wrongCode.showModal();
  }
  enteredCode = "";
  updateDots();
}
document.querySelectorAll("[data-digit]").forEach(button => {
  button.setAttribute("aria-label", button.dataset.digit);
  button.addEventListener("click", () => enterDigit(button.dataset.digit));
});
function deleteDigit() { enteredCode = enteredCode.slice(0, -1); updateDots(); }
document.querySelector(".delete-digit").addEventListener("click", deleteDigit);
document.querySelector(".retry-code").addEventListener("click", () => wrongCode.close());
wrongCode.addEventListener("close", () => document.querySelector('[data-digit="1"]').focus());
document.addEventListener("keydown", event => {
  if (unlocked || wrongCode.open || event.ctrlKey || event.altKey || event.metaKey) return;
  if (/^[0-9]$/.test(event.key)) { event.preventDefault(); enterDigit(event.key); }
  else if (event.key === "Backspace") { event.preventDefault(); deleteDigit(); }
});

function goToPage(page) {
  if (!page) return;
  book.scrollTo({ top: page.offsetTop, behavior: reducedMotion.matches ? "instant" : "smooth" });
}

book.querySelectorAll("[data-target]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.target);
    goToPage(target);
    // Move keyboard/screen-reader focus along with the visual navigation.
    if (target) {
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
    }
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting));
  }, { root: book, threshold: 0.5 });
  pages[0].classList.add("is-visible");
  book.classList.add("motion-enabled");
  pages.forEach((page) => observer.observe(page));
}

book.addEventListener("keydown", (event) => {
  if (event.target.closest("button, a, input, textarea, select")) return;
  const current = Math.round(book.scrollTop / book.clientHeight);
  const directions = { ArrowDown: 1, PageDown: 1, ArrowUp: -1, PageUp: -1 };
  let next;
  if (event.key in directions) next = current + directions[event.key];
  else if (event.key === "Home") next = 0;
  else if (event.key === "End") next = pages.length - 1;
  else return;
  event.preventDefault();
  goToPage(pages[Math.max(0, Math.min(pages.length - 1, next))]);
});

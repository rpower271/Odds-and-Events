const bank = [];
const odds = [];
const evens = [];

function addNumBank(number) {
  bank.push(number);
  render();
}

function sort() {
  const number = bank.shift();
  if (number % 2 === 0) {
    evens.push(number);
  } else {
    odds.push(number);
  }
}

function sortOne() {
  sort();
  render();
}

function sortAll() {
  while (bank.length) {
    sort();
  }
  render();
}

function createForm() {
  const $form = document.createElement("form");
  $form.innerHTML = `
    <label>
      Add a number to the Bank
      <input name="count" type="number" min="1" />
    </label>
    <button type="submit" data-action="add"> Add number</button>
    <button type="submit" data-action="sortOne"> Sort 1</button>
    <button type="submit" data-action="sortAll"> Sort All</button>
  `;

  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const action = event.submitter.dataset.action;
    if (action === "add") {
      const data = new FormData($form);
      const number = data.get("number");

      if (number === null || number === "") return;

      addNumBank(+number);
    } else if (action === "sortOne") {
      sortOne();
    } else if (action === "sortAll") {
      sortAll();
    }
  });
  return $form;
}

function numInBank(n) {
  const $span = document.createElement("span");
  $span.textContext = n;
  return $span;
}

function numBank(label, numbers) {
  const $bank = document.createElement("section");
  $bank.classList.add("bank");
  $bank.innerHTML = `
  <h2>${label}</h2>
  <output></output>
  `;

  const $numbers = numbers.map(numInBank);
  $bank.querySelector("output").replaceChildren(...$numbers);

  return $bank;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
      <h1>Odds and Events</h1>
      <NumberForm></NumberForm>
      <NumberBank id="bank"></NumberBank>
      <NumberBank id="odds"></NumberBank>
      <NumberBank id="evens"></NumberBank>
    `;
  $app.querySelector("createForm").replaceWith(createFormForm());
  $app.querySelector("numBank#bank").replaceWith(numBank("Bank", bank));
  $app.querySelector("numBank#odds").replaceWith(numBank("Odds", odds));
  $app.querySelector("numBank#evens").replaceWith(numBank("Evens", evens));
}
render();

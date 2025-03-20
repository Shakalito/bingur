const bingoData = [
  "Wiesz że nie są już razem?",
  "Akszueli",
  "To dobrze, UFFF",
  "Spacja spacja",
  "Mój ulubiony kompot to ten malinowy",
  "Akumulator",
  "Cytowanie hitu internetu",
  "Moim ulubionym piłkarzem jest ten cały mekambe",
  "Ballada o smutnym programiście",
  "Currier new 14",
  "Pepogladzik jest pepogladzikowy",
  "Kondziu się nie zamyka",
  "Krzysiu nigdzie nie pójdzie",
  "Krystian zarzuca sucharem",
  "Nie byrym",
  "Krzysztof Majka nie ma",
  "Losowe zdjęcie na grupie",
  "Kondziu wyciąga coś nietypowego z plecaka",
  "Cytowanie definicji do Johna Falcona",
  "Nie znam lepszej wędliny niż mortadela",
  "Szymon rozwala rzecz kupioną w action",
  "Stukanie w łeb i udawanie neandertalczyka",
  "Ping ai-data.pl",
  "Dzień dobry Piotrusiu",
  "Poprosze kubełek z wczoraj",
  "Pepogladzik jest pepogladzikowy 2",
  "Ty świąteczne miasteczko będzie",
  "Sie nie bój",
  "Kawusia jest a ciasteczko przyszło",
  "Do dupy",
  "Puenta, puenta",
  "Krzysztof Majka i jego small fujarka",
  "Pana Balickiego boli głowa",
];

function shuffleArray(array, seed) {
  array.sort((a, b) => hash(a, seed) - hash(b, seed));
}

function hash(str, seed) {
  let h = seed;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h;
}

function getTodaySeed() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramValue = urlParams.get("data");
  const date = new Date(paramValue);
  return date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate();
}

function checkBingo() {
  const rows = document.querySelectorAll(".row");
  const cols = 5;
  let bingo = false;

  rows.forEach((row) => {
    const cells = row.querySelectorAll(".col");
    if ([...cells].every((cell) => cell.classList.contains("marked"))) {
      bingo = true;
    }
  });

  for (let i = 0; i < cols; i++) {
    let markedCount = 0;
    document
      .querySelectorAll(`.row .col:nth-child(${i + 1})`)
      .forEach((cell) => {
        if (cell.classList.contains("marked")) {
          markedCount++;
        }
      });
    if (markedCount === cols) {
      bingo = true;
    }
  }

  const cells = document.querySelectorAll(".col");
  if (
    cells[0].classList.contains("marked") &&
    cells[6].classList.contains("marked") &&
    cells[12].classList.contains("marked") &&
    cells[18].classList.contains("marked") &&
    cells[24].classList.contains("marked")
  ) {
    bingo = true;
  }

  if (
    cells[4].classList.contains("marked") &&
    cells[8].classList.contains("marked") &&
    cells[12].classList.contains("marked") &&
    cells[16].classList.contains("marked") &&
    cells[20].classList.contains("marked")
  ) {
    bingo = true;
  }

  if (bingo) {
    alert("BINGO!");
  }
}

function saveMarkedCells() {
  const markedCells = [];
  document.querySelectorAll(".col").forEach((cell, index) => {
    if (cell.classList.contains("marked")) {
      markedCells.push(index);
    }
  });
  document.cookie = `marked=${JSON.stringify(
    markedCells
  )}; path=/; max-age=28800`;
}

function loadMarkedCells() {
  const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key] = value;
    return acc;
  }, {});

  if (cookies.marked) {
    const markedCells = JSON.parse(cookies.marked);
    document.querySelectorAll(".col").forEach((cell, index) => {
      if (markedCells.includes(index)) {
        cell.classList.add("marked");
      }
    });
  }
}

function populateBingo() {
  const cells = document.querySelectorAll(".col");
  const shuffledData = [...bingoData];
  shuffleArray(shuffledData, getTodaySeed());

  cells.forEach((cell, index) => {
    if (!cell.classList.contains("marked")) {
      cell.textContent = shuffledData[index];
    }
    cell.addEventListener("click", () => {
      cell.classList.toggle("marked");
      saveMarkedCells();
      checkBingo();
    });
  });
  loadMarkedCells();
}

document.addEventListener("DOMContentLoaded", populateBingo);

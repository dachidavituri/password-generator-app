let rangeSlider = document.querySelector(".custom-range");
let passwordLength = document.querySelector(".amount");
let difficulty = document.querySelector(".difficult-level");
let boxes = document.querySelectorAll(".box");
let pass = document.querySelector(".password");
const checkBoxes = document.querySelectorAll(".check");
let submitBtn = document.querySelector(".generate-btn");
let copyBtn = document.querySelector(".copy");
let copyTxt = document.querySelector(".copy-txt");
let checkBox = document.querySelectorAll(
  '.checkboxLabel input[type="checkbox"]'
);
let checkIcons = document.querySelectorAll(".checkboxLabel .check-icon");
let upperCase = document.getElementById("inclUppercase");
let lowerCase = document.getElementById("inclLowercase");
let numbers = document.getElementById("inclNumber");
let symbol = document.getElementById("inclSymbol");
let checkedCount = 0;
const changeDiffLevelIndicator = (count) => {
  const colors = ["#F64A4A", "#FB7C58", "#F8CD65", "#A4FFAF"];
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].style.backgroundColor = i < count ? colors[count - 1] : "#18171F";
  }
};
checkBox.forEach((checkbox, index) => {
  checkbox.addEventListener("change", () => {
    checkIcons[index].style.display = checkbox.checked ? "block" : "none";
    if (checkbox.checked) {
      checkedCount++;
    } else {
      checkedCount--;
    }
    switch (checkedCount) {
      case 1:
        difficulty.textContent = "TOO WEAK!";
        break;
      case 2:
        difficulty.textContent = "WEAK";
        break;
      case 3:
        difficulty.textContent = "MEDIUM";
        break;
      case 4:
        difficulty.textContent = "STRONG";
        break;
      default:
        difficulty.textContent = "";
        break;
    }
    changeDiffLevelIndicator(checkedCount);
  });
});
rangeSlider.addEventListener("input", function () {
  passwordLength.textContent = rangeSlider.value;
});
copyBtn.addEventListener("click", () => {
  copyTxt.textContent = "COPIED";
  setTimeout(() => {
    copyTxt.textContent = "";
  }, 3000);
  let password = document.querySelector(".password");
  navigator.clipboard.writeText(password.textContent);
});
let lettersArr = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "u",
  "y",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "z",
  "x",
  " c",
  "v",
  "b",
  "n",
  "m",
];
let uppercaseLettersArr = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "U",
  "Y",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
];
let charArr = ["!", "@", "#", "$", "%", "&", "*"];
let numberArr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const generatePassword = (length, uppercase, lowercase, numbers, symbol) => {
  let password = "";
  const characterSets = [];

  if (uppercase) {
    characterSets.push(uppercaseLettersArr);
  }
  if (lowercase) {
    characterSets.push(lettersArr);
  }
  if (numbers) {
    characterSets.push(numberArr1);
  }
  if (symbol) {
    characterSets.push(charArr);
  }
  characterSets.forEach((charSet) => {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    password += charSet[randomIndex];
  });
  while (password.length < length) {
    const randomSetIndex = Math.floor(Math.random() * characterSets.length);
    const randomSet = characterSets[randomSetIndex];
    const randomIndex = Math.floor(Math.random() * randomSet.length);
    password += randomSet[randomIndex];
  }
  return password;
};
submitBtn.addEventListener("click", () => {
  const passwordLength = parseInt(rangeSlider.value, 10);
  console.log(passwordLength);
  const includeUpper = upperCase.checked;
  const incLowerCase = lowerCase.checked;
  const number = numbers.checked;
  const symbols = symbol.checked;
  const newPassword = generatePassword(
    passwordLength,
    includeUpper,
    incLowerCase,
    number,
    symbols
  );
  pass.textContent = newPassword;
  pass.style.opacity = "1";
});

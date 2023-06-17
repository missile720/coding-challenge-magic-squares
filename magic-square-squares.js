let answer = [];

function checkSquare(square, n, magicNumber) {
  // Check rows and columns
  for (let i = 0; i < n; i++) {
    let rowSum = 0;
    let colSum = 0;
    for (let j = 0; j < n; j++) {
      rowSum += square[i][j];
      colSum += square[j][i];
    }
    if (rowSum !== magicNumber || colSum !== magicNumber) {
      return false;
    }
  }

  // Check diagonals
  let mainDiagonalSum = 0;
  let secondaryDiagonalSum = 0;
  for (let i = 0; i < n; i++) {
    mainDiagonalSum += square[i][i];
    secondaryDiagonalSum += square[i][n - i - 1];
  }
  if (mainDiagonalSum !== magicNumber || secondaryDiagonalSum !== magicNumber) {
    return false;
  }

  return true;
}

function generateAllCombinations(n, numberList, magicNumber) {
  let square = Array.from({ length: n }, () => Array(n).fill(0));

  function generate(currentIndex) {
    if (currentIndex === n * n) {
      // Fill the square
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          square[i][j] = numberList[i * n + j];
        }
      }

      if (checkSquare(square, n, magicNumber)) {
        answer.push(square.map(row => [...row]));
      }

      return;
    }

    for (let i = currentIndex; i < numberList.length; i++) {
      // Swap current element with the element at currentIndex
      [numberList[currentIndex], numberList[i]] = [numberList[i], numberList[currentIndex]];

      generate(currentIndex + 1);

      // Restore the original order of elements
      [numberList[currentIndex], numberList[i]] = [numberList[i], numberList[currentIndex]];
    }
  }

  generate(0);
}

function checkMagicNumber(num) {
  return Number.isInteger(num);
}

function magicSquare(n, max) {
  const numberList = Array.from({ length: n * n }, (_, i) => i + 1);

  // Recursive function to generate number lists
  function generate(list, start) {
    if (list.length === n * n) {
      const magicNumber = list.reduce((sum, num) => sum + num, 0) / n;

      // Check if magic number is a whole number
      if (checkMagicNumber(magicNumber)) {
        generateAllCombinations(n, list, magicNumber);
      }

      return;
    }

    for (let i = start; i <= max - (n * n - list.length) + 1; i++) {
      generate([...list, i], i + 1);
    }
  }

  generate([], 1);
}

const size = 3;
const max = 10;
magicSquare(size, max);

// Print the generated magic squares
answer.forEach(square => {
  square.forEach(row => {
    console.log(row);
  });
  console.log('\n');
});

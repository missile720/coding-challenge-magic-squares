//Theoretically finding every combination of a 3x3 magic square with unique numbers that can go up to 100 will take 366,667,000 years
//Where as if the numbers only go up to 10 it will only take less than a single second
//Assuming each combination takes 1 microsecond to calculate
//My current computer takes 500 microseconds per combination :/
let answer = [];

//cheks if all rows, columns and diagonals equal each other
function checkSquare(square, n, magicNumber) {
  // Check rows and columns
  for (let i = 0; i < n; i++) {
    let rowSum = 0;
    let colSum = 0;
    for (let j = 0; j < n; j++) {
      rowSum += square[i][j]**2;
      colSum += square[j][i]**2;
    }
    if (rowSum !== magicNumber || colSum !== magicNumber) {
      return false;
    }
  }

  // Check diagonals
  // let mainDiagonalSum = 0;
  // let secondaryDiagonalSum = 0;
  // for (let i = 0; i < n; i++) {
  //   mainDiagonalSum += square[i][i]**2;
  //   secondaryDiagonalSum += square[i][n - i - 1]**2;
  // }
  // if (mainDiagonalSum !== magicNumber) {
  //   return false;
  // }

  return true;
}

//creates every possible grid combination for the list of numbers
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
        const uniqueSquare = square.map(row => [...row]);
        if (!answer.some(arr => JSON.stringify(arr) === JSON.stringify(uniqueSquare))) {
          answer.push(uniqueSquare);
        }
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

//magic number must be a whole number
function checkMagicNumber(num) {
  return Number.isInteger(num);
}

function magicSquare(n, max) {
  // Recursive function to generate number lists
  function generate(list, start) {
    if (list.length === n * n) {
      
      const magicNumber = list.reduce((sum, num) => sum + num**2, 0) / n;

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
let start = Date.now();
magicSquare(size, max);
let timeTaken = Date.now() - start;
console.log("Total time taken : " + timeTaken + " milliseconds");

// Print the generated magic squares
answer.forEach(square => {
  square.forEach(row => {
    console.log(row);
  });
  console.log('\n');
});

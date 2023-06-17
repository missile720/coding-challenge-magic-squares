let answer = [];

function checkSquare(square, n, magicNumber) {
    // Check rows
    if (square.some(row => row.reduce((sum, num) => sum + num, 0) !== magicNumber)) {
        return false;
    }

    // if (square.some(row => row.reduce((sum, num) => sum + num**2, 0) !== magicNumber)) {
    //     return false;
    // }

    // Check columns
    for (let col = 0; col < n; col++) {
        let sum = 0;
        for (let row = 0; row < n; row++) {
            sum += square[row][col];
            //sum += square[row][col]**2;
        }
        if (sum !== magicNumber) {
            return false;
        }
    }

    // Check main diagonal
    let sum = 0;
    for (let i = 0; i < n; i++) {
        sum += square[i][i];
        //sum += square[i][i]**2;
    }
    if (sum !== magicNumber) {
        return false;
    }

    // Check secondary diagonal
    sum = 0;
    for (let i = 0; i < n; i++) {
        sum += square[i][n - i - 1];
        //sum += square[i][n - i - 1]**2;
    }
    if (sum !== magicNumber) {
        return false;
    }

    return true;
}

function checkMagicNumber(num) {
    if (num % 1 !== 0) {
        return false;
    } else {
        return true;
    }
}

function generateAllCombinations(n, numberList, magicNumber){
    let square = Array.from({ length: n }, () => Array(n).fill(0));

    function generate(currentCombination, remainingElements) {
        if (remainingElements.length === 0) {
            //fills square 
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    square[i][j] = currentCombination.shift();
                }
            }

            if(checkSquare(square, n, magicNumber)){
                answer = square;
                answer.forEach(row => console.log(row));
                console.log("\n");
            }

            return;
        }
    
        for (let i = 0; i < remainingElements.length; i++) {
            const updatedCombination = [...currentCombination, remainingElements[i]];
            const remaining = [...remainingElements.slice(0, i), ...remainingElements.slice(i + 1)];
            generate(updatedCombination, remaining);
        }
    }

    //recursive function to find every combination of the array
    generate([], numberList);
}

//size of square
function magicSquare(n,max) {
    // Recursive function to generate number lists
    function generate(list, start) {
        if (list.length === n**2) {
            let magicNumber = list.reduce((sum, num) => sum + num, 0)/3;
            //let magicNumber = numberList.reduce((sum, num) => sum + num**2, 0)/3;
        
            //check if magic number is whole
            if(checkMagicNumber(magicNumber)){
                generateAllCombinations(n, list, magicNumber);
            }

            return;
        }

        for (let i = start; i <= max - (n**2 - list.length) + 1; i++) {
            generate([...list, i], i + 1);
        }
    }

    generate([], 1);
}

const size = 3;
const max = 10;
magicSquare(size,max);
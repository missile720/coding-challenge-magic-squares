function checkSquare(square) {

}

function checkMagicNumber(num) {
    if (num % 1 !== 0) {
        return false;
    } else {
        return true;
    }
}

//size of square
function magicSquare(n,max) {
    const square = Array.from({
        length: n
    }, () => Array(n).fill(0));

    for (let num1 = 1; num1 <= max-8; num1++) {
        for (let num2 = num1 + 1; num2 <= max-7; num2++) {
            for (let num3 = num2 + 1; num3 <= max-6; num3++) {
                for (let num4 = num3 + 1; num4 <= max-5; num4++) {
                    for (let num5 = num4 + 1; num5 <= max-4; num5++) {
                        for (let num6 = num5 + 1; num6 <= max-3; num6++) {
                            for (let num7 = num6 + 1; num7 <= max-2; num7++) {
                                for (let num8 = num7 + 1; num8 <= max-1; num8++) {
                                    for (let num9 = num8 + 1; num9 <= max; num9++) {
                                        let numberList = [num1, num2, num3, num4, num5, num6, num7, num8, num9];

                                        let magicNumber = numberList.reduce((sum, num) => sum + num ** 2, 0)/3;

                                        //check if magic number is whole
                                        if(!checkMagicNumber(magicNumber)){
                                            continue;
                                        }

                                        //fills square 
                                        for (let i = 0; i < n; i++) {
                                            for (let j = 0; j < n; j++) {
                                                square[i][j] = numberList.shift();
                                            }
                                        }

                                        
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return square;
}

const size = 3;
const max = 10;
const result = magicSquare(size,max);
result.forEach(row => console.log(row));
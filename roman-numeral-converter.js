function convertValue(value){
    const romanNumerals = [
        {1000:'M'},
        {900:'CM'},
        {500:'D'},
        {400:'CD'},
        {100:'C'},
        {90:'XC'},
        {50:'L'},
        {40:'XL'},
        {10:'X'},
        {9:'IX'},
        {5:'V'},
        {4:'IV'},
        {1:'I'}
    ];

    const numeralRomans = {
        'M':1000,
        'CM':900,
        'D':500,
        'CD':400,
        'C':100,
        'XC':90,
        'L':50,
        'XL':40,
        'X':10,
        'IX':9,
        'V':5,
        'IV':4,
        'I':1
    };

    let result;

    if(typeof(value) !== 'string' && typeof(value) !== 'number'){
        throw console.error(`Input is not a string or number, type of input is ${typeof(value)}`);
    }

    if(typeof(value) === 'string' && Number(value)){
        value = Number(value);
    }

    if(typeof(value) === 'number'){
        result = '';
        for(let i = 0; i < romanNumerals.length; i++){
            let key = Object.keys(romanNumerals[i])[0];
            while(value >= key){
                value -= key;
                result += romanNumerals[i][key];
            }
        }
    }
    else{
        result = 0;
        for(let i = 0; i < value.length; i++){
            if(value[i] === 'C' && (value[i+1] === 'M' || value[i+1] === 'D')
            || value[i] === 'X' && (value[i+1] === 'C' || value[i+1] === 'L')
            || value[i] === 'I' && (value[i+1] === 'X' || value[i+1] === 'V')){
                result += numeralRomans[value[i]+value[i+1]];
                i++;
            }
            else{
                result += numeralRomans[value[i]];
            }
        }
    }
    console.log(result);
    return result;
}

convertValue(6);   // "VI"
convertValue("6"); // "VI"
convertValue(20);  // "XX"
convertValue("CM"); // 900
convertValue("IX"); //10
convertValue("MCMLXXXIV"); //1984